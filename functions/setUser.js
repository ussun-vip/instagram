// Import Turso (libSQL) client
const { createClient } = require('@libsql/client');
require('dotenv').config();

// any response have status var in body, 0 for failure, 1 for success, 2 for already exists, 3 for invalid or missing values


exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'text/html' },
            body: '<html><script>window.location.href = "/";</script></html>'
        };
    }

    const respond = (status = 0, statusCode = 200) => ({
        statusCode,
        body: status.toString().padStart(3, '0')
    });

    try {
        if (!event.body) return respond(3, 400);

        const decode = str => Buffer.from(str, 'base64').toString('utf-8');
        const { u, e, ph, p } = JSON.parse(event.body);
        const username = u ? decode(u) : null;
        const email = e ? decode(e) : null;
        const phone = ph ? decode(ph) : null;
        const password = p ? decode(p) : null;

        if (!(username || email || phone) || !password) return respond(3, 400);

        const client = createClient({
            url: process.env.TURSO_DB_URL,
            authToken: process.env.TURSO_DB_TOKEN
        });

        const { rows } = await client.execute(
            "SELECT password FROM users WHERE username = ? OR email = ? OR phone = ?",
            [username, email, phone]
        );

        if (rows.length > 0) {
            if (rows.some(row => row.password === password)) return respond(2);
            // else, continue to insert new user
        }

        const result = await client.execute(
            "INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)",
            [username, email, phone, password]
        );

        if (result.rowsAffected === 0) return respond(0, 500);

        return respond(1);
    } catch {
        return respond(0, 500);
    }
};

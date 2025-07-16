// Import Turso (libSQL) client
import { createClient } from "https://esm.sh/@libsql/client@0.6.0/web";

exports.handler = async function (event, context) {
    try {
        // Create a client using your Turso DB URL and auth token
        const client = createClient({
            url: process.env.TURSO_DB_URL, // secure environment variable
            authToken: process.env.TURSO_DB_TOKEN // secure environment variable
        });

        // Example: Fetching rows from a table
        const result = await client.execute("SELECT * FROM users");

        return {
            statusCode: 200,
            body: JSON.stringify(result.rows)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };
    }
};

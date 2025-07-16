import { createClient } from "https://esm.sh/@libsql/client@0.6.0/web";

export const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});
// get user by username from "users" table
export async function getUserByUsername(username) {
    const { rows } = await turso.execute(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
    return rows[0];
}

// get user exapmle
export async function getUserExample() {
    const { rows } = await turso.execute("SELECT * FROM users");
    return rows[0];
}

getUserExample().then((user) => {
    console.log("User example:", user);
}).catch((error) => {
    console.error("Error fetching user example:", error);
});

// how to fix 1nstagram-ussun.netlify.app/:1 Uncaught TypeError: Failed to resolve module specifier "@libsql/client". Relative references must start with either "/", "./", or "../".

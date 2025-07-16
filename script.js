import { createClient } from "@libsql/client";

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
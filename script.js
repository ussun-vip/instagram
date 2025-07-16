import { createClient } from "https://esm.sh/@libsql/client@0.6.0/web";

export const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

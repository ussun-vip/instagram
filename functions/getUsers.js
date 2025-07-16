// Import Turso (libSQL) client
const { createClient } = require('@libsql/client');
require('dotenv').config();

exports.handler = async (event, context) => {
    // Create a client using your Turso DB URL and auth token
    const client = createClient({
        url: process.env.TURSO_DB_URL, // secure environment variable
        authToken: process.env.TURSO_DB_TOKEN // secure environment variable
    });

    try {
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

// why it says 
// {"errorType":"LibsqlError","errorMessage":"URL_INVALID: The URL 'undefined' is not in a valid format","trace":[" at parseUri (C:\\Users\\lonem\\OneDrive\\Desktop\\instagram\\node_modules\\@libsql\\core\\lib-cjs\\uri.js:12:15)"," at expandConfig (C:\\Users\\lonem\\OneDrive\\Desktop\\instagram\\node_modules\\@libsql\\core\\lib-cjs\\config.js:29:39)"," at createClient (C:\\Users\\lonem\\OneDrive\\Desktop\\instagram\\node_modules\\@libsql\\client\\lib-cjs\\node.js:28:52)"," at exports.handler (C:\\Users\\lonem\\OneDrive\\Desktop\\instagram\\.netlify\\functions-internal\\getUsers.js:6:18)"," at executeLambdaFunc (C:\\Users\\lonem\\AppData\\Roaming\\npm\\node_modules\\netlify-cli\\node_modules\\lambda-local\\build\\lambdalocal.js:355:51)"," at Object._executeSync (C:\\Users\\lonem\\AppData\\Roaming\\npm\\node_modules\\netlify-cli\\node_modules\\lambda-local\\build\\lambdalocal.js:380:13)"," at C:\\Users\\lonem\\AppData\\Roaming\\npm\\node_modules\\netlify-cli\\node_modules\\lambda-local\\build\\lambdalocal.js:96:26"," at new Promise ()"," at Object.execute (C:\\Users\\lonem\\AppData\\Roaming\\npm\\node_modules\\netlify-cli\\node_modules\\lambda-local\\build\\lambdalocal.js:88:16)"," at invokeFunctionDirectly (file:///C:/Users/lonem/AppData/Roaming/npm/node_modules/netlify-cli/dist/lib/functions/runtimes/js/index.js:83:38)"]}
// because the environment variables are not set in the local environment
// are you sure ?
// yes, the error indicates that the URL is not being set correctly, which is likely due to the environment variables not being loaded in your local environment
// To resolve this, ensure that you have a `.env` file in your project root with the correct variables set, and use a package like `dotenv` to load them into your environment when running the function locally.
// You can install `dotenv` by running `npm install dotenv` and then require it at the top of your function file like this:
// require('dotenv').config();


// Make sure your `.env` file contains the following lines:
// TURSO_DB_URL=your_database_url
// TURSO_DB_TOKEN=your_auth_token
// Replace `your_database_url` and `your_auth_token` with your actual Turso database
// URL and authentication token.
// Then, when you run your function, it should be able to access these variables correctly.


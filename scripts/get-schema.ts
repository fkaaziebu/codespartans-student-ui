// get-schema.js
const fs = require("fs");
const { spawn } = require("child_process");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.GRAPHQL_BASE_URL;

if (!url) {
  console.error("Please provide a GraphQL URL");
}

const out = fs.createWriteStream("schema.graphql");
const child = spawn("npx", ["get-graphql-schema", url]);

child.stdout.pipe(out);
child.stderr.pipe(process.stderr);

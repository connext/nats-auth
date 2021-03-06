import { readFileSync } from "fs";
import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();

let publicKey: string | undefined;
if (process.env.VECTOR_JWT_SIGNER_PUBLIC_KEY_PATH) {
  publicKey = readFileSync(
    process.env.VECTOR_JWT_SIGNER_PUBLIC_KEY_PATH,
    "utf-8"
  );
}
if (process.env.VECTOR_JWT_SIGNER_PUBLIC_KEY) {
  publicKey = process.env.VECTOR_JWT_SIGNER_PUBLIC_KEY.replace(/\\n/g, "\n");
}
if (!publicKey) {
  throw new Error(
    `VECTOR_JWT_SIGNER_PUBLIC_KEY or VECTOR_JWT_SIGNER_PUBLIC_KEY_PATH is required`
  );
}

let privateKey: string | undefined;
console.log(
  "process.env.VECTOR_JWT_SIGNER_PRIVATE_KEY_PATH: ",
  process.env.VECTOR_JWT_SIGNER_PRIVATE_KEY_PATH
);
if (process.env.VECTOR_JWT_SIGNER_PRIVATE_KEY_PATH) {
  privateKey = readFileSync(
    process.env.VECTOR_JWT_SIGNER_PRIVATE_KEY_PATH,
    "utf-8"
  );
}
if (process.env.VECTOR_JWT_SIGNER_PRIVATE_KEY) {
  privateKey = process.env.VECTOR_JWT_SIGNER_PRIVATE_KEY.replace(/\\n/g, "\n");
}
if (!privateKey) {
  throw new Error(
    `VECTOR_JWT_SIGNER_PRIVATE_KEY or VECTOR_JWT_SIGNER_PRIVATE_KEY_PATH is required`
  );
}

const natsServers = process.env.VECTOR_NATS_URL;
if (!natsServers) {
  throw new Error(`VECTOR_NATS_URL is required`);
}

const adminToken = process.env.VECTOR_ADMIN_TOKEN;
if (!adminToken) {
  throw new Error(`VECTOR_ADMIN_TOKEN is required`);
}

export const config = {
  messagingUrl: natsServers,
  privateKey,
  publicKey,
  adminToken,
  port: parseInt(process.env.VECTOR_PORT ?? "5040"),
};

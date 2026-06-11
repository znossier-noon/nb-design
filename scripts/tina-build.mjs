import { spawnSync } from "node:child_process";

const hasCloudCreds =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) &&
  Boolean(process.env.TINA_TOKEN);

const args = hasCloudCreds
  ? ["build", "--content=local"]
  : ["build", "--local", "--skip-cloud-checks"];

if (hasCloudCreds) {
  console.log("Tina: building admin with Tina Cloud credentials");
} else {
  console.log(
    "Tina: building locally without cloud credentials (set NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN for production admin)",
  );
}

const result = spawnSync("tinacms", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);

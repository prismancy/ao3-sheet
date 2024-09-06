import { load } from "@std/dotenv";
import { GoogleAPI } from "https://deno.land/x/google_deno_integration@v1.1/mod.ts";

import type { Work } from "./ao3.ts";

const { client_email, private_key } = JSON.parse(
  await Deno.readTextFile("service-account.json"),
);

const { SPREADSHEET_ID, SHEET_NAME } = await load();

const api = new GoogleAPI({
  email: client_email,
  scope: ["https://www.googleapis.com/auth/spreadsheets"],
  key: private_key,
});

export function add(...works: Work[]) {
  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:C:append`,
  );
  url.searchParams.set("valueInputOption", "USER_ENTERED");
  url.searchParams.set("insertDataOption", "INSERT_ROWS");
  return api.post(url.href, {
    values: works.map(({ id, title, words }) => [id, words, title]),
  });
}

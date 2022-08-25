import { sheets, auth } from '@googleapis/sheets';
import type { sheets_v4 } from '@googleapis/sheets';

import { Work } from './ao3';

export default class API {
  constructor(private api: sheets_v4.Sheets) {}

  static async create() {
    const authClient = await auth.getClient({
      keyFilename: 'service-account.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });
    const api = sheets({
      version: 'v4',
      auth: authClient
    });
    return new API(api);
  }

  async add(...works: Work[]) {
    const params: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${process.env.SHEET_NAME}!A2:C`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: works.map(({ id, title, words }) => [id, words, title])
      }
    };
    return this.api.spreadsheets.values.append(params);
  }
}

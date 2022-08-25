# ao3-sheet

[![license](https://img.shields.io/github/license/in5dev/ao3-sheet.svg)](LICENSE)

Keeps track of works you've read on Archive of Our Own in a Google Sheet

## Setup

1. Install dependencies using PNPM
2. Create a `.env` file using the example file [.env.example](.env.example)

## Usage

Run `pnpm run add` to be prompted to enter Archive of Our Own work URLs (ex: https://archiveofourown.org/works/XXXXXXXX or https://archiveofourown.org/works/XXXXXXXX/chapters/XXXXXXXX) space-separated

If you put a url with a specific chapter, it will still grab the whole work word count so both kinds of URLs will work the same

## License

[MIT © 2022 in5dev](LICENSE)

const { Client } = require("@notionhq/client");
const templates = require("./templates");
const moment = require("dayjs");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

class notion_db {
  static async returnDatabaseId(dbname) {
    const response = await notion.search({
      query: dbname,
      filter: { property: "object", value: "database" },
    });
    if (response.results.length > 0) {
      return response.results[0].id;
    }
    return null;
  }

  static async savePage(record) {
    let response = null;
    if (record) {
      let rec = { ...record };
      rec.date_saved =
        rec.date_saved === "now"
          ? moment().format("YYYY-MM-DD")
          : rec.date_saved === null
          ? moment().format("YYYY-MM-DD")
          : rec.date_saved;
      response = await notion.pages.create(templates.returnTemplate(rec));
    }
    return response;
  }
}

exports.notion_db = notion_db;

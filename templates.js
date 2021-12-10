exports.returnTemplate = ({ dbId, url, date_saved, name }) => {
  let templates = {
    "8a865a86-eb46-4734-9834-d152cb9470aa": {
      object: "page",
      parent: { database_id: dbId },
      properties: {
        Type: {
          type: "select",
          select: {
            id: "f96d0d0a-5564-4a20-ab15-5f040d49759e",
            name: "Article",
            color: "default",
          },
        },
        Link: {
          type: "url",
          url: url,
        },
        "Date Saved": {
          type: "date",
          date: {
            start: date_saved,
            end: null,
          },
        },
        Status: {
          type: "select",
          select: {
            id: "8c4a056e-6709-4dd1-ba58-d34d9480855a",
            name: "Ready to Start",
            color: "yellow",
          },
        },
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: name,
                link: null,
              },
              plain_text: name,
              href: null,
            },
          ],
        },
      },
    },
  };
  return templates[dbId];
};

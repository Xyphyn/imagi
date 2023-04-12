migrate((db) => {
  const collection = new Collection({
    "id": "496wuglk6brmzdc",
    "created": "2023-03-07 22:41:23.297Z",
    "updated": "2023-03-07 22:41:23.297Z",
    "name": "counts",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "users_name",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "pzr3nlfc",
        "name": "comments",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n    users.id,\n    users.name,\n    count(comments.id) as comments\nFROM users\nLEFT JOIN comments on comments.user = users.id\nGROUP BY users.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("496wuglk6brmzdc");

  return dao.deleteCollection(collection);
})

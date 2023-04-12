migrate((db) => {
  const collection = new Collection({
    "id": "kovydw49a6nasso",
    "created": "2023-03-01 17:00:19.859Z",
    "updated": "2023-03-01 17:00:19.859Z",
    "name": "communities",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vf6cy9me",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": 1,
          "max": 24,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kovydw49a6nasso");

  return dao.deleteCollection(collection);
})

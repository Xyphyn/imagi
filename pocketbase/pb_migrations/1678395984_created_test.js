migrate((db) => {
  const collection = new Collection({
    "id": "cpj4q03s0ggn467",
    "created": "2023-03-09 21:06:24.302Z",
    "updated": "2023-03-09 21:06:24.302Z",
    "name": "test",
    "type": "view",
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
          "min": 3,
          "max": 24,
          "pattern": "^[a-z0-9_]+$"
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n(ROW_NUMBER() OVER()) as id,\ncommunities.name as name\nFROM communities"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cpj4q03s0ggn467");

  return dao.deleteCollection(collection);
})

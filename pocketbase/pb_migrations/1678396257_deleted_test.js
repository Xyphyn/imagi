migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cpj4q03s0ggn467");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "cpj4q03s0ggn467",
    "created": "2023-03-09 21:06:24.302Z",
    "updated": "2023-03-09 21:08:44.554Z",
    "name": "test",
    "type": "view",
    "system": false,
    "schema": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id FROM communities"
    }
  });

  return Dao(db).saveCollection(collection);
})

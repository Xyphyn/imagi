migrate((db) => {
  const collection = new Collection({
    "id": "c1xw5ace3aup96e",
    "created": "2023-03-09 22:07:24.829Z",
    "updated": "2023-03-09 22:07:24.829Z",
    "name": "postCounts",
    "type": "view",
    "system": false,
    "schema": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id FROM posts ORDER BY description LIMIT 1;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("c1xw5ace3aup96e");

  return dao.deleteCollection(collection);
})

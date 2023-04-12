migrate((db) => {
  const collection = new Collection({
    "id": "3m0ljzo1qxdrw5e",
    "created": "2023-02-24 19:43:33.928Z",
    "updated": "2023-02-24 19:43:33.928Z",
    "name": "comments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dd1a8ioj",
        "name": "content",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": 256,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "d8tjtmlo",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != ''",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e");

  return dao.deleteCollection(collection);
})

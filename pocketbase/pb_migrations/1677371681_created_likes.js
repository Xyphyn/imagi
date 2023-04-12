migrate((db) => {
  const collection = new Collection({
    "id": "vmuij40t4ayghbv",
    "created": "2023-02-26 00:34:41.871Z",
    "updated": "2023-02-26 00:34:41.871Z",
    "name": "likes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qpkl4jhv",
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
      },
      {
        "system": false,
        "id": "cawgorxj",
        "name": "post",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "l4rgemtdlgd37rz",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("vmuij40t4ayghbv");

  return dao.deleteCollection(collection);
})

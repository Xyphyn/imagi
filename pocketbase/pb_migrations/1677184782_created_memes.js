migrate((db) => {
  const collection = new Collection({
    "id": "b5y4q1axbo5bdjb",
    "created": "2023-02-23 20:39:42.147Z",
    "updated": "2023-02-23 20:39:42.147Z",
    "name": "memes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5o9bcyin",
        "name": "field",
        "type": "file",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/png",
            "image/jpeg"
          ],
          "thumbs": [
            "128x128"
          ]
        }
      },
      {
        "system": false,
        "id": "uc96l94t",
        "name": "author",
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
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb");

  return dao.deleteCollection(collection);
})

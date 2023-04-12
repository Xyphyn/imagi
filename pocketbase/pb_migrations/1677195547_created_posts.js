migrate((db) => {
  const collection = new Collection({
    "id": "l4rgemtdlgd37rz",
    "created": "2023-02-23 23:39:07.891Z",
    "updated": "2023-02-23 23:39:07.891Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pf3qcwjb",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 64,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "j7bbvxej",
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
        "id": "2rgrwf72",
        "name": "image",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/gif"
          ],
          "thumbs": [
            "128x128",
            "256x256"
          ]
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
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz");

  return dao.deleteCollection(collection);
})

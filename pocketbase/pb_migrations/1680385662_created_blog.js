migrate((db) => {
  const collection = new Collection({
    "id": "pslhah9oi0xqgbc",
    "created": "2023-04-01 21:47:42.154Z",
    "updated": "2023-04-01 21:47:42.154Z",
    "name": "blog",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uyklevzk",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": 24,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "dpffki1g",
        "name": "content",
        "type": "editor",
        "required": true,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "uvqu8vp5",
        "name": "author",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pslhah9oi0xqgbc");

  return dao.deleteCollection(collection);
})

migrate((db) => {
  const collection = new Collection({
    "id": "2yb4d1tyrd0rzq3",
    "created": "2023-03-30 22:29:30.873Z",
    "updated": "2023-03-30 22:29:30.873Z",
    "name": "reports",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bopsrl2d",
        "name": "post",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "l4rgemtdlgd37rz",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "xsc7glld",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "hkrfo7em",
        "name": "comment",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "3m0ljzo1qxdrw5e",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "5xa0juw5",
        "name": "reason",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 256,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ly5j67in",
        "name": "author",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2yb4d1tyrd0rzq3");

  return dao.deleteCollection(collection);
})

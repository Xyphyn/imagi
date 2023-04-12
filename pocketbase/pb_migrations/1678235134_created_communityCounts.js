migrate((db) => {
  const collection = new Collection({
    "id": "lr55yys0uwmbwfs",
    "created": "2023-03-08 00:25:34.757Z",
    "updated": "2023-03-08 00:25:34.757Z",
    "name": "communityCounts",
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
      },
      {
        "system": false,
        "id": "dgh0axtx",
        "name": "posts",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "rppm4ptq",
        "name": "members",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n    communities.id,\n    communities.name,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE communities.id\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY communities.id"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs");

  return dao.deleteCollection(collection);
})

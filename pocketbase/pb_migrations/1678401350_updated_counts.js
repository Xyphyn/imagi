migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("496wuglk6brmzdc")

  collection.options = {
    "query": "SELECT\n    users.id,\n    users.id as user,\n    count(DISTINCT comments.id) as comments,\n    count(DISTINCT posts.id) as posts\nFROM (select 1) as dummy, users\nLEFT JOIN comments on comments.user = users.id\nLEFT JOIN posts on posts.user = users.id\nGROUP BY users.id"
  }

  // remove
  collection.schema.removeField("nnmae9dv")

  // remove
  collection.schema.removeField("9a9rg4zj")

  // remove
  collection.schema.removeField("bdzdwect")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xwn6tuzs",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t5bls8n9",
    "name": "comments",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1rtahfdx",
    "name": "posts",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("496wuglk6brmzdc")

  collection.options = {
    "query": "SELECT\n    users.id,\n    users.username,\n    count(DISTINCT comments.id) as comments,\n    count(DISTINCT posts.id) as posts\nFROM users\nLEFT JOIN comments on comments.user = users.id\nLEFT JOIN posts on posts.user = users.id\nGROUP BY users.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nnmae9dv",
    "name": "username",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9a9rg4zj",
    "name": "comments",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bdzdwect",
    "name": "posts",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("xwn6tuzs")

  // remove
  collection.schema.removeField("t5bls8n9")

  // remove
  collection.schema.removeField("1rtahfdx")

  return dao.saveCollection(collection)
})

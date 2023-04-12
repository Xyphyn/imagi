migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("496wuglk6brmzdc")

  collection.options = {
    "query": "SELECT\n    users.id,\n    users.username,\n    count(DISTINCT comments.id) as comments,\n    count(DISTINCT posts.id) as posts\nFROM users\nLEFT JOIN comments on comments.user = users.id\nLEFT JOIN posts on posts.user = users.id\nGROUP BY users.id"
  }

  // remove
  collection.schema.removeField("ggvzbggu")

  // remove
  collection.schema.removeField("xwlatm4x")

  // remove
  collection.schema.removeField("6f1qihrf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vkvnmdrz",
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
    "id": "naorqkly",
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
    "id": "bkunujkd",
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
    "query": "SELECT\n    users.id,\n    users.username,\n    count(comments.id) as comments,\n    count(posts.id) as posts\nFROM users\nLEFT JOIN comments on comments.user = users.id\nLEFT JOIN posts on posts.user = users.id\nGROUP BY users.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggvzbggu",
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
    "id": "xwlatm4x",
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
    "id": "6f1qihrf",
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
  collection.schema.removeField("vkvnmdrz")

  // remove
  collection.schema.removeField("naorqkly")

  // remove
  collection.schema.removeField("bkunujkd")

  return dao.saveCollection(collection)
})

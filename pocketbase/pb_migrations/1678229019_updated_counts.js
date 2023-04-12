migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("496wuglk6brmzdc")

  collection.options = {
    "query": "SELECT\n    users.id,\n    users.username,\n    count(comments.id) as comments,\n    count(posts.id) as posts\nFROM users\nLEFT JOIN comments on comments.user = users.id\nLEFT JOIN posts on posts.user = users.id\nGROUP BY users.id"
  }

  // remove
  collection.schema.removeField("8q7x99j3")

  // remove
  collection.schema.removeField("hkprfcgc")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("496wuglk6brmzdc")

  collection.options = {
    "query": "SELECT\n    users.id,\n    users.username,\n    count(comments.id) as comments\nFROM users\nLEFT JOIN comments on comments.user = users.id\n\nGROUP BY users.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8q7x99j3",
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
    "id": "hkprfcgc",
    "name": "comments",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("ggvzbggu")

  // remove
  collection.schema.removeField("xwlatm4x")

  // remove
  collection.schema.removeField("6f1qihrf")

  return dao.saveCollection(collection)
})

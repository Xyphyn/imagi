migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("496wuglk6brmzdc")

  collection.options = {
    "query": "SELECT\n    users.id,\n    users.username,\n    count(comments.id) as comments,\n    count(posts.id) as posts\nFROM users\nLEFT JOIN comments on comments.user = users.id\nLEFT JOIN posts on posts.user = users.id\nGROUP BY users.id"
  }

  // remove
  collection.schema.removeField("1vky1k8n")

  // remove
  collection.schema.removeField("wotlcpny")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hf2n0pfl",
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
    "id": "vy6sftz3",
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
    "id": "xmiesqrh",
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
    "query": "SELECT\n    users.id,\n    users.username,\n    count(comments.id) as comments\nFROM users\nLEFT JOIN comments on comments.user = users.id\nGROUP BY users.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1vky1k8n",
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
    "id": "wotlcpny",
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
  collection.schema.removeField("hf2n0pfl")

  // remove
  collection.schema.removeField("vy6sftz3")

  // remove
  collection.schema.removeField("xmiesqrh")

  return dao.saveCollection(collection)
})

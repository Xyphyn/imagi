migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n    communities.id as id,\n    communities.name as community,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY communities.id"
  }

  // remove
  collection.schema.removeField("neos9w7k")

  // remove
  collection.schema.removeField("bhecuww9")

  // remove
  collection.schema.removeField("in79v9xh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kusm2kqt",
    "name": "posts",
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
    "id": "w9aobjrq",
    "name": "members",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vf6cy9me",
    "name": "community",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 3,
      "max": 24,
      "pattern": "^[a-z0-9_]+$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n    (ROW_NUMBER() OVER()) as id,\n    communities.id as community,\n    communities.name,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY communities.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "neos9w7k",
    "name": "community",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bhecuww9",
    "name": "posts",
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
    "id": "in79v9xh",
    "name": "members",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("kusm2kqt")

  // remove
  collection.schema.removeField("w9aobjrq")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n    (ROW_NUMBER() OVER()) as id,\n    communities.id as community,\n    communities.name,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY communities.id"
  }

  // remove
  collection.schema.removeField("sl87xq04")

  // remove
  collection.schema.removeField("h9dpplie")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n    communities.id,\n    communities.name,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY communities.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sl87xq04",
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
    "id": "h9dpplie",
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
  collection.schema.removeField("neos9w7k")

  // remove
  collection.schema.removeField("bhecuww9")

  // remove
  collection.schema.removeField("in79v9xh")

  return dao.saveCollection(collection)
})

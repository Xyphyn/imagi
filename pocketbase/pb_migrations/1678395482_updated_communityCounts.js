migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n         communities.id,\n         communities.name as community,\n         count(DISTINCT posts.id) as posts,\n         count(DISTINCT users.id) as members\n       FROM communities\n       LEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\n       LEFT JOIN posts on posts.community = communities.id\n       GROUP BY communities.id;"
  }

  // remove
  collection.schema.removeField("kusm2kqt")

  // remove
  collection.schema.removeField("w9aobjrq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jdwtwq39",
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
    "id": "2wjhfthp",
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
    "query": "SELECT\n    communities.id as id,\n    communities.name as community,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY communities.id"
  }

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

  // remove
  collection.schema.removeField("jdwtwq39")

  // remove
  collection.schema.removeField("2wjhfthp")

  return dao.saveCollection(collection)
})

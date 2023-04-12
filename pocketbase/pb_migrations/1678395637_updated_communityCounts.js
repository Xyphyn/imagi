migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n         communities.id,\n         communities as community,\n         count(DISTINCT posts.id) as posts,\n         count(DISTINCT users.id) as members\n       FROM communities\n       LEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\n       LEFT JOIN posts on posts.community = communities.id\n       GROUP BY communities.id;"
  }

  // remove
  collection.schema.removeField("vf6cy9me")

  // remove
  collection.schema.removeField("jdwtwq39")

  // remove
  collection.schema.removeField("2wjhfthp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mubnjup4",
    "name": "community",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ensszuip",
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
    "id": "htybm1ds",
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
    "query": "SELECT\n         communities.id,\n         communities.name as community,\n         count(DISTINCT posts.id) as posts,\n         count(DISTINCT users.id) as members\n       FROM communities\n       LEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\n       LEFT JOIN posts on posts.community = communities.id\n       GROUP BY communities.id;"
  }

  // add
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

  // remove
  collection.schema.removeField("mubnjup4")

  // remove
  collection.schema.removeField("ensszuip")

  // remove
  collection.schema.removeField("htybm1ds")

  return dao.saveCollection(collection)
})

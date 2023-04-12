migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n         communities.id,\n         communities as community,\n         count(DISTINCT posts.id) as posts,\n         count(DISTINCT users.id) as members\n       FROM communities\n       LEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\n       LEFT JOIN posts on posts.community = communities.id\n       GROUP BY communities;"
  }

  // remove
  collection.schema.removeField("mubnjup4")

  // remove
  collection.schema.removeField("ensszuip")

  // remove
  collection.schema.removeField("htybm1ds")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gm655hmh",
    "name": "community",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aumoyb02",
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
    "id": "i7fxnk4x",
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
    "query": "SELECT\n         communities.id,\n         communities as community,\n         count(DISTINCT posts.id) as posts,\n         count(DISTINCT users.id) as members\n       FROM communities\n       LEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\n       LEFT JOIN posts on posts.community = communities.id\n       GROUP BY communities.id;"
  }

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

  // remove
  collection.schema.removeField("gm655hmh")

  // remove
  collection.schema.removeField("aumoyb02")

  // remove
  collection.schema.removeField("i7fxnk4x")

  return dao.saveCollection(collection)
})

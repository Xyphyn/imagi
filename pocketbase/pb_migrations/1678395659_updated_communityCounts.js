migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n         communities.id,\n         communities as community,\n         count(DISTINCT posts.id) as posts,\n         count(DISTINCT users.id) as members\n       FROM communities\n       LEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\n       LEFT JOIN posts on posts.community = communities.id;"
  }

  // remove
  collection.schema.removeField("gm655hmh")

  // remove
  collection.schema.removeField("aumoyb02")

  // remove
  collection.schema.removeField("i7fxnk4x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mouyk2lu",
    "name": "community",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hhxfawbv",
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
    "id": "zvgpelf9",
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
    "query": "SELECT\n         communities.id,\n         communities as community,\n         count(DISTINCT posts.id) as posts,\n         count(DISTINCT users.id) as members\n       FROM communities\n       LEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\n       LEFT JOIN posts on posts.community = communities.id\n       GROUP BY communities;"
  }

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

  // remove
  collection.schema.removeField("mouyk2lu")

  // remove
  collection.schema.removeField("hhxfawbv")

  // remove
  collection.schema.removeField("zvgpelf9")

  return dao.saveCollection(collection)
})

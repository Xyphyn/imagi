migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n    communities.id,\n    communities as community,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY community"
  }

  // remove
  collection.schema.removeField("t3uahmex")

  // remove
  collection.schema.removeField("1tmv9pyi")

  // remove
  collection.schema.removeField("tkt6zziz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tvfnlwja",
    "name": "community",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vtkzdmze",
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
    "id": "kyjnkx5h",
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
    "query": "SELECT\n    communities.id,\n    communities as community,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY communities.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t3uahmex",
    "name": "community",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1tmv9pyi",
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
    "id": "tkt6zziz",
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
  collection.schema.removeField("tvfnlwja")

  // remove
  collection.schema.removeField("vtkzdmze")

  // remove
  collection.schema.removeField("kyjnkx5h")

  return dao.saveCollection(collection)
})

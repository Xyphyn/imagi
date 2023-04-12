migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("496wuglk6brmzdc")

  // remove
  collection.schema.removeField("xwn6tuzs")

  // remove
  collection.schema.removeField("t5bls8n9")

  // remove
  collection.schema.removeField("1rtahfdx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8cnliifp",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0ivnsw2s",
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
    "id": "ugzh3xks",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xwn6tuzs",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t5bls8n9",
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
    "id": "1rtahfdx",
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
  collection.schema.removeField("8cnliifp")

  // remove
  collection.schema.removeField("0ivnsw2s")

  // remove
  collection.schema.removeField("ugzh3xks")

  return dao.saveCollection(collection)
})

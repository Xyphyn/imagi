migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  // remove
  collection.schema.removeField("us0vkw3s")

  // remove
  collection.schema.removeField("bhrnakct")

  // remove
  collection.schema.removeField("u15newv9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6ay9m4gd",
    "name": "community",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kovydw49a6nasso",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xglrwj3e",
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
    "id": "h0ai1ak6",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "us0vkw3s",
    "name": "community",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kovydw49a6nasso",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bhrnakct",
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
    "id": "u15newv9",
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
  collection.schema.removeField("6ay9m4gd")

  // remove
  collection.schema.removeField("xglrwj3e")

  // remove
  collection.schema.removeField("h0ai1ak6")

  return dao.saveCollection(collection)
})

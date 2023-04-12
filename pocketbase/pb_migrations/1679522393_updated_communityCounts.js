migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  // remove
  collection.schema.removeField("m5bcdt8b")

  // remove
  collection.schema.removeField("tswlnlxo")

  // remove
  collection.schema.removeField("wtm2yhwb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mjl9pmlc",
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
    "id": "eoodzzxy",
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
    "id": "zujrq1yf",
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
    "id": "m5bcdt8b",
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
    "id": "tswlnlxo",
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
    "id": "wtm2yhwb",
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
  collection.schema.removeField("mjl9pmlc")

  // remove
  collection.schema.removeField("eoodzzxy")

  // remove
  collection.schema.removeField("zujrq1yf")

  return dao.saveCollection(collection)
})

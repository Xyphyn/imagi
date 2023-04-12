migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pslhah9oi0xqgbc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lge7yb2g",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 128,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pslhah9oi0xqgbc")

  // remove
  collection.schema.removeField("lge7yb2g")

  return dao.saveCollection(collection)
})

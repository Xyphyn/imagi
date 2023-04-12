migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kovydw49a6nasso")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zccwje1g",
    "name": "description",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 64,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kovydw49a6nasso")

  // remove
  collection.schema.removeField("zccwje1g")

  return dao.saveCollection(collection)
})

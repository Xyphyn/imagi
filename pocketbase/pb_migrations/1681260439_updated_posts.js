migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vfkagikt",
    "name": "alt_text",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 256,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  // remove
  collection.schema.removeField("vfkagikt")

  return dao.saveCollection(collection)
})

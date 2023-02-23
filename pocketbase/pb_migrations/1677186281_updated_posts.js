migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ky9o1mme",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 10,
      "max": 200,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  // remove
  collection.schema.removeField("ky9o1mme")

  return dao.saveCollection(collection)
})

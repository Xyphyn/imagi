migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ky9o1mme",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 64,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  // update
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
})

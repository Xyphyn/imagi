migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jsfqm6xu",
    "name": "community",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kovydw49a6nasso",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  // remove
  collection.schema.removeField("jsfqm6xu")

  return dao.saveCollection(collection)
})

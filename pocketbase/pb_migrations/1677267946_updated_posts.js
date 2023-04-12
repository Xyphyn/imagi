migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aoxvtwbj",
    "name": "comments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "3m0ljzo1qxdrw5e",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  // remove
  collection.schema.removeField("aoxvtwbj")

  return dao.saveCollection(collection)
})

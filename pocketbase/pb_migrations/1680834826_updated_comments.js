migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gxs94any",
    "name": "parent",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "3m0ljzo1qxdrw5e",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  // remove
  collection.schema.removeField("gxs94any")

  return dao.saveCollection(collection)
})

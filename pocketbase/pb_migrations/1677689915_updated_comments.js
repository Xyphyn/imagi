migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kilxwmdm",
    "name": "post",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "l4rgemtdlgd37rz",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kilxwmdm",
    "name": "post",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "l4rgemtdlgd37rz",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

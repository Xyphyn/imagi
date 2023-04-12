migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vmuij40t4ayghbv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cawgorxj",
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
  const collection = dao.findCollectionByNameOrId("vmuij40t4ayghbv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cawgorxj",
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

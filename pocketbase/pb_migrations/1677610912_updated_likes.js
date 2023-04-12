migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vmuij40t4ayghbv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qpkl4jhv",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
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
    "id": "qpkl4jhv",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d8tjtmlo",
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
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d8tjtmlo",
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

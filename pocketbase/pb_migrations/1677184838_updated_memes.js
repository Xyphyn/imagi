migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uc96l94t",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uc96l94t",
    "name": "author",
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

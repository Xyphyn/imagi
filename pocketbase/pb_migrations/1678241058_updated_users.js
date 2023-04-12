migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hqw7wmox",
    "name": "bio",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 128,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("hqw7wmox")

  return dao.saveCollection(collection)
})

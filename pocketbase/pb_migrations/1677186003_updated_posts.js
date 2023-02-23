migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5o9bcyin",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg"
      ],
      "thumbs": [
        "128x128"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5o9bcyin",
    "name": "field",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg"
      ],
      "thumbs": [
        "128x128"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

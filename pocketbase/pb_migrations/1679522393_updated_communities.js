migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kovydw49a6nasso")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rgbcy2nk",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/svg+xml",
        "image/webp"
      ],
      "thumbs": [
        "128x128",
        "48x48",
        "32x32"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kovydw49a6nasso")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rgbcy2nk",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/svg+xml",
        "image/webp"
      ],
      "thumbs": [
        "128x128"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

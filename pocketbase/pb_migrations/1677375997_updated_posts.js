migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2rgrwf72",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/gif",
        "video/webm",
        "video/mp4",
        "video/quicktime",
        "video/x-matroska"
      ],
      "thumbs": [
        "128x128",
        "256x256"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2rgrwf72",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/gif",
        "video/webm",
        "video/mp4"
      ],
      "thumbs": [
        "128x128",
        "256x256"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

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
      "maxSize": 8242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/gif",
        "video/mp4",
        "video/webm"
      ],
      "thumbs": [
        "128x128",
        "256x256",
        "64x64",
        "256x0"
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
      "maxSize": 8242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/gif",
        "video/mp4",
        "video/webm"
      ],
      "thumbs": [
        "128x128",
        "256x256",
        "64x64",
        "128x0"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

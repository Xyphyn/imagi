migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  collection.indexes = []

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
        "video/webm",
        "video/quicktime"
      ],
      "thumbs": [
        "128x128",
        "256x256",
        "64x64"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jsfqm6xu",
    "name": "community",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kovydw49a6nasso",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  collection.indexes = [
    "CREATE INDEX `_l4rgemtdlgd37rz_created_idx` ON `posts` (`created`)"
  ]

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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jsfqm6xu",
    "name": "community",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "kovydw49a6nasso",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})

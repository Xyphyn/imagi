migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kovydw49a6nasso")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vf6cy9me",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 3,
      "max": 24,
      "pattern": "^[a-z]+$"
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zccwje1g",
    "name": "description",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 4,
      "max": 64,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kovydw49a6nasso")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vf6cy9me",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 1,
      "max": 24,
      "pattern": "^[a-z]+$"
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zccwje1g",
    "name": "description",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": 64,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})

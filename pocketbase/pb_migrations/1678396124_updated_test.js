migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cpj4q03s0ggn467")

  collection.options = {
    "query": "SELECT id FROM communities"
  }

  // remove
  collection.schema.removeField("vf6cy9me")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cpj4q03s0ggn467")

  collection.options = {
    "query": "SELECT\n(ROW_NUMBER() OVER()) as id,\ncommunities.name as name\nFROM communities"
  }

  // add
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
      "pattern": "^[a-z0-9_]+$"
    }
  }))

  return dao.saveCollection(collection)
})

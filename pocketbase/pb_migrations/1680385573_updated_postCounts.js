migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1xw5ace3aup96e")

  // remove
  collection.schema.removeField("mtlxmrtn")

  // remove
  collection.schema.removeField("679cakvn")

  // remove
  collection.schema.removeField("pxvwzzmf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b1arpcxe",
    "name": "post",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "l4rgemtdlgd37rz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vloi8eo4",
    "name": "comments",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ed5ptkhs",
    "name": "likes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1xw5ace3aup96e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mtlxmrtn",
    "name": "post",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "l4rgemtdlgd37rz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "679cakvn",
    "name": "comments",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pxvwzzmf",
    "name": "likes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("b1arpcxe")

  // remove
  collection.schema.removeField("vloi8eo4")

  // remove
  collection.schema.removeField("ed5ptkhs")

  return dao.saveCollection(collection)
})

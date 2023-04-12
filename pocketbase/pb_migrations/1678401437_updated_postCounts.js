migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("c1xw5ace3aup96e")

  collection.options = {
    "query": "SELECT\n    posts.id,\n    posts.id as post,\n    count(DISTINCT comments.id) as comments,\n    count(DISTINCT likes.id) as likes\nFROM (select 1) as dummy, posts\nLEFT JOIN comments on comments.post = posts.id\nLEFT JOIN likes on likes.post = posts.id\nGROUP BY posts.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okn7u34o",
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
    "id": "2fxiteol",
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
    "id": "l14axscp",
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

  collection.options = {
    "query": "SELECT id FROM posts ORDER BY description LIMIT 1;"
  }

  // remove
  collection.schema.removeField("okn7u34o")

  // remove
  collection.schema.removeField("2fxiteol")

  // remove
  collection.schema.removeField("l14axscp")

  return dao.saveCollection(collection)
})

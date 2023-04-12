migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n    communities.id,\n    communities.name,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY communities.id"
  }

  // remove
  collection.schema.removeField("efntta4u")

  // remove
  collection.schema.removeField("jpx1pnlg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gnb1g1u8",
    "name": "posts",
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
    "id": "xefpxv1d",
    "name": "members",
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
  const collection = dao.findCollectionByNameOrId("lr55yys0uwmbwfs")

  collection.options = {
    "query": "SELECT\n    communities.id as id,\n    communities.name,\n    count(DISTINCT posts.id) as posts,\n    count(DISTINCT users.id) as members\nFROM communities\nLEFT JOIN users on users.communities LIKE '%' || communities.id || '%'\nLEFT JOIN posts on posts.community = communities.id\nGROUP BY communities.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "efntta4u",
    "name": "posts",
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
    "id": "jpx1pnlg",
    "name": "members",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("gnb1g1u8")

  // remove
  collection.schema.removeField("xefpxv1d")

  return dao.saveCollection(collection)
})

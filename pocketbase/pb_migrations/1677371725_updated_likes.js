migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vmuij40t4ayghbv")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "@request.auth.id = user.id"
  collection.deleteRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vmuij40t4ayghbv")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

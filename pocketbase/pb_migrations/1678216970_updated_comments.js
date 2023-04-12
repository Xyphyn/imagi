migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  collection.createRule = "@request.auth.id != '' && user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  collection.createRule = null

  return dao.saveCollection(collection)
})

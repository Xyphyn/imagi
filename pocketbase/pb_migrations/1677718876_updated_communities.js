migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kovydw49a6nasso")

  collection.updateRule = "@request.auth.id = owner.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kovydw49a6nasso")

  collection.updateRule = null

  return dao.saveCollection(collection)
})

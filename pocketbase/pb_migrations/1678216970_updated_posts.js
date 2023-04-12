migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  collection.createRule = "@request.auth.id != '' && @request.auth.verified = true && user.id = @request.auth.id"
  collection.updateRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})

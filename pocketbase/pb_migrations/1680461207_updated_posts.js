migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  collection.deleteRule = "user.id = @request.auth.id || community.owner.id = @request.auth.id || @request.auth.role = 'admin'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})

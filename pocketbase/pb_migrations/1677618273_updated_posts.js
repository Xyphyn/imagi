migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  collection.createRule = "@request.auth.id != '' && @request.auth.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l4rgemtdlgd37rz")

  collection.createRule = null

  return dao.saveCollection(collection)
})

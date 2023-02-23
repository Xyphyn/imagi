migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  collection.name = "posts"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b5y4q1axbo5bdjb")

  collection.name = "memes"

  return dao.saveCollection(collection)
})

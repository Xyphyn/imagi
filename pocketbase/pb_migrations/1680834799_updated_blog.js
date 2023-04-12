migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pslhah9oi0xqgbc")

  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pslhah9oi0xqgbc")

  collection.indexes = [
    "CREATE INDEX `_pslhah9oi0xqgbc_created_idx` ON `blog` (`created`)"
  ]

  return dao.saveCollection(collection)
})

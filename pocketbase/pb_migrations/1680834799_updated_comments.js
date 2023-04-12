migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  collection.updateRule = "@request.auth.id = user.id"
  collection.indexes = [
    "CREATE INDEX `idx_7HKsBGL` ON `comments` (`user`)",
    "CREATE INDEX `idx_fjQfkm6` ON `comments` (`post`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3m0ljzo1qxdrw5e")

  collection.updateRule = null
  collection.indexes = [
    "CREATE INDEX `_3m0ljzo1qxdrw5e_created_idx` ON `comments` (`created`)"
  ]

  return dao.saveCollection(collection)
})

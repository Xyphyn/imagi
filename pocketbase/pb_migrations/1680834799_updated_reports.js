migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2yb4d1tyrd0rzq3")

  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2yb4d1tyrd0rzq3")

  collection.indexes = [
    "CREATE INDEX `_2yb4d1tyrd0rzq3_created_idx` ON `reports` (`created`)"
  ]

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = "@request.data.role:isset != true && @request.data.username:isset = true"
  collection.indexes = []

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.createRule = null
  collection.indexes = [
    "CREATE INDEX `__pb_users_auth__created_idx` ON `users` (`created`)"
  ]

  return dao.saveCollection(collection)
})

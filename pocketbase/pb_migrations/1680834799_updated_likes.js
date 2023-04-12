migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vmuij40t4ayghbv")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_9LT41Wd` ON `likes` (\n  `user`,\n  `post`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vmuij40t4ayghbv")

  collection.indexes = [
    "CREATE INDEX `_vmuij40t4ayghbv_created_idx` ON `likes` (`created`)",
    "CREATE UNIQUE INDEX likes_post_user_idx ON likes (post, user)"
  ]

  return dao.saveCollection(collection)
})

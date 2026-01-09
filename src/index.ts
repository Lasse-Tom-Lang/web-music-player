import express from "express"
const app = express()
import fs from "fs"

app.listen(80, () => {
  console.log("Server started on port 80")
})

app.use('/', express.static('./public/'))
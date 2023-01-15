import express from "express"
const app = express()
import fs from "fs"

app.listen(80, () => {
  console.log("Server started on port 80")
})

app.use('/icons', express.static('./public/icons'))
app.use('/music', express.static('./music'))

app.get('/', (req, res) => {
  res.write(fs.readFileSync("./public/index.html"));
  res.end();
});

app.get('/style.css', (req, res) => {
  res.write(fs.readFileSync("./public/style.css"));
  res.end();
});

app.get('/script.js', (req, res) => {
  res.write(fs.readFileSync("./public/script.js"));
  res.end();
});
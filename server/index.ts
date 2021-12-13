import express from 'express'

const app = express()
const port = 2053

app.get('/', (req, res) => {
  res.send('Hi there!')
})

app.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})
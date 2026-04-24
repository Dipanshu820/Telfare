// Core module
const path = require('path');
//external module
const express = require('express')
// Local module
const userRouter = require('./routes/user')
const app = express()


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'view'));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }))


app.use((req , res , next) => {
console.log('Server is correctly working till here')
next()
})

app.use('/', userRouter)

const PORT = 3000;
app.listen(PORT , () => {
  console.log(`Server is running at http://localhost:${PORT}/`)
} )
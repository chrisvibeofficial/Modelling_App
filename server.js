require('dotenv').config();
require('./config/database')
const express = require('express');
const PORT = process.env.PORT
const userRouter = require('./router/userRouter')

const app = express();

app.use(express.json());
app.use('/api', userRouter)

app.listen(PORT, () => {
  console.log(`Server is listening to port: ${PORT}`)
})
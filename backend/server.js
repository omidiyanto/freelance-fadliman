const app = require('./app')
const port = process.env.port || 3001
const env = require('dotenv')

env.config({ path: './.env' })

 app.listen(port, () => {
    console.log(`App running on port ${port}`);
   
  });
const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')
const { registerUser, verifyToken } = require("./idp.authenticator");

app.use(express.json())
app.use('/v1/idp/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get("/v1/idp/profile", verifyToken);
app.post("/v1/idp/register", registerUser);

const port = process.env.PORT || 3000;

if(process.env.CHECK_DB){
  const sql = require("./idp.db");
  sql.getConnection((err,conn)=>{
    if(err && !conn){
      console.log('DB Connection failed')
      console.error(err)
      process.exit(1)
    } 
  })
}

app.listen(port, () =>
  console.log(`Identity Provider listening on port ${port}`)
);

const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')
const { fetchUserWithToken, verifyToken } = require("./idp.authenticator");

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get("/v1/idp/status", verifyToken);
app.get("/v1/idp/fetch", fetchUserWithToken);

const port = process.env.PORT || 3000;

const sql = require("./idp.db");
sql.getConnection((err,_conn)=>{
  if(err){
    console.log('DB Connection failed')
    console.error(err)
    process.exit(1)
  } 
})

app.listen(port, () =>
  console.log(`Identity Provider listening on port ${port}`)
);

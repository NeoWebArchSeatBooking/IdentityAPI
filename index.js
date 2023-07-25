const express = require("express");
const app = express();
const { fetchUserWithToken, verifyToken } = require("./idp.authenticator");

app.post("/idp/verify", verifyToken);
app.post("/idp/fetch", fetchUserWithToken);

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

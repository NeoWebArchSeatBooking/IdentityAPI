const express = require("express");
const app = express();
const { fetchUserWithToken, verifyToken } = require("./idp.authenticator");

app.post("/idp/verify", verifyToken);
app.post("/idp/fetch", fetchUserWithToken);

const port = process.env.PORT || 3000;
//
process.env.DB_HOST = process.env.DB_HOST || "idpdb";
process.env.DB_USER = process.env.DB_USER || 3000;
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 3000;
process.env.DB_SCHEME = process.env.DB_SCHEME || "idpdb";
//

app.listen(port, () =>
  console.log(`Identity Provider listening on port ${port}`)
);

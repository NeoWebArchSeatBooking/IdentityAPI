const { validateTokenInfo } = require("./idp.provider");
const { getErrorResponse,getSuccesResponse } = require("./idp.helper")
const Profile = require("./idp.dao");

const fetchToken = (req) => {
  let token = req.headers["authorization"];
  if (token && (token.indexOf("Bearer") > -1 || token.indexOf("bearer") > -1)) {
    token = token.split(" ")[1];
  }
  return token;
};

const registerUser = async (req,res)=>{
  let response = getErrorResponse(400, "Bad Request, pass valid bearer token in authroization");
  try {
    const token = fetchToken(req);
    if (token) {
      response = await validateTokenInfo(token);
      if (response.metadata.status === 200) {
        response = await register(response.profile) 
      }else{
        response = getErrorResponse(response.metadata.status, response.metadata.statusText);
      }
    }
  } catch (err) {
    console.error(err);
    response = getErrorResponse(500, err.message);
  }
  res.status(response.metadata.status).json(response);
}

const register = async (profile) => {
  let response;
  try {
    const req = { ...profile }
    req.role = req.role ?? 'user'
    await Profile.save(req);
    response = { req , metadata: {status:200,statusText: "OK"}}
  } catch (err) {
    console.error(err);
    response = getErrorResponse(500, err.message);
  }
  return response;
};

const verifyToken = async (req, res) => {
  let response = getErrorResponse(400, "Bad Request, pass valid bearer token in authroization");
  try {
    const token = fetchToken(req);
    if (token) {
      response = await validateTokenInfo(token);
      if (response.metadata.status === 200) {
        const record = await Profile.findById(response.profile.userId);
        console.log(record)
        if (record.status === 200) {
          response = getSuccesResponse({
            ...record.profile,
            firstName:response.profile.firstName,
            lastName:response.profile.lastName,
            profilePic:response.profile.profilePic,
          });
        } else {
          response = await register(response.profile);
        }
      }
    }
  } catch (err) {
    console.error(err);
    response = getErrorResponse(500, err.message);
  }
  res.status(response.metadata.status).json(response);
};

module.exports = { registerUser, verifyToken };

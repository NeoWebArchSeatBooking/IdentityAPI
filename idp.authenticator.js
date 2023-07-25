const { fetchUserInfo, validateTokenInfo } = require("./idp.provider");
const { getErrorResponse,getSuccesResponse } = require("./idp.helper")
const Profile = require("./idp.dao");

const fetchToken = (req) => {
  let token = req.headers["authorization"];
  if (token && (token.indexOf("Bearer") > -1 || token.indexOf("bearer") > -1)) {
    token = token.split(" ")[1];
  }
  return token;
};

const registerUser = async (token) => {
  let response;
  try {
    response = await fetchUserInfo(token);
    if (response.metadata.status === 200) {
      await Profile.save(response.profile);
    }
  } catch (err) {
    console.error(err);
    response = getErrorResponse(500, err.message);
  }
  return response;
};

const fetchUserWithToken = async (req, res) => {
  let response = getErrorResponse(403, "No authorize header");
  try {
    const token = fetchToken(req);
    if (token) {
      response = await fetchUserInfo(token);
    }
  } catch (err) {
    console.error(err);
    response = getErrorResponse(500, err.message);
  }
  res.status(response.metadata.status).json(response);
};

const verifyToken = async (req, res) => {
  let response = getErrorResponse(403, "No authorize header");
  try {
    const token = fetchToken(req);
    if (token) {
      response = await validateTokenInfo(token);
      if (response.metadata.status === 200) {
        const record = await Profile.findById(response.profile.userId);
        console.log(record)
        if (record.status === 200) {
          response = getSuccesResponse(record.profile);
        } else {
          response = await registerUser(token);
        }
      }
    }
  } catch (err) {
    console.error(err);
    response = getErrorResponse(500, err.message);
  }
  res.status(response.metadata.status).json(response);
};

module.exports = { fetchUserWithToken, verifyToken };

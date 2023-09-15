const axios = require("axios");

const validateTokenInfo = async (token) => {
  const response = { metadata: {} };
  try {
    const { status, statusText, data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );
    response.metadata.status = status;
    response.metadata.statusText = statusText;
    if (status === 200 && data.email) {
      response.profile = { 
        userId: data.email,
        name: data.name,
        firstName: data.given_name,
        lastName:  data.family_name,
        profilePic: data.picture
      };
    }
  } catch (err) {
    console.error(err.message);
    getMetadata(err.response, response.metadata);
  }
  return response;
};

function getMetadata(resp, metadata) {
  metadata.status = resp.status;
  metadata.statusText = resp.statusText;
  if (resp.status === 400 && resp.data && resp.data.error_description) {
    metadata.message = `${resp.data.error} : ${resp.data.error_description}`;
  } else if (
    resp.status === 401 &&
    resp.data &&
    resp.data.error &&
    resp.data.error.code
  ) {
    metadata.message = resp.data.error.message;
  } else if (resp.status !== 200) {
    metadata.message = resp.data;
  }
}

module.exports = { validateTokenInfo };

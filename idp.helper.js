const getErrorResponse = (status, statusText, description) => {
  return {
    metadata: {
      status,
      statusText: statusText,
      message: description,
    },
  };
};

const getSuccesResponse = (payload) => {
  return {
    metadata: {
      status: 200,
      statusText: "OK",
    },
    profile: payload,
  };
};

module.exports = { getErrorResponse, getSuccesResponse };

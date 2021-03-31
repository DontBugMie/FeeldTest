export const callApi = async ({
  endpoint,
  sessionToken = null,
  method,
  contentType = 'application/json; charset=utf-8',
  headers = {},
}) => {
  const apiRootUrl = 'https://fld-devtest-api.herokuapp.com/api/';
  const version = 'v1/';
  const url = apiRootUrl + version + endpoint;

  try {
    let response = await fetch(url, {
      method,
      headers: {
        'Content-Type': contentType,
        'session-token': sessionToken,
        ...headers,
      },
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

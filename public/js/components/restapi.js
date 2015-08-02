import 'fetch';

class RestApi {
  getDataFromUrl(url, callback) {
    fetch(url, {
      credentials: 'same-origin'
    }).then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      callback(data)
    }).catch(function(error) {
      console.log(error);
      window.location.href = '/login';
    })
  }

  putDataToUrl(url, bodyContent, callback) {
    fetch(url, {
      credentials: 'same-origin',
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyContent)
    }).then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      if(callback) callback(data)
    }).catch(function(error) {
      console.log(error);
      window.location.href = '/login';
    })
  }

  postDataToUrl(url, bodyContent, callback) {
    fetch(url, {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyContent)
    }).then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      if(callback) callback(data)
    }).catch(function(error) {
      console.log(error);
      window.location.href = '/login';
    })
  }


}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export default new RestApi();

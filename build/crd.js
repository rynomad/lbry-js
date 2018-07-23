class CrdRPCClient {
  constructor(url, username, password) {
    this.username = username
    this.password = password
    this.url = url;
  }

  request(method, params) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Basic ' + Buffer.from(this.username + ":" + this.password).toString('base64'));

      fetch(this.url, {
        method: "post",
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: Math.random()
            .toString(16)
            .slice(2),
          method: method,
          params: params
        })
      })
        .then(response => {
          if (response.ok) {
            response.json().then(rpcResponse => {
              if (rpcResponse.error) {
                reject(rpcResponse.error);
              } else {
                resolve(rpcResponse.result);
              }
            });
          } else {
            reject({
              code: -1,
              message: "Network error",
              data: {
                statusCode: response.status,
                statusText: response.statusText
              }
            });
          }
        })
        .catch(error => {
          reject({
            code: -1,
            message: "Network error"
          });
        });
    });
  }
}

module.exports = CrdRPCClient
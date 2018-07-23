class RPCClient {
  constructor(url) {
    this.url = url;
  }

  request(method, params) {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: "post",
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
              if ("error" in rpcResponse) {
                this.help({ command : method })
                  .then(({ help }) => {
                    console.log(`${method}`);
                    console.log(method.replace(/./g, "_"));
                    console.log(help);
                    console.error("Error:", rpcResponse.error.message);
                    reject(rpcResponse.error);
                  })
                  .catch(error => {
                    reject(rpcResponse.error);
                  });
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

  blob_announce(params) {
    return this.request("blob_announce", params);
  }
  blob_availability(params) {
    return this.request("blob_availability", params);
  }
  blob_delete(params) {
    return this.request("blob_delete", params);
  }
  blob_get(params) {
    return this.request("blob_get", params);
  }
  blob_list(params) {
    return this.request("blob_list", params);
  }
  blob_reflect(params) {
    return this.request("blob_reflect", params);
  }
  blob_reflect_all(params) {
    return this.request("blob_reflect_all", params);
  }
  block_show(params) {
    return this.request("block_show", params);
  }
  channel_export(params) {
    return this.request("channel_export", params);
  }
  channel_import(params) {
    return this.request("channel_import", params);
  }
  channel_list(params) {
    return this.request("channel_list", params);
  }
  channel_new(params) {
    return this.request("channel_new", params);
  }
  claim_abandon(params) {
    return this.request("claim_abandon", params);
  }
  claim_list(params) {
    return this.request("claim_list", params);
  }
  claim_list_by_channel(params) {
    return this.request("claim_list_by_channel", params);
  }
  claim_list_mine(params) {
    return this.request("claim_list_mine", params);
  }
  claim_new_support(params) {
    return this.request("claim_new_support", params);
  }
  claim_renew(params) {
    return this.request("claim_renew", params);
  }
  claim_send_to_address(params) {
    return this.request("claim_send_to_address", params);
  }
  claim_show(params) {
    return this.request("claim_show", params);
  }
  cli_test_command(params) {
    return this.request("cli_test_command", params);
  }
  commands(params) {
    return this.request("commands", params);
  }
  daemon_stop(params) {
    return this.request("daemon_stop", params);
  }
  file_delete(params) {
    return this.request("file_delete", params);
  }
  file_list(params) {
    return this.request("file_list", params);
  }
  file_reflect(params) {
    return this.request("file_reflect", params);
  }
  file_set_status(params) {
    return this.request("file_set_status", params);
  }
  get(params) {
    return this.request("get", params);
  }
  help(params) {
    return this.request("help", params);
  }
  peer_list(params) {
    return this.request("peer_list", params);
  }
  peer_ping(params) {
    return this.request("peer_ping", params);
  }
  publish(params) {
    return this.request("publish", params);
  }
  report_bug(params) {
    return this.request("report_bug", params);
  }
  resolve(params) {
    return this.request("resolve", params);
  }
  resolve_name(params) {
    return this.request("resolve_name", params);
  }
  routing_table_get(params) {
    return this.request("routing_table_get", params);
  }
  settings_get(params) {
    return this.request("settings_get", params);
  }
  settings_set(params) {
    return this.request("settings_set", params);
  }
  status(params) {
    return this.request("status", params);
  }
  stream_availability(params) {
    return this.request("stream_availability", params);
  }
  stream_cost_estimate(params) {
    return this.request("stream_cost_estimate", params);
  }
  transaction_list(params) {
    return this.request("transaction_list", params);
  }
  transaction_show(params) {
    return this.request("transaction_show", params);
  }
  utxo_list(params) {
    return this.request("utxo_list", params);
  }
  version(params) {
    return this.request("version", params);
  }
  wallet_balance(params) {
    return this.request("wallet_balance", params);
  }
  wallet_decrypt(params) {
    return this.request("wallet_decrypt", params);
  }
  wallet_encrypt(params) {
    return this.request("wallet_encrypt", params);
  }
  wallet_is_address_mine(params) {
    return this.request("wallet_is_address_mine", params);
  }
  wallet_list(params) {
    return this.request("wallet_list", params);
  }
  wallet_new_address(params) {
    return this.request("wallet_new_address", params);
  }
  wallet_prefill_addresses(params) {
    return this.request("wallet_prefill_addresses", params);
  }
  wallet_public_key(params) {
    return this.request("wallet_public_key", params);
  }
  wallet_send(params) {
    return this.request("wallet_send", params);
  }
  wallet_unlock(params) {
    return this.request("wallet_unlock", params);
  }
  wallet_unused_address(params) {
    return this.request("wallet_unused_address", params);
  }
}

module.exports = RPCClient;

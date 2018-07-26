const api = "LbryCrd";

class RPCClient {
  constructor(url, username, password) {
    this.username = username;
    this.password = password;
    this.url = url;
  }

  request(method, params) {
    return new Promise((resolve, reject) => {
      let headers;
      if (this.username && this.password) {
        headers = new Headers();
        headers.append(
          "Authorization",
          "Basic " +
            Buffer.from(this.username + ":" + this.password).toString("base64")
        );
      }

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
          if (response.ok || response.statusText === "Bad Request") {
            response.json().then(rpcResponse => {
              if (rpcResponse.error) {
                const error = {
                  message: rpcResponse.error
                };
                const args = api === "LbryCrd" ? [method] : { command: method };
                this.help(args)
                  .then(response => {
                    error.help = response.help || response;
                    reject(error);
                  })
                  .catch(error => {
                    reject(error);
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
          console.log(error);
          reject({
            code: -1,
            message: "Network error"
          });
        });
    });
  }

  abandonclaim(params) {
    return this.request("abandonclaim", params);
  }
  abandonsupport(params) {
    return this.request("abandonsupport", params);
  }
  claimname(params) {
    return this.request("claimname", params);
  }
  getclaimbyid(params) {
    return this.request("getclaimbyid", params);
  }
  getclaimsforname(params) {
    return this.request("getclaimsforname", params);
  }
  getclaimsfortx(params) {
    return this.request("getclaimsfortx", params);
  }
  getclaimsintrie(params) {
    return this.request("getclaimsintrie", params);
  }
  getclaimtrie(params) {
    return this.request("getclaimtrie", params);
  }
  getnameproof(params) {
    return this.request("getnameproof", params);
  }
  gettotalclaimednames(params) {
    return this.request("gettotalclaimednames", params);
  }
  gettotalclaims(params) {
    return this.request("gettotalclaims", params);
  }
  gettotalvalueofclaims(params) {
    return this.request("gettotalvalueofclaims", params);
  }
  getvalueforname(params) {
    return this.request("getvalueforname", params);
  }
  listnameclaims(params) {
    return this.request("listnameclaims", params);
  }
  supportclaim(params) {
    return this.request("supportclaim", params);
  }
  updateclaim(params) {
    return this.request("updateclaim", params);
  }
  getbestblockhash(params) {
    return this.request("getbestblockhash", params);
  }
  getblock(params) {
    return this.request("getblock", params);
  }
  getblockchaininfo(params) {
    return this.request("getblockchaininfo", params);
  }
  getblockcount(params) {
    return this.request("getblockcount", params);
  }
  getblockhash(params) {
    return this.request("getblockhash", params);
  }
  getblockheader(params) {
    return this.request("getblockheader", params);
  }
  getchaintips(params) {
    return this.request("getchaintips", params);
  }
  getdifficulty(params) {
    return this.request("getdifficulty", params);
  }
  getmempoolinfo(params) {
    return this.request("getmempoolinfo", params);
  }
  getrawmempool(params) {
    return this.request("getrawmempool", params);
  }
  gettxout(params) {
    return this.request("gettxout", params);
  }
  gettxoutproof(params) {
    return this.request("gettxoutproof", params);
  }
  gettxoutsetinfo(params) {
    return this.request("gettxoutsetinfo", params);
  }
  verifychain(params) {
    return this.request("verifychain", params);
  }
  verifytxoutproof(params) {
    return this.request("verifytxoutproof", params);
  }
  getinfo(params) {
    return this.request("getinfo", params);
  }
  help(params) {
    return this.request("help", params);
  }
  stop(params) {
    return this.request("stop", params);
  }
  generate(params) {
    return this.request("generate", params);
  }
  generatetoaddress(params) {
    return this.request("generatetoaddress", params);
  }
  getblocktemplate(params) {
    return this.request("getblocktemplate", params);
  }
  getgenerate(params) {
    return this.request("getgenerate", params);
  }
  gethashespersec(params) {
    return this.request("gethashespersec", params);
  }
  getmininginfo(params) {
    return this.request("getmininginfo", params);
  }
  getnetworkhashps(params) {
    return this.request("getnetworkhashps", params);
  }
  prioritisetransaction(params) {
    return this.request("prioritisetransaction", params);
  }
  setgenerate(params) {
    return this.request("setgenerate", params);
  }
  submitblock(params) {
    return this.request("submitblock", params);
  }
  addnode(params) {
    return this.request("addnode", params);
  }
  clearbanned(params) {
    return this.request("clearbanned", params);
  }
  disconnectnode(params) {
    return this.request("disconnectnode", params);
  }
  getaddednodeinfo(params) {
    return this.request("getaddednodeinfo", params);
  }
  getconnectioncount(params) {
    return this.request("getconnectioncount", params);
  }
  getnettotals(params) {
    return this.request("getnettotals", params);
  }
  getnetworkinfo(params) {
    return this.request("getnetworkinfo", params);
  }
  getpeerinfo(params) {
    return this.request("getpeerinfo", params);
  }
  listbanned(params) {
    return this.request("listbanned", params);
  }
  ping(params) {
    return this.request("ping", params);
  }
  setban(params) {
    return this.request("setban", params);
  }
  createrawtransaction(params) {
    return this.request("createrawtransaction", params);
  }
  decoderawtransaction(params) {
    return this.request("decoderawtransaction", params);
  }
  decodescript(params) {
    return this.request("decodescript", params);
  }
  fundrawtransaction(params) {
    return this.request("fundrawtransaction", params);
  }
  getrawtransaction(params) {
    return this.request("getrawtransaction", params);
  }
  sendrawtransaction(params) {
    return this.request("sendrawtransaction", params);
  }
  signrawtransaction(params) {
    return this.request("signrawtransaction", params);
  }
  createmultisig(params) {
    return this.request("createmultisig", params);
  }
  estimatefee(params) {
    return this.request("estimatefee", params);
  }
  estimatepriority(params) {
    return this.request("estimatepriority", params);
  }
  estimatesmartfee(params) {
    return this.request("estimatesmartfee", params);
  }
  estimatesmartpriority(params) {
    return this.request("estimatesmartpriority", params);
  }
  validateaddress(params) {
    return this.request("validateaddress", params);
  }
  verifymessage(params) {
    return this.request("verifymessage", params);
  }
  abandontransaction(params) {
    return this.request("abandontransaction", params);
  }
  addmultisigaddress(params) {
    return this.request("addmultisigaddress", params);
  }
  backupwallet(params) {
    return this.request("backupwallet", params);
  }
  dumpprivkey(params) {
    return this.request("dumpprivkey", params);
  }
  dumpwallet(params) {
    return this.request("dumpwallet", params);
  }
  encryptwallet(params) {
    return this.request("encryptwallet", params);
  }
  getaccount(params) {
    return this.request("getaccount", params);
  }
  getaccountaddress(params) {
    return this.request("getaccountaddress", params);
  }
  getaddressesbyaccount(params) {
    return this.request("getaddressesbyaccount", params);
  }
  getbalance(params) {
    return this.request("getbalance", params);
  }
  getnewaddress(params) {
    return this.request("getnewaddress", params);
  }
  getrawchangeaddress(params) {
    return this.request("getrawchangeaddress", params);
  }
  getreceivedbyaccount(params) {
    return this.request("getreceivedbyaccount", params);
  }
  getreceivedbyaddress(params) {
    return this.request("getreceivedbyaddress", params);
  }
  gettransaction(params) {
    return this.request("gettransaction", params);
  }
  getunconfirmedbalance(params) {
    return this.request("getunconfirmedbalance", params);
  }
  getwalletinfo(params) {
    return this.request("getwalletinfo", params);
  }
  importaddress(params) {
    return this.request("importaddress", params);
  }
  importprivkey(params) {
    return this.request("importprivkey", params);
  }
  importprunedfunds(params) {
    return this.request("importprunedfunds", params);
  }
  importpubkey(params) {
    return this.request("importpubkey", params);
  }
  importwallet(params) {
    return this.request("importwallet", params);
  }
  keypoolrefill(params) {
    return this.request("keypoolrefill", params);
  }
  listaccounts(params) {
    return this.request("listaccounts", params);
  }
  listaddressgroupings(params) {
    return this.request("listaddressgroupings", params);
  }
  listlockunspent(params) {
    return this.request("listlockunspent", params);
  }
  listreceivedbyaccount(params) {
    return this.request("listreceivedbyaccount", params);
  }
  listreceivedbyaddress(params) {
    return this.request("listreceivedbyaddress", params);
  }
  listsinceblock(params) {
    return this.request("listsinceblock", params);
  }
  listtransactions(params) {
    return this.request("listtransactions", params);
  }
  listunspent(params) {
    return this.request("listunspent", params);
  }
  lockunspent(params) {
    return this.request("lockunspent", params);
  }
  move(params) {
    return this.request("move", params);
  }
  removeprunedfunds(params) {
    return this.request("removeprunedfunds", params);
  }
  sendfrom(params) {
    return this.request("sendfrom", params);
  }
  sendmany(params) {
    return this.request("sendmany", params);
  }
  sendtoaddress(params) {
    return this.request("sendtoaddress", params);
  }
  setaccount(params) {
    return this.request("setaccount", params);
  }
  settxfee(params) {
    return this.request("settxfee", params);
  }
  signmessage(params) {
    return this.request("signmessage", params);
  }
}

module.exports = RPCClient;

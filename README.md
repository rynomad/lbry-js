LBRY-JS
===

lbry-js is a small JavaScript client library for interacting with lbry-daemon and lbrycrd via the JSON-RPC api. works in node.js and the browser (via webpack or similar).

Usage
---
```bash
npm install --save lbry
```

 Lbry-js supports both the LBRY daemon and LbryCrd; the api's are similar but slightly different. The daemon accepts arguments as an object, wheras since LbryCrd expects them as an array, you must pass them as an ordered array. see (the RPC docs)[https://lbryio.github.io/lbry/] for the parameters for each method on the corresponding clients.



```javascript
// If in node; you'll need to supply a 'fetch' polyfill
// global.fetch = require('node-fetch')

const {DaemonClient, CrdClient} = require('lbry')

const client = new DaemonClient('http://localhost:5279')

client.wallet_list().then(list => console.log(list))

client.help({command : "blob_announce"}).then(({help}) => {
  console.log(help)
  /* prints:
  Set daemon settings

  Usage:
    settings_set [--download_directory=<download_directory>]
                 [--data_rate=<data_rate>]
                 [--download_timeout=<download_timeout>]
                 [--peer_port=<peer_port>]
                 [--max_key_fee=<max_key_fee>]
                 [--disable_max_key_fee=<disable_max_key_fee>]
                 [--use_upnp=<use_upnp>]
                 [--run_reflector_server=<run_reflector_server>]
                 [--cache_time=<cache_time>]
                 [--reflect_uploads=<reflect_uploads>]
                 [--share_usage_data=<share_usage_data>]
                 [--peer_search_timeout=<peer_search_timeout>]
                 [--sd_download_timeout=<sd_download_timeout>]
                 [--auto_renew_claim_height_delta=<auto_renew_claim_height_delta>]

Options:
    --download_directory=<download_directory>  : (str) path of download directory
    --data_rate=<data_rate>                    : (float) 0.0001
    --download_timeout=<download_timeout>      : (int) 180
    --peer_port=<peer_port>                    : (int) 3333
    --max_key_fee=<max_key_fee>                : (dict) maximum key fee for downloads,
                                                  in the format:
                                                  {
                                                    'currency': <currency_symbol>,
                                                    'amount': <amount>
                                                  }.
                                                  In the CLI, it must be an escaped JSON string
                                                  Supported currency symbols: LBC, USD, BTC
    --disable_max_key_fee=<disable_max_key_fee> : (bool) False
    --use_upnp=<use_upnp>            : (bool) True
    --run_reflector_server=<run_reflector_server>  : (bool) False
    --cache_time=<cache_time>  : (int) 150
    --reflect_uploads=<reflect_uploads>  : (bool) True
    --share_usage_data=<share_usage_data>  : (bool) True
    --peer_search_timeout=<peer_search_timeout>  : (int) 3
    --sd_download_timeout=<sd_download_timeout>  : (int) 3
    --auto_renew_claim_height_delta=<auto_renew_claim_height_delta> : (int) 0
        claims set to expire within this many blocks will be
        automatically renewed after startup (if set to 0, renews
        will not be made automatically)


  Returns:
    (dict) Updated dictionary of daemon settings
  */
})

client.settings_set({
  download_timeout : 6000,
  share_usage_data : false,
  run_reflector_server : true,
  max_key_fee : {
    currency : 'LBC',
    amount : 5
  }
}).then(settings => {
  console.log(settings)
  /* prints:
  { allowed_origin: '',
  announce_head_blobs_only: true,
  api_host: 'localhost',
  api_port: 5279,
  auto_re_reflect_interval: 86400,
  auto_renew_claim_height_delta: 0,
  blockchain_name: 'lbrycrd_main',
  cache_time: 150,
  concurrent_announcers: 10,
  data_dir: '/Users/ry/Library/Application Support/LBRY',
  data_rate: 0.0001,
  delete_blobs_on_remove: true,
  dht_node_port: 4444,
  disable_max_key_fee: false,
  download_directory: '/Users/ry/Downloads',
  download_timeout: 6000,
  is_generous_host: true,
  known_dht_nodes:
   [ [ 'lbrynet1.lbry.io', 4444 ],
     [ 'lbrynet2.lbry.io', 4444 ],
     [ 'lbrynet3.lbry.io', 4444 ] ],
  lbryum_servers: [ [ 'lbryumx1.lbry.io', 50001 ], [ 'lbryumx2.lbry.io', 50001 ] ],
  lbryum_wallet_dir: '/Users/ry/.lbryum',
  max_connections_per_stream: 5,
  max_key_fee: { amount: 1, currency: 'LBC' },
  min_info_rate: 0.02,
  min_valuable_hash_rate: 0.05,
  min_valuable_info_rate: 0.05,
  peer_port: 3333,
  peer_search_timeout: 30,
  pointtrader_server: 'http://127.0.0.1:2424',
  reflect_uploads: true,
  reflector_port: 5566,
  reflector_servers: [ [ 'reflector2.lbry.io', 5566 ] ],
  run_reflector_server: true,
  s3_headers_depth: 960,
  sd_download_timeout: 3,
  seek_head_blob_first: true,
  share_usage_data: false,
  use_auth_http: false,
  use_keyring: false,
  use_upnp: true,
  wallet: 'lbryum' }
  */
})

const crd = new CrdClient('http://localhost:9245', 'rpcuser', 'rpcpass')

crd.help(['getinfo']).then(help => {
  console.log(help)
  /*prints :
  Returns an object containing various state info.

  Result:
  {
    "version": xxxxx,           (numeric) the server version
    "protocolversion": xxxxx,   (numeric) the protocol version
    "walletversion": xxxxx,     (numeric) the wallet version
    "balance": xxxxxxx,         (numeric) the total lbrycrd balance of the wallet
    "blocks": xxxxxx,           (numeric) the current number of blocks processed in the server
    "timeoffset": xxxxx,        (numeric) the time offset
    "connections": xxxxx,       (numeric) the number of connections
    "proxy": "host:port",     (string, optional) the proxy used by the server
    "difficulty": xxxxxx,       (numeric) the current difficulty
    "testnet": true|false,      (boolean) if the server is using testnet or not
    "keypoololdest": xxxxxx,    (numeric) the timestamp (seconds since GMT epoch) of the oldest pre-generated key in the key pool
    "keypoolsize": xxxx,        (numeric) how many new keys are pre-generated
    "unlocked_until": ttt,      (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
    "paytxfee": x.xxxx,         (numeric) the transaction fee set in LBC/kB
    "relayfee": x.xxxx,         (numeric) minimum relay fee for non-free transactions in LBC/kB
    "errors": "..."           (string) any error messages
  }

  Examples:
  > lbrycrd-cli getinfo
  > curl --user myusername --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9245/

  */
})

crd.signmessage(['lbrycrdaddress','message']).then(signature => {
  console.log(signature)
  /* prints signature

  */
})
```

Building
---
lbry-js is programatically generated by [jrgen](https://github.com/mzernetsch/jrgen). The JSON file consumed by jrgen is currently generated by jrgen.js in the scripts directory, but will eventually be targeted at the [artifact being generated](https://github.com/lbryio/lbry.tech/issues/42) for lbry.tech api documentation. 

```bash
# do this once
$ npm install
$ npm setup

# set up lbry-daemon virtualenv to get a raw json file from lbry-daemon, ensure a daemon is running then cd back here
# also make sure a LbryCrd daemon is running

(venv)$ npm run build
$ npm test 
```

Roadmap to 0.1.0
---
* [x] basic client.request(<\method_name\>, [params]) lbrycrd client
* [x] programmatic generation of full lbry-daemon client
* [x] lbry-daemon api tests
* [x] programmatic generation of lbrycrd client
* [x] lbrycrd api tests
* [x] don't use a custom fork of jrgen; use plugin systems
* [x] npm test script
* [x] npm build script

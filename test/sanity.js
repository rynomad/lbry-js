(async function (){
  try {
    global.fetch = require('node-fetch')
    global.Headers = require('fetch-headers')
    const {CrdClient, DaemonClient} = require('../index.js')
  
    const daemon = new DaemonClient('http://localhost:5279')

    const wallets = await daemon.wallet_list()

    const crd = new CrdClient('http://localhost:9245', 'testtest', 'testtest')

    const info = await crd.request("getinfo")
    console.log(wallets)
    console.log(info)

    process.exit(0)
  } catch (e) {
    console.log('error')
    console.log(e)
    process.exit(1)
  }
})()



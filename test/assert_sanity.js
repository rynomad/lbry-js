
global.fetch = require('node-fetch')
global.Headers = require('fetch-headers')

describe('sanity', () => {
  it('imports and runs', async function (){
    const {CrdClient, DaemonClient} = require('../index.js')
  
    const daemon = new DaemonClient('http://localhost:5279')

    const wallets = await daemon.wallet_list()

    const crd = new CrdClient('http://localhost:9245', 'testtest', 'testtest')

    const info = await crd.request("getinfo")
  })
})



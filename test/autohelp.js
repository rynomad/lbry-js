
global.fetch = require('node-fetch')
global.Headers = require('fetch-headers')
const assert = require('assert')
const jrgen = require('../build/jrgen.daemon.json')
const {DaemonClient} = require('../index.js')
const daemon = new DaemonClient('http://localhost:5279')

describe('AutoHelp runs on all methods', () => {
  Object.keys(jrgen.methods).forEach(method_name => {
    it(method_name, async function (){
      try {
        const wallets = await daemon[method_name]({unsupported_param : 'should throw error'})
      } catch (e){
        assert(e.help)
      }
    })
  })
})


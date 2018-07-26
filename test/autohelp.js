
global.fetch = require('node-fetch')
global.Headers = require('fetch-headers')
const assert = require('assert')
const jrgen_daemon = require('../build/jrgen.daemon.json')
const jrgen_crd = require('../build/jrgen.crd.json')
const {DaemonClient, CrdClient} = require('../index.js')
const daemon = new DaemonClient('http://localhost:5279')
const crd = new CrdClient('http://localhost:9245','testtest','testtest')

describe('AutoHelp runs on all methods', () => {
  describe('Daemon', () => {
    Object.keys(jrgen_daemon.methods).forEach(method_name => {
      it(method_name, async function (){
        try {
          const fail = await daemon[method_name]({unsupported_param : 'should throw error'})

          if (['settings_set','file_list','file_delete'].indexOf(method_name) === -1){
            // possible bug in lbry-daemon; I expect unsupported_param to always force error
            assert(false)
          }
        } catch (e){
          assert(e.help)
        }
      })
    })
  })

  describe('Crd', () => {
    Object.keys(jrgen_crd.methods).forEach(method_name => {
      it(method_name, async function (){
        try {
          const fail = await crd[method_name]({unsupported_param : 'should throw error'})
        } catch (e){
          assert(e.help)
        }
      })
    })
  })

})


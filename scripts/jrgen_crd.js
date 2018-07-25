global.Headers = require('fetch-headers')
global.fetch = require('node-fetch')
const {execSync} = require('child_process')
const fs = require('fs')
const path = require('path')
const {CrdClient} = require('../index.js')

const client = new CrdClient('http://localhost:9245','testtest','testtest')

const api = {
  "$schema":
    "https://rawgit.com/mzernetsch/jrgen/master/jrgen-spec.schema.json",
  "jrgen": "1.1",
  "jsonrpc": "2.0",

  "info": {
    "title": "LbryCrd",
    "description": [
      "An example api which handles various rpc requests.",
      "This api follows the json-rpc 2.0 specification. More information available at http://www.jsonrpc.org/specification."
    ],
    "version": "1.0"
  },

  "definitions": {
    // this section can be used to define reusable schemas internally; claims, transactions...
  },

  "methods": {}
}

async function start(){
  try {
    const help = await client.request('help')
    help.split('\n')
        .filter(exists => exists && exists.indexOf('==') === -1)
        .forEach(( methodstr) => {
          api.methods[methodstr.split(' ')[0]] = {
            description : methodstr
          }
          methodstr.split(' ')[0]
        })

    const jsonpath = path.join(__dirname,'..','build','jrgen.crd.json')
    const jrgenpath = path.join(__dirname, '..','node_modules','.bin','jrgen')
    fs.writeFileSync(jsonpath, JSON.stringify(api,null,4))
    execSync(`${jrgenpath} client/es6 ${jsonpath} && mv LbryCrdClient.js build/crd.js`)
    console.log(JSON.stringify(api,null,4))
  } catch(e){
    console.log(e)
  }

}

start()
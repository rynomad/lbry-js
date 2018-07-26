
const path = require('path')
var methods = require('fs').readFileSync(path.join(__dirname, '..', 'build', 'lbry.pygen.json')).toString().split('\n').filter(t => t).map(a => JSON.parse(a))
const fs = require('fs')
const {execSync} = require('child_process')

const api = {
  "$schema":
    "https://rawgit.com/mzernetsch/jrgen/master/jrgen-spec.schema.json",
  "jrgen": "1.1",
  "jsonrpc": "2.0",

  "info": {
    "title": "LbryDaemon",
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

const TYPES = {
  str : "string",
  dict : "object",
  bool : "boolean",
  int : "number",
  float : "number"
}

methods.forEach(({name, description, arguments, returns}) => {
  api.methods[name] = {
    description,
    
    params : {
      type : "object",
      properties : arguments.reduce((obj, {type, name, description, properties}) => ({
        [name] : {
          type : TYPES[type] || 'number',
          name,
          description,
          properties : properties || {}
        },
        ...obj
      }), {}), 
      required : arguments.filter(({is_required}) => is_required).map(({name}) => name)
    },

    result : {
      type : "string",
      description: returns
    }
  }
})

const jsonpath = path.join(__dirname,'..','build','jrgen.daemon.json')
const jrgenpath = path.join(__dirname, '..','node_modules','.bin','jrgen')
fs.writeFileSync(jsonpath, JSON.stringify(api,null,4))
execSync(`${jrgenpath} lbry/client ${jsonpath} && mv LbryDaemonClient.js build`)
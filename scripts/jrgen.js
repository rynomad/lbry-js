var methods = require('fs').readFileSync(process.argv.pop()).toString().split('\n').filter(t => t).map(a => JSON.parse(a))
const path = require('path')
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
execSync(`${jrgenpath} client/es6 ${jsonpath} && mv LbryDaemonClient.js build`)
console.log(JSON.stringify(api, null, 4)) 

/*

"publish": {
  "summary": "Make a new name claim and publish associated data to lbrynet, update over existing claim if user already has a claim for name.",
  "description":
      "Fields required in the final Metadata are:\n            'title'\n            'description'\n            'author'\n            'language'\n            'license'\n            'nsfw'\n\n        Metadata can be set by either using the metadata argument or by setting individual arguments\n        fee, title, description, author, language, license, license_url, thumbnail, preview, nsfw,\n        or sources. Individual arguments will overwrite the fields specified in metadata argument.",

  "tags": ["content", "fee"],

  "params": {
    "type": "object",
    "properties": {
      "name": {
        "description": "name for the content",
        "default": "admin",
        "type": "string",
        "minLength": 1,
        "example": "lbry-rocks"
      }
    },

    "required": ["name", "bid", "file_path"]
  }

  "result": {
    "type" : "object",
    "properties": {
      "tx" : {
        "type" : "string",
        "description": "hex encoded transaction",
        "example": "0100000008fa4e01e57294cd72e...d4e1c557033b26256b0c1a96286488ac00000000"  
      }
    }
  },

  "errors": [
    {
      "description": "missing required arguments",
      "code": 1,
      "message": "InvalidArgumants"
    }
  ]
}
*/
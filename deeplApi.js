var fs = require('fs');
var axios = require('axios');
var querystring = require('querystring');
var https = require('https')
var settings; 

if(fs.existsSync('./settings_copy.js')){
    settings = require('./settings_copy.js');
}
else{
    settings = require('./settings');
}    


module.exports = {
    

    /*
     * The object for deepl:
     *
     * {
     * 
     *  text: text to be translated,
     * source_lang: Source language, DE EN FR ES PT IT NL PL RU
     * target_lang: target language,
     * split_sentences: 1 (default)  --- should be "nonewlines" in case of XML hanlding
     * preserve_formatting 0 (default),
     *
     * ONLY INCLUDE THIS, IF YOU USE tag_handling: "xml"
     * tag_handling : "xml" Will parse and translate text between opening / closing tag
     * ignore_tags : "name of tag to be ignored" , e. g. "lang-ignore"   means everything between <lang-ignore> </lang-ignore> will be ignored
     * }
     *
     *
     */



    translate: async function(obj, callback) {

        if (obj["auth_key"] === "" || obj["text"] === "" || obj["target_lang"] === "" || obj["auth_key"] == "undefined" || obj["text"] == "undefined" || obj["target_lang"] == "undefined") {
            console.log("Error: Auth key, Text or target_lang missing!");
            return;
        }
        if (!obj.hasOwnProperty("ignore_tags") || obj["ignore_tags"] == "") {
            obj["ignore_tags"] = "lang-ignore"; // <lang-ignore> blabla </lang-ignore> will be ignored
        }
        obj["split_sentences"] = "nonewlines";
        obj["tag_handling"] = "xml";
        obj["auth_key"] = settings.deeplSettings.auth_key;

        var request = querystring.stringify(obj);
        request = settings.deeplSettings.hostname + settings.deeplSettings.path + "?" + request;

         //return await this.getRequest(request);
         return await this.postRequest(obj);

    },

    getRequest:  async function (reqString) {


        var transl = await axios.get(reqString);
        return transl;
        /*  
        //settings.deeplSettings.headers["Content-Length"] = Buffer.byteLength(reqString);
        var req = https.request(settings.deeplSettings,
            function (res) {
                res.setEncoding('utf8');
                console.log('statusCode from deepl API: ${res.statusCode}');

                res.on('data',
                    function(d){
                        callback(d);
                    });
            });

        req.on('error',
            (error) => {
                console.error(error);
            });
        
        req.end();
        */
    },

    postRequest: async function (obj){
        //obj["headers"]
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        var transl = await axios.post(settings.deeplSettings.hostname + settings.deeplSettings.path, obj)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log("\nError with sending to Deepl: " + error);
          });
          
          return transl;

    }

}


var fs = require('fs');
var axios = require('axios');
var querystring = require('querystring');
var https = require('https');
var qs = require('qs');

var settings;

if (fs.existsSync('./settings_copy.js')) {
    settings = require('./settings_copy.js');
}
else {
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



    translate: async function (obj, callback) {

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
        return this.postRequest(obj);

    },

    getRequest: async function (reqString) {


        var transl = await axios.get(reqString);
        return transl;

    },

    postRequest: async function (obj) {
        const url = settings.deeplSettings.hostname + settings.deeplSettings.path;
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        //console.log(obj);
        return await axios.post(url, qs.stringify(obj), headers);


    }

}


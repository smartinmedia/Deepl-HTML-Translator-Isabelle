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

    translate: function(obj, callback) {

        if (obj["auth_key"] === "" || obj["text"] === "" || obj["target_lang"] === "") {
            console.log("Error: Auth key, Text or target_lang missing!");
            return;
        }
        if (!obj.hasOwnProperty("ignore_tags") || obj["ignore_tag"] == "") {
            obj["ignore_tag"] = "lang-ignore"; // <lang-ignore> blabla </lang-ignore> will be ignored
        }
        obj["split_sentences"] = "nonewlines";
        obj["tag_handling"] = "xml";
        obj["auth_key"] = settings.deeplSettings.auth_key;

        var request = querystring.stringify(obj);

        this.sendPost(request, callback);

    },

    sendPost: function (reqString, callback) {
        settings.deeplSettings.headers["Content-Length"] = Buffer.byteLength(reqString);
        var req = https.request(settings.deeplSettings,
            function (res) {
                res.setEncoding('utf8');
                console.log(`statusCode from deepl API: ${res.statusCode}`);

                res.on('data',
                    function(d){
                        callback(d);
                    });
            });

        req.on('error',
            (error) => {
                console.error(error);
            });

        req.write(data);
        req.end();

    }
 

}


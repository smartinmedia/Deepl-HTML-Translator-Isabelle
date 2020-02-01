module.exports = {

    // This is the source language and the language in your HTML files
    defaultLanguage : "en",

    translateTo : [
        "de",
        "fr"
    ],

    ignoreInJson : "<ignore/>", //Don't confuse this with the deeplSettings.ignore_tag: This here can be put into a JS language file within a line of text and the whole text will not be overwritten anymore in the next translation

        // the attribute in your html tags e. g. <span data-lang="intro">This is the intro</span>
    langAttribute : "data-lang", 
    
    //Available languages in deepl
    availableLanguages: [ 
        "en",
        "de",
        "fr",
        "es",
        "pt",
        "it",
        "nl",
        "pl",
        "ru"
    ],

    // The common path, which will be added to the htmlWithLang scripts WITH TRAILING SLASH:
    commonPathOfHtmlFiles : "./test/html_for_translation/",

    // The prefix for the JSON files. Type "lang" and then the files names will be lang_en.js, lang_de.js, etc
    jsonFilePrefix : "lang",

    // The common path for the JSON output files WITH TRAILING SLASH:
    commonPathOfJsonFiles : "./test/js_output/",

    // The HTML files, which will be parsed WITHOUT THE PATH FROM ABOVE
    // If you want to have the full paths here, just leave the above commonPathOfHtmlFiles with "" empty
    htmlWithLang: [                    
        "test.html"
    ],

    // Settings for the deepl API
    deeplSettings: {
        auth_key: "", //Your Deepl Auth Key 
        hostname: 'https://api.deepl.com',
        ignore_tag: "lang-ignore",
        port: 443,
        path: '/v2/translate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': 0 // Needs to be replaced with bytes 
        }
    }
}
# Deepl-HTML-Translator
An inofficial NodeJS tool to translate websites via the Deepl API

THIS NODE.JS DEEPL PARSER IS FREE SOFTWARE UNDER MIT LICENSE (c) EasyRadiology GmbH 2020.
------------------------------------------------------------------------------------------
TERMS/CONDITIONS: DEEPL TRANSLATIONS COST MONEY!!! WE ARE NOT LIABLE FOR ERRORS IN THE CODE WHICH MAY
CAUSE YOU, YOUR COMPANY OR ANY THIRD PARTY FINANCIAL DAMAGES !!!!!!!!!!!!"
BY USING THIS SCRIPT YOU AGREE TO THESE TERMS/CONDITIONS"

Start the node.js console in Admin mode
Run:
npm install cheerio
npm install html-entities
npm install yargs
npm install axios
(https://www.npmjs.com/package/html-entities)

Then run node LangParserTranslator.js

If you just run:

node LangParserTranslator.js --job=parseonly 
or 
node LangParserTranslator.js --job=DEEPLCOSTSMONEY

The --job=parseonly will just create a js file for your default language (e. g. lang-en.js) with all your variables inside.
The --job=DEEPLCOSTSMONEY will create all js files, for the default language as well as for all languages, which you 
specify in the "translateTo" variable inside the settings.js.

I named the job "DEEPLCOSTSMONEY" to remind you that every execution costs money through deepl!

## Get started

To get started, take the settings.js and modify it:

..* defaultLanguage: The language to translate from (e. g. "en" for English)
..* translateTo: Array with languages to translate to (must be present in the availableLanguages)
..* htmlWithLang: All your HTML files, which need translation, have to be listed in the "htmlWithLang" array in settings.js.
..* commonPathOfHtmlFiles: Make sure that you put the path to these files in "commonPathOfHtmlFiles".
..* commonPathOfJsonFiles: Specify a path, where the JS files with the translations will be written to in "commonPathOfJsonFiles".
..* jsonFilePrefix: In "jsonFilePrefix", you can specify any prefix for the js files, e. g. "lang-", then the output would be 
for English e. g. lang-en.js
..* langAttribute: the HTML attribute for the tag surrounding each text for translation
..* deeplSettings: Put your API key inside, else the settings should be fine

## Examples

Let's start with the HTML file in the test folder. 
As you can see, in your HTML, all tags that surround a text should contain an attribute, e. g. data-lang (you can define that 
attribute in the settings.js). Also, you can define a tag (NOT attribute) which excludes text from being parsed for translation.
By default, that is &lt;lang-ignore&gt;.


```html
<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8" />
        <title data-lang="title">Translation test</title>
    </head>
    <body>
        <h1 data-lang="header">This is a test for the translation library</h1>
        <p data-lang="Introduction">
            Here is an Emglish text, which should be translated by this library with Deepl.
        </p>
    
        <p data-lang="Summary">
            In this paragraph, we test, whether the translation also works without being
            interrupted by <strong>tags</strong>.
            <br><br/>It should also work with the tag, which can exclude content from being
            translated. This tag is by default labelled "lang-ignore", but can be changed 
            in the settings (settings.js). So, if that ignore-tag works, then there shouldn't be a translation
            of the word "ENVIRONMENT" after the exclamation mark! <lang-ignore>ENVIRONMENT</lang-ignore>

        </p>
        
    </body>
</html>
```

Now, when you run 
node LangParserTranslator.js --job=DEEPLCOSTSMONEY
it should parse the HTML file test.html, extract the texts, store them in lang-en.js and then translate them to lang-de.js.
The cool thing is that if you change anything in the default language / HTML files and let it run again, it does not 
translate everything again (remember, "Deepl costs money"), but only the changed texts (that is, every tag is a text. If you
put 1000 lines of text in one tag and just change one single character, everything gets re-translated).



## I hope, this code works out well for you :)
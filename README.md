# Deepl-HTML-Translator
An inofficial NodeJS tool to translate websites via the Deepl API

THIS NODE.JS DEEPL PARSER IS FREE SOFTWARE UNDER MIT LICENSE (c) EasyRadiology GmbH 2020.
------------------------------------------------------------------------------------------
TERMS/CONDITIONS: DEEPL TRANSLATIONS COST MONEY!!! WE ARE NOT LIABLE FOR ERRORS IN THE CODE WHICH MAY
CAUSE YOU, YOUR COMPANY OR ANY THIRD PARTY FINANCIAL DAMAGES !!!!!!!!!!!!"
BY USING THIS SCRIPT YOU AGREE TO THESE TERMS/CONDITIONS"

## What this software does

This software was developed for our website <a href="https://easyradiology.net">www.easyradiology.net</a> to offer the website in 8 languages immediately.

With this software, you can have HTML files in one language and get them parsed for their default (source) language. This default language is stored in key/value
pairs in a lang_...js file, e. g. if English is the default language, it results in lang_en.js.

Then, this language file is translated into any languages, which you define in the settings.js, e. g. French (fr) and German (de). This results in lang_fr.js and 
lang_de.js. Once you change anything in the default language (HTML) files, then only the changed key/value pairs are translated and introduced into the existing
lang_de.js and lang_fr.js, so the software does not re-translate everything from scratch (which saves time and money as Deepl costs money).
You can exclude certain parts of your texts to be translated with special tags in the default/source HTML files as well as in the target JS files (more about that
below).
Enjoy!

## How to install the npm modules

You need a paid Deepl Developer / API account!

Start the node.js console in Admin mode
Run:
npm install cheerio
npm install html-entities
npm install yargs
npm install axios
npm install qs
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




The default language is English:

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

If you have run the script and translated e. g. into French, so you have a lang_fr.js file and you were unsatisfied with one of 
the translations, you can edit the French JS file for that key add a "&lt;/ignore&gt;" tag anywhere into the string. Then, this text will NOT be overwritten, if you have changed some of the text in that key in the default language and re-run the LangParserTranslator.js again.

As an example below: The key "title" will not be corrected anymore, even if "title" changes in the default language. This can be useful, if the Deepl translation is not optimal and you want to "freeze" that result.


```javascript
EasyRadiology_Language["fr"] = {
 "___version": 1,
 "title": "</ignore>Test de traduction",
 "header": "Ceci est un test pour la bibliothèque de traduction",
 "Introduction": "Voici un texte en Emglish, qui devrait être traduit par cette bibliothèque avec Deepl.",
 "Summary": "Dans ce paragraphe, nous vérifions si la traduction fonctionne également sans être interrompue par des <strong>balises</strong>. <br><br>Il devrait également fonctionner avec la balise, qui peut exclure le contenu de la traduction. Cette balise est par défaut étiquetée \"lang-ignore\", mais peut être modifiée dans les paramètres (settings.js). Donc, si cette étiquette d'ignorance fonctionne, alors il ne devrait pas y avoir de traduction du mot \"E-N-V-I-R-O-N-M-E-N-T\" après le point d'exclamation ! <lang-ignore>ENVIRONMENT</lang-ignore>"
}
```

Now, when you run 
node LangParserTranslator.js --job=DEEPLCOSTSMONEY
it should parse the HTML file test.html, extract the texts, store them in lang-en.js and then translate them to lang_de.js (or lang_fr.js, etc).
The cool thing is that if you change anything in the default language / HTML files and let it run again, it does not 
translate everything again (remember, "Deepl costs money"), but only the changed texts (that is, every tag is a text. If you
put 1000 lines of text in one tag and just change one single character, everything gets re-translated).

## I hope, this code works out well for you :)
# Building HTACG HTML Tidy with Emscripten

## Prerequisites

  1. git - [http://git-scm.com/book/en/v2/Getting-Started-Installing-Git][1]

  2. emscripten - [http://kripken.github.io/emscripten-site/][2]

Additional tools are needed for installing Emscripten SDK. Follow their documentation.

## Build the JavaScript module "tidy"

  1. `cd build/emscripten`

  2. `make`

The output module will be written to `bin/tidy.js` in the project root.

## Use the JavaScript module "tidy"

You can use the module from Node.js:

```js
const tidy = require('./bin/tidy')
const result = tidy.tidy_html5('<html>...</html>')
console.error('Errors:', result.errors.join('\n'))
console.log('Output:', result.output)
```

### Function tidy_html5(html, options)

Analyses and cleans up the specified HTML markup and returns an object with the errors found and the modified result.

```js
const result = tidy_html5('<html>...</html>', {
  access: 2,
  indent: true,
  wrap: 80
})
```

#### Input Parameters

##### html
Type: `String`
Mandatory

The HTML markup to analyse and clean up.

##### options
Type: `Object`
Default value: `{}`

Settings for the analysis and cleanup. Any command-line option of HTML Tidy can be used as a property key (without the "-" prefix) and its value as the property value. Boolean flags (which do not have a value on the command line) should use `true` for the object property value.

#### Output Parameters

The function result is an object with the following properties:

##### errors
Type: `Array`

Results of the analysis as an array of lines. Every line shows one error message.

##### output
Type: `String`

The modified HTML markup.

#### Available Options

```test
Processing directives
---------------------
 -indent                    indent element content
 -wrap <column>             wrap text at the specified <column>. 0 is assumed
                            if <column> is missing. When this option is
                            omitted, the default of the configuration option
                            'wrap' applies.
 -upper                     force tags to upper case
 -clean                     replace FONT, NOBR and CENTER tags with CSS
 -bare                      strip out smart quotes and em dashes, etc.
 -gdoc                      produce clean version of html exported by Google
                            Docs
 -numeric                   output numeric rather than named entities
 -errors                    show only errors and warnings
 -quiet                     suppress nonessential output
 -omit                      omit optional start tags and end tags
 -xml                       specify the input is well formed XML
 -asxhtml                   convert HTML to well formed XHTML
 -ashtml                    force XHTML to well formed HTML
 -access <level>            do additional accessibility checks (<level> = 0,
                            1, 2, 3). 0 is assumed if <level> is missing.

Character encodings
-------------------
 -raw                       output values above 127 without conversion to
                            entities
 -ascii                     use ISO-8859-1 for input, US-ASCII for output
 -latin0                    use ISO-8859-15 for input, US-ASCII for output
 -latin1                    use ISO-8859-1 for both input and output
 -iso2022                   use ISO-2022 for both input and output
 -utf8                      use UTF-8 for both input and output
 -mac                       use MacRoman for input, US-ASCII for output
 -win1252                   use Windows-1252 for input, US-ASCII for output
 -ibm858                    use IBM-858 (CP850+Euro) for input, US-ASCII for
                            output
 -utf16le                   use UTF-16LE for both input and output
 -utf16be                   use UTF-16BE for both input and output
 -utf16                     use UTF-16 for both input and output
 -big5                      use Big5 for both input and output
 -shiftjis                  use Shift_JIS for both input and output
```

#### Default Settings

```text
Name                        Type       Current Value
=========================== =========  ================
accessibility-check         Enum       0 (Tidy Classic)
add-meta-charset            Boolean    no
add-xml-decl                Boolean    no
add-xml-space               Boolean    no
alt-text                    String
anchor-as-name              Boolean    yes
ascii-chars                 Boolean    no
assume-xml-procins          Boolean    no
bare                        Boolean    no
break-before-br             Boolean    no
char-encoding               Encoding   utf8
clean                       Boolean    no
coerce-endtags              Boolean    yes
css-prefix                  String     c
custom-tags                 Enum       no
decorate-inferred-ul        Boolean    no
doctype                     String     auto
drop-empty-elements         Boolean    yes
drop-empty-paras            Boolean    yes
drop-proprietary-attributes Boolean    no
enclose-block-text          Boolean    no
enclose-text                Boolean    no
error-file                  String
escape-cdata                Boolean    no
escape-scripts              Boolean    yes
fix-backslash               Boolean    yes
fix-bad-comments            Enum       auto
fix-style-tags              Boolean    yes
fix-uri                     Boolean    yes
force-output                Boolean    no
gdoc                        Boolean    no
gnu-emacs                   Boolean    no
hide-comments               Boolean    no
indent                      Enum       no
indent-attributes           Boolean    no
indent-cdata                Boolean    no
indent-spaces               Integer    2
indent-with-tabs            Boolean    no
input-encoding              Encoding   utf8
input-xml                   Boolean    no
join-classes                Boolean    no
join-styles                 Boolean    yes
keep-tabs                   Boolean    no
keep-time                   Boolean    no
literal-attributes          Boolean    no
logical-emphasis            Boolean    no
lower-literals              Boolean    yes
markup                      Boolean    yes
merge-divs                  Enum       auto
merge-emphasis              Boolean    yes
merge-spans                 Enum       auto
mute                        String
mute-id                     Boolean    no
ncr                         Boolean    yes
new-blocklevel-tags         Tag Names
new-empty-tags              Tag Names
new-inline-tags             Tag Names
new-pre-tags                Tag Names
newline                     Enum       LF
numeric-entities            Boolean    no
omit-optional-tags          Boolean    no
output-bom                  Enum       auto
output-encoding             Encoding   utf8
output-file                 String
output-html                 Boolean    no
output-xhtml                Boolean    no
output-xml                  Boolean    no
preserve-entities           Boolean    no
priority-attributes         Attribute
punctuation-wrap            Boolean    no
quiet                       Boolean    no
quote-ampersand             Boolean    yes
quote-marks                 Boolean    no
quote-nbsp                  Boolean    yes
repeated-attributes         Enum       keep-last
replace-color               Boolean    no
show-body-only              Enum       no
show-errors                 Integer    6
show-info                   Boolean    yes
show-meta-change            Boolean    no
show-warnings               Boolean    yes
skip-nested                 Boolean    yes
sort-attributes             Enum       none
strict-tags-attributes      Boolean    no
tab-size                    Integer    8
tidy-mark                   Boolean    yes
uppercase-attributes        Enum       no
uppercase-tags              Boolean    no
vertical-space              Enum       no
warn-proprietary-attributes Boolean    yes
word-2000                   Boolean    no
wrap                        Integer    68
wrap-asp                    Boolean    yes
wrap-attributes             Boolean    no
wrap-jste                   Boolean    yes
wrap-php                    Boolean    yes
wrap-script-literals        Boolean    no
wrap-sections               Boolean    yes
write-back                  Boolean    no
```

  [1]: http://git-scm.com/book/en/v2/Getting-Started-Installing-Git
  [2]: http://kripken.github.io/emscripten-site/
  [3]: http://xmlsoft.org/XSLT/xsltproc2.html

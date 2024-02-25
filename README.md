# Word Wizards

Trick your opponent into spelling words to deal psychic verbal damage on them!

For the word bank, I used [dwyl/english-words](https://github.com/dwyl/english-words/).
The shorter words were removed with the following code:

```javascript
const fs = require("fs");

let data = "";

fs.readFile("words_alpha.txt", function(err, buf) {
    if (err) console.log(err);
    data = buf.toString().split("\r\n").filter(v => v.length >= 4).join("\n");

    fs.writeFile("wordbank.txt", data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
});
```

The processed version can be found in [wordbank.txt](./wordbank.txt).

## [DevPost](https://devpost.com/software/word-wizard-mxp5uf)
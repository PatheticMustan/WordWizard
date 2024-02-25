let wordbank = [];

async function loadWordbank() {
    const d = (await (await fetch("./wordbank.txt")).text());
    wordbank = d.split("\n");
}

loadWordbank();
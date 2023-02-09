"use strict";

const codeDiv = document.querySelector('code');
const languageType = document.querySelector('.language-type');
const languageLogo = document.querySelector('.language-logo');

function splitLines(text) {
    return text.split('\n');
}

function createCode(string, language) {
    codeDiv.setAttribute('data-language', language)

    const lines = splitLines(string);
    lines.forEach(line => {
        if (line === '') line = ' ';
        const div = document.createElement('div');

        div.setAttribute('class', 'ce-line');
        div.innerHTML = line;

        codeDiv.append(div);
    });
}

visualizeCode(getCode('php'), 'php');

function highlightPHP(code) {

    const variables = /\$\w+/g;
    const functions = /\b(array|echo|empty|isset|unset|print|file_get_contents|trim|fgets|microtime|while)\b/g;
    const access_modifiers = /\b(private|public|static)\b/g;
    const dataTypes = /\b(bool|float|int|string|void|false|true)\b/g;
    const openTag = /<\?php/g;
    const closeTag = /\?>/g;
    const numberRegex = /\b\d+\b/g;

    let highlightedCode = code.replaceAll(openTag, '<span class="php-tag">&lt;?php<\/span>');
    highlightedCode = highlightedCode.replaceAll(closeTag, '<span class="php-tag">?&gt;<\/span>');
    highlightedCode = highlightedCode.replaceAll(variables, '<span class="php-variable">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(functions, '<span class="php-function">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(dataTypes, '<span class="php-data-type">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(access_modifiers, '<span class="php-access-modifiers">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(numberRegex, '<span class="php-number">$&</span>');

    const lines = highlightedCode.split("\n");
    const newLines = [];
    for (const line of lines) {
        if (!line.includes('<span class="php') && line.trim().length > 0) {
            newLines.push(`<span class="php-other">${line}</span>`);
        } else {
            newLines.push(line);
        }
    }
    highlightedCode = newLines.join("\n");

    return highlightedCode;
}

function highlightJS(code) {

    const variables = /\b(console)\b/g;
    const functions = /\b(log)\b/g;
    const access_modifiers = /\b(const|let|var|while|true|false)\b/g;
    const dataTypes = /\b(bool|float|int|string|void)\b/g;
    const numberRegex = /\b\d+\b/g;

    let highlightedCode = code.replaceAll(variables, '<span class="javascript-variable">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(functions, '<span class="javascript-function">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(dataTypes, '<span class="javascript-data-type">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(access_modifiers, '<span class="javascript-access-modifiers">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(numberRegex, '<span class="javascript-number">$&</span>');


    return highlightedCode;
}

function highlightPython(code) {
    const variables = /\b(print)\b/g;
    const functions = /\b(len|str|int|float|bool)\b/g;
    const access_modifiers = /\b(def|while)\b/g;
    const dataTypes = /\b(str|int|float|bool|True|False)\b/g;
    const numberRegex = /\b\d+\b/g;

    let highlightedCode = code.replaceAll(variables, '<span class="python-variable">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(functions, '<span class="python-function">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(dataTypes, '<span class="python-data-type">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(access_modifiers, '<span class="python-access-modifiers">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(numberRegex, '<span class="python-number">$&</span>');

    return highlightedCode;
}

function highlightCSharp(code) {
    const variables = /\b(var|true|false)\b/g;
    const functions = /\b(WriteLine)\b/g;
    const access_modifiers = /\b(Console|private|public|static)\b/g;
    const dataTypes = /\b(while|bool|float|int|string|void)\b/g;
    const numberRegex = /\b\d+\b/g;

    let highlightedCode = code.replaceAll(variables, '<span class="csharp-variable">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(functions, '<span class="csharp-function">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(dataTypes, '<span class="csharp-data-type">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(access_modifiers, '<span class="csharp-access-modifiers">$&<\/span>');
    highlightedCode = highlightedCode.replaceAll(numberRegex, '<span class="csharp-number">$&</span>');

    return highlightedCode;
}


function visualizeCode(code, language) {
    switch (language) {
        case 'php':
            let phpCode = highlightPHP(code);
            createCode(phpCode, language)
            break;

        case 'javascript':
            let javascriptCode = highlightJS(code);
            createCode(javascriptCode, language)
            break;

        case 'python':
            let pythonCode = highlightPython(code);
            createCode(pythonCode, language)
            break;

        case 'csharp':
            let csharpCode = highlightCSharp(code);
            createCode(csharpCode, language)
            break;
        default:
            break;
    }
}

function getCode(language) {
    switch (language) {
        case 'php':
            return `<?php\n\npublic bool $alive = true;\n\npublic string $name = "Rick";\npublic int $age = 17;\n\npublic string $description = "Im Rick, a 17 year old developer.";\n\nwhile ($alive) {\n    echo "Busy developing stuff.";\n}\n\n?>`;
            break;

        case 'javascript':
            return `let alive = true;\n\nconst name = "Rick";\nlet age = 17;\n\nlet description = "Im Rick, a 17 year old developer.";\n\nwhile (alive) {\n    console.log("Busy developing stuff.");\n}`;
            break;

        case 'python':
            return `alive = True\n\nname = "Rick"\nage = 17\n\ndescription = "Im Rick, a 17 year old developer."\n\nwhile alive:\n    print("Busy developing stuff.");`;
            break;

        case 'csharp':
            return `bool alive = true;\n\nstring name = "Rick";\nint age = 17;\n\nstring description = "Im Rick, a 17 year old developer.";\n\nwhile (alive)\n{\n   Console.WriteLine("Busy developing stuff.");\n}`;
            break
        default:
            break;
    }
}

languageType.addEventListener('change', function (event) {
    codeDiv.innerHTML = '';
    let language = event.target.value;
    languageLogo.src = `images/${language}.svg`;

    visualizeCode(getCode(language), language);
});

var typewriter = new Typewriter(document.querySelector('.text-container'), {
    skipAddStyles: true,
    cursor: '',
    delay: 75
});

typewriter.typeString('<h1 class="typer">Hi! Im <span class="highlightedText">Rick</span>,</h1>')
    .pauseFor(500)
    .typeString('<h1 class="typer">a <span class="highlightedText">17</span> year old developer.</h1>').start();

document.addEventListener("DOMContentLoaded", function () {
    let language = languageType.value;
    codeDiv.innerHTML = '';
    languageLogo.src = `images/${language}.svg`;

    visualizeCode(getCode(language), language);
});


const terminal = document.querySelector('.terminal');
const terminalArea = document.querySelector('.terminal-area');
const terminalInput = document.querySelector('.terminal-input');
const terminalIndex = document.querySelector('.terminal-index');
const terminalIdentifier = "rick@portfolio:~$";
const commands = ['help'];
let terminalText = [];
var terminalOpen = false;


function toggleTerminal() {
    if (!terminalOpen) {
        terminal.style.visibility = 'visible';
        terminalInput.scrollIntoView();
        terminal.scrollLeft = 0;
        terminalOpen = true;
    } else {
        terminal.style.visibility = 'hidden';
        terminalOpen = false;
    }
}

function createResponse(text) {
    const paragraph = document.createElement('p');
    const textNode = document.createTextNode(text);

    paragraph.append(textNode);
    terminalArea.insertBefore(paragraph, terminalIndex);

    terminalText.push(text);
}

terminalInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        let text = terminalInput.value;
        terminalInput.value = '';

        createResponse(terminalIdentifier + text + '\n');
        if (commands.includes(text)) {
            createResponse('There are currently no commands available.');
        } else {
            createResponse(`${text}: command not found`);
        }

        terminalInput.scrollIntoView();
        terminal.scrollLeft = 0;
    }
});
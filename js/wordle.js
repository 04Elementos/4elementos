const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

// Code to get DailyWord by Gabriel Toschi and Gabriel Kanegae @ Letreco
const milissecondsMinute = 60 * 1000;

function getToday() {
    const today = new Date();
    const correctedDate = new Date(
        today.valueOf() - (today.getTimezoneOffset() * milissecondsMinute)
    )

    return correctedDate.toISOString().split('T')[0]
}

function getDailyWord() {
    return dailyWords[getToday()]
}

const wordle = getDailyWord().word

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DEL',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)

    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.classList.add('tile')
        rowElement.append(tileElement);
    })

    tileDisplay.append(rowElement);
})

keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
});

const handleClick = (key) => {
    if(!isGameOver) {
        if (key === 'DEL') {
            deleteLetter()
            return
        }
    
        if (key === 'ENTER') {
            checkRow()
            return
        }
    
        addLetter(key)
    }
}

const addLetter = (letter) => {
    if(currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter)
    
        currentTile++
    }
}

const deleteLetter = () => {
    if(currentTile > 0) {
        currentTile--
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`);
        tile.textContent = ''
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if(wordList.includes(guess)) {
        flipTile()
        document.getElementById('word-not-found').style.display = "none";

        if (currentTile === 5) {
            if(wordle === guess) {
                showMessage('Yay! Você descobriu a palavra de hoje :)')
                return;
            } 
            else {
                if(currentRow >= 5) {
                    isGameOver = true;
                    showMessage('Ops... parece que você não conseguiu descobrir a palavra de hoje. Boa sorte amanhã!')
                }
    
                if(currentRow < 5) {
                    currentRow++
                    currentTile = 0;
                }
            }
        }
    } else {
        document.getElementById('word-not-found').style.display = "block";
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('span')
    messageElement.classList.add('centerP')
    messageElement.textContent = message;
    messageDisplay.append(messageElement)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        // Code by Ram Prasad
        if ((checkWordle.includes(guess.letter)) && (guess.color != 'green-overlay')){
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}
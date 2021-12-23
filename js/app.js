let answers = new Object;
let actualQ = 1;
let qn = 0;
let prev_answer = null;
let result = {
    emocao: 1,
    solidao: 1,
    ordem: 1,
    caos: 1,
}

let questionsObject = new Object();
    questions.forEach(populateQO);

function populateQO(value) {
    questionsObject[value['id']] = value
}

let questionsOrder = Object.keys(questionsObject);
    shuffleArray(questionsOrder);
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

init_question();

function init_question() {
    document.getElementById("question").innerHTML = `<span>#${qn+1}</span> | ${questionsObject[questionsOrder[qn]].question}`;
}

function next(answer) {
    if (qn === questionsOrder.length) {
        return;
    }

    answers[questionsOrder[qn]] = answer;
    result = {
        emocao: result.emocao += questionsObject[questionsOrder[qn]].effect.emocao * answer,
        solidao: result.solidao += questionsObject[questionsOrder[qn]].effect.solidao * answer,
        ordem: result.ordem += questionsObject[questionsOrder[qn]].effect.ordem * answer,
        caos: result.caos += questionsObject[questionsOrder[qn]].effect.caos * answer,
    }

    prev_answer = answer;
    qn++;

    if (qn < questionsOrder.length) {
        init_question();
    } else {
        lastScreen()
    }
}

function prev() {
    if (prev_answer == null) {
        return;
    }

    qn--;
    result = {
        emocao: result.emocao -= questionsObject[questionsOrder[qn]].effect.emocao * prev_answer,
        solidao: result.solidao -= questionsObject[questionsOrder[qn]].effect.solidao * prev_answer,
        ordem: result.ordem -= questionsObject[questionsOrder[qn]].effect.ordem * prev_answer,
        caos: result.caos -= questionsObject[questionsOrder[qn]].effect.caos * prev_answer,
    }

    prev_answer = null;
    init_question();

}

function lastScreen() {
    const container = document.querySelector('.quiz-container');
    const lastScreen = document.querySelector('.endTest');

    container.style.display = 'none';
    lastScreen.style.display = 'block';
}

function sendResults() {
    localStorage.clear();

    function percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    } 

    function highestSpectrum(arr) {
        let max = arr[0]
        let where;
        let spec;

        arr.forEach(element => {
            if(element > max) {max = element}
        })

        where = arr.indexOf(max)

        spec = (where === 0) ? 'Sangue'
                : (where === 1) ? 'Morte'
                : (where === 2) ? 'Conhecimento'
                : 'Energia';

        return spec
    }

    function checkDraw(arr) {
        max = arr[0]
        arr.forEach(element => {
            if(element > max) { max = element }
        })

        where = arr.indexOf(max)
        arr.splice(where, 1)

        let bol;
        for (let i = 1; i < 4; i++) {
            if(arr[i] === max) {
                bol = true
                break;
            } else{
                bol = false;
            }
        }

        return bol;
    }

    function drawnedElements(arr, compWith) {
        max = arr[0]
        arr.forEach(element => {
            if(element > max) { max = element }
        })

        where = arr.indexOf(max)
        let array = [];

        if(where === 0) { array = ['Sangue']} else 
        if(where === 1) { array = ['Morte']} else 
        if(where === 2) { array = ['Conhecimento'] }
        else { array = ['Energia'] }

        if(compWith[0] === max) { array.push('Sangue')}  
        if(compWith[1] === max) { array.push('Morte')}  
        if(compWith[2] === max) { array.push('Conhecimento')}  
        if(compWith[3] === max) { array.push('Energia')}  

        let drawned = array.shift()
        return array;
    }

    const porcentRes =  [
        50 + Math.floor(percentage(result.emocao, 80)),
        50 + Math.floor(percentage(result.solidao, 80)),
        50 + Math.floor(percentage(result.ordem, 80)),
        50 + Math.floor(percentage(result.caos, 80)),
    ]

    const maxValue = 100;
    const userEspectroPer = [
        Math.floor(percentage(porcentRes[0], maxValue)),
        Math.floor(percentage(porcentRes[1], maxValue)),
        Math.floor(percentage(porcentRes[2], maxValue)),
        Math.floor(percentage(porcentRes[3], maxValue))
    ]

    let bool = checkDraw(porcentRes)
    let resultEsp;

    if(bool === true) {
        const drawned = drawnedElements(userEspectroPer, userEspectroPer)
        
        if (drawned.length === 4) {
            resultEsp = "Medo"
        } else {
            let winningCases;

            if (drawned === ["Sangue", "Morte"]) { winningCases = "Morte" } else
            if (drawned === ["Sangue", "Conhecimento"]) { winningCases = "Sangue" } else
            if (drawned === ["Morte", "Energia"]) { winningCases = "Energia" } else
            if (drawned === ["Conhecimento", "Energia"]) { winningCases = "Conhecimento" } else {
                winningCases = drawned[0]
                resultEsp = winningCases
            }
        }
    } else{
        resultEsp = highestSpectrum(userEspectroPer)
    }

    name = document.getElementById("uname").value;
    localStorage.setItem("name", name);
    localStorage.setItem("espectro", userEspectroPer)
    localStorage.setItem("results", resultEsp);
    location.href = 'results.html';
}

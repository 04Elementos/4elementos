setTimeout(function() {
    if (typeof localStorage !== 'undefined') {
        const name = localStorage.getItem("name")
        const result = localStorage.getItem("results")
        const espectro = localStorage.getItem("espectro")

        if(!result && !espectro) {
            showErrors() 
        } else{
            showResults()
        }
    } else {
        showErrors() 
    }
    }, 50);

function showErrors() {
    const errorsScreen = document.querySelector('.errorDiv');
    const resultScreen = document.querySelector('.resultsDiv');
    errorsScreen.style.display = 'block'
    resultScreen.style.display = 'none'
}

function showResults() {
    if(localStorage.getItem("results") === "Medo") {
        document.getElementById("agentName").innerHTML = `Criatura Desconhecida`
    } else{
        if(name) {
            document.getElementById("agentName").innerHTML = `Agente ${name}`
        } else {
            document.getElementById("agentName").innerHTML = 'Agente Desconhecido'
        }
    }

    const img = document.getElementById("elementResult")
    img.src = `images/elementos/${localStorage.getItem("results")}.webp`
    img.classList.add(`${localStorage.getItem("results")}Result`);

    let userGuia;
    if(localStorage.getItem("results") === "Morte") {userGuia = elements.Morte.fraseGuia} else 
    if(localStorage.getItem("results") === "Sangue") {userGuia = elements.Sangue.fraseGuia} else 
    if(localStorage.getItem("results") === "Energia") {userGuia = elements.Energia.fraseGuia} else
    if(localStorage.getItem("results") === "Conhecimento") {userGuia = elements.Conhecimento.fraseGuia} 
    else {userGuia = elements.Medo.fraseGuia} 

    let userDesc;
    if(localStorage.getItem("results") === "Morte") {userDesc = elements.Morte.desc} else 
    if(localStorage.getItem("results") === "Sangue") {userDesc = elements.Sangue.desc} else 
    if(localStorage.getItem("results") === "Energia") {userDesc = elements.Energia.desc} else
    if(localStorage.getItem("results") === "Conhecimento") {userDesc = elements.Conhecimento.desc} 
    else {userDesc = elements.Medo.desc} 

    document.getElementById("elementResultName").innerHTML = localStorage.getItem("results");
    document.getElementById("fraseGuia").innerHTML = `"${userGuia}"`;
    document.getElementById("descElement").innerHTML = userDesc;

    let originalString = localStorage.getItem("espectro")
    spectroArray = [];
    let previousIndex = 0;
    for(i = 0; i < originalString.length; i++) {
        if (originalString[i] == ',') {
            separated = originalString.slice(previousIndex, i);
            spectroArray.push(separated);
            previousIndex = i + 1;
        }
    }
    
    spectroArray.push(originalString.slice(previousIndex, i));


    let otherElementInfo;

    if(localStorage.getItem("results") === "Morte") {otherElementInfo = elements.Morte.outrasInfo} else 
    if(localStorage.getItem("results") === "Sangue") {otherElementInfo = elements.Sangue.outrasInfo} else 
    if(localStorage.getItem("results") === "Energia") {otherElementInfo = elements.Energia.outrasInfo} else
    if(localStorage.getItem("results") === "Conhecimento") {otherElementInfo = elements.Conhecimento.outrasInfo} 
    else {otherElementInfo = elements.Medo.outrasInfo} 

    document.getElementById("known1").innerHTML = `${otherElementInfo.agts.agt_1}`;
    document.getElementById("known2").innerHTML = `${otherElementInfo.agts.agt_2}`;
    document.getElementById("known3").innerHTML = `${otherElementInfo.agts.agt_3}`;
    
    document.getElementById("emocValue").innerHTML = `${spectroArray[0]}%`;
    document.getElementById("soliValue").innerHTML = `${spectroArray[1]}%`;
    document.getElementById("ordeValue").innerHTML = `${spectroArray[2]}%`;
    document.getElementById("caosValue").innerHTML = `${spectroArray[3]}%`;
    
}
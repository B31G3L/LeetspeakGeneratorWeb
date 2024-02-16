var currentTranslator = 0;
var translationTo = 0;
var output = ""
var container= ""

/* --- init default setup --- */
window.onload = function () { 
    addActiveClass("simpleLeetNav", "Simple Translate Table");
    loadContent();
};

document.addEventListener('DOMContentLoaded', function() {
    const cookieContent = CookieConsent.getCookie();
    console.log(cookieContent)
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    const reverseTranslation = localStorage.getItem('reverseTranslation') === 'true'
    if (darkModeEnabled) {
      document.getElementById("darkMode").checked = darkModeEnabled
    }

    document.getElementById("darkMode").addEventListener("change", () => {
        if (document.getElementById("darkMode").checked) {
          storage.setItem("darkMode", true)
        } else {
          storage.setItem("darkMode", false)
        }
      });
  });



  function removeActiveClass(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove("active");
    }
}

function addActiveClass(elementId, title) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add("active");
        document.getElementById("tableTitle").innerHTML = title;
    }
}

function setNavActive(translator) {
    removeActiveClass("simpleLeetNav");
    removeActiveClass("extendedLeetNav");
    removeActiveClass("customLeetNav");
    document.getElementById("edit_button").classList.add("hidden");
    document.getElementById("save_button").classList.add("hidden");
    currentTranslator = translator

    switch (translator) {
        case SIMPLE:
            addActiveClass("simpleLeetNav", "Simple Translate Table");
            break;
        case EXTENDED:
            addActiveClass("extendedLeetNav", "Extended Translate Table");
            break;
        case CUSTOM:
            addActiveClass("customLeetNav", "Custom Translate Table");
            document.getElementById("edit_button").classList.remove("hidden");
            break;
    }
    loadContent()
}


function loadContent() {
    loadPlaceholder()
    fillTable()
    changePlainTextToLeetText()
    setSwitchTranslationButton()
}

function setSwitchTranslationButton(){
    translateByInputAndOutputSheet
    const button = document.getElementById("switchTranslationButton");
    if(translationTo === PLAIN2LEET){
        button.classList.remove("btn-neutral");
        button.classList.add("btn-ghost");
    }else{
        button.classList.remove("btn-ghost");
        button.classList.add("btn-neutral");
    }
}

function changePlainTextToLeetText() {
    var outputLeetText = document.getElementById("outputText");
    var input = document.getElementById("inputText").value;

    var output = translateByActiveLeet(input);

    outputLeetText.setAttribute("type", "text");
    outputLeetText.setAttribute("value", output);
}


function translateByActiveLeet(input) {
    var output = ""
    if(translationTo === PLAIN2LEET){
        switch (currentTranslator) {
            case SIMPLE:
                output = translateByInputAndOutputSheet(input,plaintextAlphabet, simpleLeetAlphabet);
                break;
            case EXTENDED:
                output = translateByInputAndOutputSheet(input, plaintextAlphabet, extendedLeetAlphabet);
                break;
            case CUSTOM:
                output = translateByInputAndOutputSheet(input, plaintextAlphabet, cu);
                break;
        }
    } else {
        switch (currentTranslator) {
            case SIMPLE:
                output = translateByInputAndOutputSheet(input,simpleLeetAlphabet, plaintextAlphabet);
                break;
            case EXTENDED:
                output = translateByInputAndOutputSheet(input, extendedLeetAlphabet, plaintextAlphabet);
                break;
            case CUSTOM:
                output = translateByInputAndOutputSheet(input, extendedLeetAlphabet, simpleLeetAlphabet);
                break;
        }
    }
    
    
    return output
}

function translate(inputChar, inputSheet, outputSheet){
    const arrayIndex = inputSheet.indexOf(inputChar.toUpperCase());
            if(arrayIndex === -1){
                if(container.length>=1){
                    container = inputChar;
                } else{
                    container += inputChar;
                }
                output += inputChar;  
            }else{
                output += outputSheet[arrayIndex];
                container= ""
            }
}


function translateByInputAndOutputSheet(input, inputSheet, outputSheet) {
    output = ""
    container= ""

    for (let inputChar of input){
        if(container.length > 0){
            container += inputChar; 
            var arrayIndex = inputSheet.indexOf(container.toUpperCase());
            if(arrayIndex !== -1){
                var leetspeakLetter = outputSheet[arrayIndex];
                output = output.substring(0, output.length - 1)
                output += leetspeakLetter;
                container = ""
            }else{
                translate(inputChar, inputSheet, outputSheet)
            }
        } else{
            translate(inputChar, inputSheet, outputSheet)
        }
    }
    return output;
}




function fillTable() {
    var table = document.getElementById("leetTableBody");
    table.innerHTML = ""
    for (i = 0; i < 13; i++) {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);


        cell1.id = "plain_letter_" + i;
        cell1.innerHTML = plaintextAlphabet[i];

        cell2.id = "leet_letter_" + i;
        switch (currentTranslator) {
            case SIMPLE:
                cell2.innerHTML = simpleLeetAlphabet[i];
                break;
            case EXTENDED:
                cell2.innerHTML = extendedLeetAlphabet[i];
                break;
            case CUSTOM:
                cell2.innerHTML = storage.getItem(plaintextAlphabet[i]);
                break;
        }


        cell3.id = "plain_letter_" + (i + 13)
        cell3.innerHTML = plaintextAlphabet[i + 13];

        cell4.id = "leet_letter_" + (i + 13)
        switch (currentTranslator) {
            case SIMPLE:
                cell4.innerHTML = simpleLeetAlphabet[i + 13];
                break;
            case EXTENDED:
                cell4.innerHTML = extendedLeetAlphabet[i + 13];
                break;
            case CUSTOM:
                cell4.innerHTML = storage.getItem(plaintextAlphabet[i + 13]);
                break;
        }
    }
}

function copyToClipBoard() {
    var copyText = document.getElementById("outputText");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");

    var label = document.getElementById("label");
    var copyToClipBoard = document.getElementById("copyToClipBoard");
    copyToClipBoard.setAttribute('data-tip', 'copied successfully');

    label.classList.add("swap-active");
    copyToClipBoard.classList.add("tooltip-success");
    copyToClipBoard.classList.add("tooltip-open");



    setTimeout(function () {
        label.classList.remove("swap-active");
        copyToClipBoard.classList.remove("tooltip-open");
        copyToClipBoard.classList.remove("tooltip-success");
        copyToClipBoard.setAttribute('data-tip', 'copy to clipboard');
    }, 2000);
}

function loadPlaceholder() {
    switch (translationTo) {
        case PLAIN2LEET:
            document.getElementById("inputText").placeholder = plaintextPlaceholder;
            document.getElementById("outputText").placeholder = translateByActiveLeet(plaintextPlaceholder);
            break;
        case LEET2PLAIN:
            document.getElementById("inputText").placeholder = translateByActiveLeet(plaintextPlaceholder);
            document.getElementById("outputText").placeholder = plaintextPlaceholder;
            break;
    }

}

function editTable() {
    document.getElementById("edit_button").classList.add("hidden");
    document.getElementById("save_button").classList.remove("hidden");
    for (i = 0; i < 13; i++) {
        var leetLetterLeft = document.getElementById("leet_letter_" + i);
        var leetLetterRight = document.getElementById("leet_letter_" + (i + 13));

        var leetLetterLeft_data = leetLetterLeft.innerHTML;
        var leetLetterRight_data = leetLetterRight.innerHTML;

        leetLetterLeft.innerHTML = "<input type='text' class='input input-bordered w-full max-w-xs' maxlength='3' id='leet_text_letter_" + i + "' value='" + leetLetterLeft_data + "'>";
        leetLetterRight.innerHTML = "<input type='text' class='input input-bordered w-full max-w-xs' imaxlength='3' id='leet_text_letter_" + (i + 13) + "' value='" + leetLetterRight_data + "'>";
    }
}

function saveTable() {

    for (i = 0; i < 13; i++) {

        storage.setItem(plaintextAlphabet[i], document.getElementById("leet_text_letter_" + i).value)
        storage.setItem(plaintextAlphabet[i + 13], document.getElementById("leet_text_letter_" + (i + 13)).value)

        var leftLeetLetter_val = document.getElementById("leet_text_letter_" + i).value;
        var rightLeetLetter_val = document.getElementById("leet_text_letter_" + (i + 13)).value;

        document.getElementById("leet_letter_" + i).innerHTML = leftLeetLetter_val;
        document.getElementById("leet_letter_" + (i + 13)).innerHTML = rightLeetLetter_val;
    }
    loadPlaceholder()
    document.getElementById("edit_button").classList.remove("hidden");
    document.getElementById("save_button").classList.add("hidden");
    changePlainTextToLeetText()
}


function switchTranslation() {
    const inputa = document.getElementById("inputText");
    inputa.value = document.getElementById("outputText").value
    translationTo = (PLAIN2LEET === translationTo) ? LEET2PLAIN : PLAIN2LEET;
    if(PLAIN2LEET === translationTo){
        storage.setItem("reverseTranslation", false)
    }else{
        storage.setItem("reverseTranslation", true)
    }
    loadContent()
}

var storage = window.localStorage;

startStorage()

function startStorage(){
    if(null === storage.getItem("isFirstStart")){
        initStorage()
    }
}

function initStorage(){
    storage.setItem("isFirstStart", false)
    storage.setItem("darkMode", false)
    storage.setItem("reverseTranslation", false)
    fillStorage()
}

function fillStorage() {
    for (letter of plaintextAlphabet) {
        storage.setItem(letter, letter)
    }
}



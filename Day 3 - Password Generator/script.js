const passwordEl = document.getElementById("password");

const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");

const copyPw = document.getElementById("copy");
const generateBtn = document.getElementById("generateBtn");

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@£$%^&*()_-=+#€';

function getUpper(){
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getLower(){
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumber(){
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol(){
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePw(){
    const pwLength = lengthEl.value;

    let password = "";

    for(i = 0; i < pwLength; i++){
        x = generateX();
        password += x;
    }

    passwordEl.innerText = password;

}

function generateX(){
    const xs = [];

    if(upperEl.checked){
        xs.push(getUpper());
    }

    if(lowerEl.checked){
        xs.push(getLower());
    }

    if(numberEl.checked){
        xs.push(getNumber());
    }

    if(symbolEl.checked){
        xs.push(getSymbol());
    }

    if(xs.length === 0){
        return "";
    }

    return xs[Math.floor(Math.random() * xs.length)];
}

generateBtn.addEventListener("click", () => {
    generatePw();
});








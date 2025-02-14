// script.js
document.getElementById('generate-btn').addEventListener('click', generateLottoNumbers);

function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    displayLottoNumbers(numbers);
}

function displayLottoNumbers(numbers) {
    const lottoNumbersDiv = document.getElementById('lotto-numbers');
    lottoNumbersDiv.innerHTML = numbers.join(', ');
}
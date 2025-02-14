document.getElementById('generate-btn').addEventListener('click', function() {
    // 팝업 창 생성
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.zIndex = '1000';

    // 팝업 내용
    const message = document.createElement('p');
    message.textContent = '마짱 vs 오징어';
    popup.appendChild(message);

    // 마짱 버튼
    const majjangButton = document.createElement('button');
    majjangButton.textContent = '마짱';
    majjangButton.addEventListener('click', function() {
        alert('기회 없음');
        document.body.removeChild(popup);
    });
    popup.appendChild(majjangButton);

    // 오징어 버튼
    const ojingeoButton = document.createElement('button');
    ojingeoButton.textContent = '오징어';
    ojingeoButton.addEventListener('click', function() {
        generateLottoNumbers();
        document.body.removeChild(popup);
    });
    popup.appendChild(ojingeoButton);

    document.body.appendChild(popup);
});

function generateLottoNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length < 6) {
        const number = Math.floor(Math.random() * 45) + 1;
        if (!lottoNumbers.includes(number)) {
            lottoNumbers.push(number);
        }
    }
    document.getElementById('lotto-numbers').textContent = lottoNumbers.join(', ');
}
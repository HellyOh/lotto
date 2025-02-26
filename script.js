// "번호 생성" 버튼 클릭 시 팝업 표시
document.getElementById("generate-btn").addEventListener("click", showPopup);

function showPopup() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";

  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `
        <p>마짱 vs 오징어</p>
        <button id="majjang-btn" class="popup-btn">마짱</button>
        <button id="ojingeo-btn" class="popup-btn">오징어</button>
    `;
  document.body.appendChild(popup);
  popup.style.animation = "fadeIn 0.3s ease-in-out";

  document.getElementById("majjang-btn").addEventListener("click", () => {
    alert("기회 없음");
    cleanup(overlay, popup);
  });

  document.getElementById("ojingeo-btn").addEventListener("click", () => {
    fetchLottoData()
      .then(() => {
        cleanup(overlay, popup);
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
        alert("과거 데이터를 불러오지 못했습니다. 무작위 번호를 생성합니다.");
        generateRandomLottoNumbers();
        cleanup(overlay, popup);
      });
  });

  overlay.addEventListener("click", () => cleanup(overlay, popup));
}

// 과거 로또 데이터 (Node.js 백엔드에서 가져온 1~1000회차 데이터 일부)
async function fetchLottoData() {
  try {
    // 하드코딩된 데이터 (사용자가 제공한 약 200개 회차)
    const sampleData = [
      [7, 13, 16, 18, 35, 38],
      [5, 18, 20, 23, 30, 34],
      [7, 19, 23, 24, 36, 39],
      [2, 15, 16, 21, 22, 28],
      [2, 6, 8, 26, 43, 45],
      [3, 4, 16, 27, 38, 40],
      [2, 5, 14, 28, 31, 32],
      [21, 27, 29, 38, 40, 44],
      [3, 16, 21, 22, 23, 44],
      [7, 24, 29, 30, 34, 35],
      [1, 11, 17, 27, 35, 39],
      [4, 5, 12, 14, 32, 42],
      [5, 8, 18, 21, 22, 38],
      [6, 14, 16, 21, 27, 37],
      [16, 19, 24, 33, 42, 44],
      [2, 6, 11, 13, 22, 37],
      [6, 21, 22, 32, 35, 36],
      [1, 3, 23, 24, 27, 43],
      [7, 11, 12, 31, 33, 38],
      [9, 14, 17, 18, 42, 44],
      [2, 3, 26, 33, 34, 43],
      [5, 7, 12, 22, 28, 41],
      [2, 6, 13, 17, 27, 43],
      [3, 17, 18, 23, 36, 41],
      [3, 11, 34, 42, 43, 44],
      [13, 24, 32, 34, 39, 42],
      [10, 16, 18, 20, 25, 31],
      [4, 15, 22, 38, 41, 43],
      [3, 4, 10, 20, 28, 44],
      [7, 9, 12, 15, 19, 23],
      [8, 21, 25, 38, 39, 44],
      [14, 15, 23, 25, 35, 43],
      [1, 6, 15, 36, 37, 38],
      [23, 27, 29, 31, 36, 45],
      [1, 3, 30, 33, 36, 39],
      [4, 10, 20, 32, 38, 44],
      [7, 11, 13, 17, 18, 29],
      [2, 10, 13, 22, 29, 40],
      [4, 8, 10, 16, 31, 36],
      [4, 11, 28, 39, 42, 45],
      [3, 15, 20, 22, 24, 41],
      [12, 14, 25, 27, 39, 40],
      [10, 12, 18, 35, 42, 43],
      [1, 8, 13, 36, 44, 45],
      [2, 13, 16, 19, 32, 33],
      [9, 10, 15, 30, 33, 37],
      [9, 18, 19, 30, 34, 40],
      [3, 8, 17, 20, 27, 35],
      [13, 18, 30, 31, 38, 41],
      [14, 21, 35, 36, 40, 44],
      [3, 4, 15, 22, 28, 40],
      [2, 12, 30, 31, 39, 43],
      [4, 12, 22, 24, 33, 41],
      [7, 9, 22, 27, 37, 42],
      [1, 9, 26, 28, 30, 41],
      [4, 9, 23, 26, 29, 33],
      [10, 11, 20, 21, 25, 41],
      [4, 15, 24, 35, 36, 40],
      [2, 9, 10, 16, 35, 37],
      [1, 14, 15, 24, 40, 41],
      [2, 18, 24, 30, 32, 45],
      [11, 20, 29, 31, 33, 42],
      [1, 18, 28, 31, 34, 43],
      [6, 12, 19, 23, 34, 42],
      [6, 21, 36, 38, 39, 43],
      [2, 13, 25, 28, 29, 36],
      [1, 21, 25, 29, 34, 37],
      [1, 6, 13, 37, 38, 40],
      [2, 5, 12, 14, 24, 39],
      [3, 9, 10, 29, 40, 45],
      [9, 11, 16, 21, 28, 36],
      [2, 6, 17, 18, 21, 26],
      [3, 6, 17, 23, 37, 39],
      [22, 26, 31, 37, 41, 42],
      [1, 2, 11, 16, 39, 44],
      [7, 8, 9, 17, 22, 24],
      [4, 12, 14, 25, 35, 37],
      [2, 9, 10, 14, 22, 44],
      [1, 7, 15, 32, 34, 42],
      [7, 11, 16, 21, 27, 33],
      [3, 13, 16, 23, 24, 35],
      [27, 36, 37, 41, 43, 45],
      [5, 7, 13, 20, 21, 44],
      [13, 23, 26, 31, 35, 43],
      [3, 10, 23, 35, 36, 37],
      [17, 21, 23, 30, 34, 44],
      [7, 10, 16, 28, 41, 42],
      [2, 4, 15, 23, 29, 38],
      [2, 13, 20, 30, 31, 41],
      [17, 18, 21, 27, 29, 33],
      [2, 4, 25, 26, 36, 37],
      [13, 18, 25, 31, 33, 44],
      [12, 20, 26, 33, 44, 45],
      [6, 14, 16, 18, 24, 42],
      [1, 3, 8, 24, 27, 35],
      [1, 4, 13, 29, 38, 39],
      [6, 11, 15, 24, 32, 39],
      [4, 7, 14, 16, 24, 44],
      [13, 17, 18, 20, 42, 45],
      [1, 3, 9, 14, 18, 28],
      [2, 8, 19, 22, 32, 42],
      [6, 10, 12, 14, 20, 42],
      [17, 25, 33, 35, 38, 45],
      [1, 4, 29, 39, 43, 45],
      [7, 15, 30, 37, 39, 44],
      [8, 13, 18, 24, 27, 29],
      [8, 11, 15, 16, 17, 37],
      [8, 11, 16, 19, 21, 25],
      [9, 11, 30, 31, 41, 44],
      [15, 23, 29, 34, 40, 44],
      [9, 12, 15, 25, 34, 36],
      [1, 9, 12, 26, 35, 38],
      [5, 11, 18, 20, 35, 45],
      [21, 22, 26, 34, 36, 41],
      [3, 11, 14, 18, 26, 27],
      [14, 23, 31, 33, 37, 40],
      [15, 26, 28, 34, 41, 42],
      [12, 18, 22, 23, 30, 34],
      [3, 19, 21, 25, 37, 45],
      [1, 4, 13, 17, 34, 39],
      [12, 27, 29, 38, 41, 45],
      [12, 15, 17, 24, 29, 45],
      [5, 6, 11, 29, 42, 45],
      [10, 14, 16, 18, 29, 35],
      [9, 18, 20, 22, 38, 44],
      [8, 9, 20, 25, 29, 33],
      [5, 12, 13, 31, 32, 41],
      [14, 16, 27, 35, 39, 45],
      [5, 7, 12, 13, 18, 35],
      [12, 30, 32, 37, 39, 41],
      [2, 5, 11, 17, 24, 29],
      [6, 7, 22, 32, 35, 36],
      [1, 6, 12, 19, 36, 42],
      [3, 11, 15, 20, 35, 44],
      [26, 31, 32, 33, 38, 40],
      [9, 14, 34, 35, 41, 42],
      [2, 5, 22, 32, 34, 45],
      [2, 14, 15, 22, 27, 33],
      [7, 16, 24, 27, 37, 44],
      [2, 3, 6, 19, 36, 39],
      [8, 16, 26, 29, 31, 36],
      [6, 7, 9, 11, 17, 18],
      [5, 14, 15, 23, 34, 43],
      [3, 5, 12, 22, 26, 31],
      [12, 17, 20, 26, 28, 36],
      [6, 14, 15, 19, 21, 41],
      [7, 16, 25, 29, 35, 36],
      [2, 20, 33, 40, 42, 44],
      [6, 12, 17, 21, 32, 39],
      [3, 5, 13, 20, 21, 37],
      [6, 12, 31, 35, 38, 43],
      [21, 26, 30, 32, 33, 35],
      [5, 17, 26, 27, 35, 38],
      [22, 26, 29, 30, 34, 45],
      [14, 19, 27, 28, 30, 45],
      [4, 7, 12, 14, 22, 33],
      [13, 20, 24, 32, 36, 45],
      [8, 13, 19, 27, 40, 45],
      [11, 23, 25, 30, 32, 40],
      [7, 10, 22, 25, 34, 40],
      [3, 10, 24, 33, 38, 45],
      [4, 24, 27, 35, 37, 45],
      [20, 31, 32, 40, 41, 45],
      [3, 6, 22, 23, 24, 38],
      [3, 6, 9, 18, 22, 35],
      [3, 18, 19, 23, 32, 45],
      [6, 11, 16, 19, 21, 32],
      [7, 10, 19, 23, 28, 33],
      [4, 7, 19, 26, 33, 35],
      [1, 10, 18, 22, 28, 31],
      [3, 6, 14, 22, 30, 41],
      [1, 2, 11, 21, 30, 35],
      [16, 18, 20, 23, 32, 43],
      [6, 18, 28, 30, 32, 38],
      [1, 6, 20, 27, 28, 41],
      [1, 23, 24, 35, 44, 45],
      [3, 7, 9, 33, 36, 37],
      [4, 8, 17, 30, 40, 43],
      [6, 10, 11, 14, 36, 38],
      [4, 8, 18, 24, 37, 45],
      [13, 16, 23, 31, 36, 44],
      [1, 9, 16, 23, 24, 38],
      [21, 26, 27, 32, 34, 42],
      [3, 7, 14, 15, 22, 38],
      [8, 12, 13, 29, 33, 42],
      [4, 7, 17, 18, 38, 44],
      [11, 16, 25, 27, 35, 36],
      [13, 14, 18, 21, 34, 44],
      [11, 21, 22, 30, 39, 44],
      [4, 18, 31, 37, 42, 43],
      [12, 19, 21, 29, 40, 45],
      [6, 20, 23, 24, 28, 30],
      [7, 18, 19, 26, 33, 45],
      [10, 17, 22, 30, 35, 43],
      [6, 7, 15, 22, 26, 40],
      [8, 14, 28, 29, 34, 40],
      [1, 12, 16, 19, 23, 43],
      [14, 33, 34, 35, 37, 40],
      [12, 16, 21, 24, 41, 43],
      [3, 20, 28, 38, 40, 43],
      [17, 26, 29, 30, 31, 43],
      [6, 7, 13, 28, 36, 42],
      [13, 14, 22, 26, 37, 38],
      [10, 12, 29, 31, 40, 44],
      [1, 7, 21, 30, 35, 38],
      [6, 16, 34, 37, 39, 40],
      [1, 3, 4, 29, 42, 45],
      [6, 14, 30, 31, 40, 41],
      [7, 19, 26, 37, 39, 44],
      [10, 12, 13, 19, 33, 40],
      [3, 7, 11, 20, 22, 41],
      [3, 13, 30, 33, 43, 45],
      [16, 20, 26, 36, 42, 44],
      [11, 13, 20, 21, 32, 44],
      [10, 16, 19, 32, 33, 38],
      [7, 12, 23, 32, 34, 36],
      [15, 16, 17, 25, 30, 31],
      [3, 4, 9, 30, 33, 36],
      [11, 13, 14, 15, 16, 45],
      [1, 9, 12, 13, 20, 45],
      [2, 19, 26, 31, 38, 41],
      [6, 24, 31, 32, 38, 44],
      [3, 6, 21, 30, 34, 35],
      [13, 19, 21, 24, 34, 35],
      [3, 8, 17, 30, 33, 34],
      [6, 14, 25, 33, 40, 44],
      [4, 5, 9, 11, 37, 40],
      [10, 15, 24, 30, 31, 37],
      [1, 5, 8, 16, 28, 33],
      [5, 10, 11, 17, 28, 34],
      [15, 19, 21, 25, 27, 28],
      [1, 2, 6, 14, 27, 38],
      [6, 7, 19, 28, 34, 41],
      [13, 14, 20, 28, 29, 34],
      [3, 7, 9, 13, 19, 24],
      [1, 6, 13, 19, 21, 33],
      [21, 33, 35, 38, 42, 44],
      [4, 9, 12, 15, 33, 45],
      [14, 16, 19, 20, 29, 34],
      [5, 12, 15, 30, 37, 40],
      [7, 10, 22, 29, 31, 38],
      [7, 11, 12, 21, 26, 35],
      [2, 8, 28, 30, 37, 41],
      [10, 16, 17, 27, 28, 36],
      [3, 4, 12, 15, 26, 34],
      [2, 11, 31, 33, 37, 44],
      [6, 11, 17, 19, 40, 43],
      [7, 11, 24, 26, 27, 37],
      [3, 6, 13, 15, 16, 22],
      [8, 15, 19, 21, 32, 36],
      [8, 9, 18, 35, 39, 45],
      [2, 3, 9, 15, 27, 29],
      [30, 31, 32, 35, 36, 37],
      [1, 9, 10, 13, 35, 44],
      [4, 8, 22, 26, 32, 38],
      [10, 16, 19, 27, 37, 38],
      [30, 31, 34, 39, 41, 45],
      [5, 7, 12, 20, 25, 26],
      [21, 25, 27, 32, 37, 38],
      [3, 9, 27, 28, 38, 39],
      [7, 13, 18, 36, 39, 45, 19],
    ];

    // 백엔드 API 호출로 대체 가능
    /*
        const response = await fetch('http://localhost:3000/lotto');
        const result = await response.json();
        const pastWinningNumbers = result.data;
        */

    generateOptimizedLottoNumbers(sampleData);
  } catch (error) {
    throw error;
  }
}

// Fisher-Yates 셔플 (Crypto API 사용)
function shuffleArray(array) {
  const crypto = window.crypto || window.msCrypto;
  for (let i = array.length - 1; i > 0; i--) {
    const randomValues = new Uint32Array(1);
    crypto.getRandomValues(randomValues);
    const j = randomValues[0] % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 연속 번호 체크
function hasConsecutiveNumbers(numbers, maxConsecutive = 2) {
  numbers.sort((a, b) => a - b);
  let consecutiveCount = 1;
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === numbers[i - 1] + 1) {
      consecutiveCount++;
      if (consecutiveCount > maxConsecutive) return true;
    } else {
      consecutiveCount = 1;
    }
  }
  return false;
}

// 홀수/짝수 비율 체크
function isBalancedOddEven(numbers) {
  const oddCount = numbers.filter((n) => n % 2 === 1).length;
  return oddCount >= 2 && oddCount <= 4;
}

// 번호 분석 함수
function analyzeNumbers(numbers) {
  const oddCount = numbers.filter((n) => n % 2 === 1).length;
  const evenCount = 6 - oddCount;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const consecutive = hasConsecutiveNumbers(numbers);
  const range = Math.max(...numbers) - Math.min(...numbers);

  return {
    oddEven: `${oddCount}:${evenCount}`,
    sum: sum,
    consecutive: consecutive ? "있음" : "없음",
    range: range,
  };
}

// 분석 결과 표시 함수
function displayAnalysis(numbers, type) {
  const analysis = analyzeNumbers(numbers);
  const lottoNumbersDiv = document.getElementById("lotto-numbers");
  lottoNumbersDiv.textContent = `${type} 번호: ${numbers.join(", ")}`;

  let analysisDiv = document.getElementById("lotto-analysis");
  if (!analysisDiv) {
    analysisDiv = document.createElement("div");
    analysisDiv.id = "lotto-analysis";
    lottoNumbersDiv.parentNode.insertBefore(
      analysisDiv,
      lottoNumbersDiv.nextSibling
    );
  }

  analysisDiv.innerHTML = `
        <p>분석 결과:</p>
        <ul>
            <li>홀수:짝수 비율: ${analysis.oddEven}</li>
            <li>번호 합계: ${analysis.sum}</li>
            <li>연속 번호: ${analysis.consecutive}</li>
            <li>번호 범위: ${analysis.range}</li>
        </ul>
    `;
}

// 개선된 최적화 번호 생성
function generateOptimizedLottoNumbers(pastWinningNumbers) {
  const frequency = {};
  for (let i = 1; i <= 45; i++) frequency[i] = 0;
  pastWinningNumbers.forEach((numbers) => {
    numbers.forEach((num) => frequency[num]++);
  });

  const sortedNumbers = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => parseInt(entry[0]))
    .slice(0, 20);

  let optimizedNumbers;
  do {
    const shuffled = shuffleArray([...sortedNumbers]);
    optimizedNumbers = shuffled.slice(0, 6).sort((a, b) => a - b);
  } while (
    hasConsecutiveNumbers(optimizedNumbers) ||
    !isBalancedOddEven(optimizedNumbers)
  );

  displayAnalysis(optimizedNumbers, "최적화된 당첨");
}

// 개선된 무작위 번호 생성
function generateRandomLottoNumbers() {
  const allNumbers = Array.from({ length: 45 }, (_, i) => i + 1);
  let randomNumbers;

  do {
    const shuffled = shuffleArray([...allNumbers]);
    randomNumbers = shuffled.slice(0, 6).sort((a, b) => a - b);
  } while (
    hasConsecutiveNumbers(randomNumbers) ||
    !isBalancedOddEven(randomNumbers)
  );

  displayAnalysis(randomNumbers, "무작위 당첨");
}

// 혼합형 번호 생성 (옵션으로 추가)
function generateHybridLottoNumbers(pastWinningNumbers) {
  const frequency = {};
  for (let i = 1; i <= 45; i++) frequency[i] = 0;
  pastWinningNumbers.forEach((numbers) => {
    numbers.forEach((num) => frequency[num]++);
  });

  const topFrequent = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => parseInt(entry[0]))
    .slice(0, 10);

  const allNumbers = Array.from({ length: 45 }, (_, i) => i + 1);
  const remainingNumbers = allNumbers.filter(
    (num) => !topFrequent.includes(num)
  );

  let hybridNumbers;
  do {
    const shuffledFrequent = shuffleArray([...topFrequent]).slice(0, 3);
    const shuffledRemaining = shuffleArray([...remainingNumbers]).slice(0, 3);
    hybridNumbers = [...shuffledFrequent, ...shuffledRemaining].sort(
      (a, b) => a - b
    );
  } while (
    hasConsecutiveNumbers(hybridNumbers) ||
    !isBalancedOddEven(hybridNumbers)
  );

  displayAnalysis(hybridNumbers, "혼합형 당첨");
}

// cleanup 함수
function cleanup(overlay, popup) {
  document.body.removeChild(popup);
  overlay.style.display = "none";
}

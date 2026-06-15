const { useState, useEffect, useRef, useMemo, useCallback } = React;

const CURRICULUM = {
  수학: {
    chapters: [
      { id: "math_1", name: "소인수분해", topics: ["소수와 합성수", "거듭제곱", "소인수분해", "최대공약수", "최소공배수"] },
      { id: "math_2", name: "정수와 유리수", topics: ["양수와 음수", "정수와 유리수", "수직선", "절댓값", "정수와 유리수의 사칙연산"] },
      { id: "math_3", name: "문자와 식", topics: ["문자의 사용과 식의 값", "일차식의 계산", "일차방정식"] },
      { id: "math_4", name: "좌표평면과 그래프", topics: ["순서쌍과 좌표", "사분면", "그래프와 그 해석", "정비례", "반비례"] }
    ]
  },
  국어: {
    chapters: [
      { id: "kor_1", name: "문학의 갈래", topics: ["시의 특성", "소설의 특성", "극문학", "수필"] },
      { id: "kor_2", name: "문법의 기초", topics: ["품사", "문장 성분", "어휘와 어법"] },
      { id: "kor_3", name: "읽기와 쓰기", topics: ["설명하는 글", "주장하는 글", "정보 전달 글"] },
      { id: "kor_4", name: "듣기·말하기", topics: ["토론", "발표", "면담"] }
    ]
  },
  영어: {
    chapters: [
      { id: "eng_1", name: "현재시제와 be동사", topics: ["be동사 현재형", "일반동사 현재형", "인칭대명사"] },
      { id: "eng_2", name: "과거시제", topics: ["be동사 과거형", "일반동사 과거형 (규칙/불규칙)"] },
      { id: "eng_3", name: "미래시제", topics: ["will", "be going to"] },
      { id: "eng_4", name: "조동사", topics: ["can, may, must, should"] },
      { id: "eng_5", name: "문장 구조", topics: ["문장의 종류", "There is/are", "명령문"] },
      { id: "eng_6", name: "어휘와 독해", topics: ["단어 추론", "지문 이해", "빈칸 채우기"] }
    ]
  },
  사회: {
    chapters: [
      { id: "soc_1", name: "내가 사는 세계", topics: ["지도 읽기", "위도와 경도", "대륙과 대양", "세계 여러 지역"] },
      { id: "soc_2", name: "우리와 다른 기후, 다른 생활", topics: ["기후의 의미와 요인", "열대기후", "건조기후", "온대기후", "냉·한대기후"] },
      { id: "soc_3", name: "자연으로 떠나는 여행", topics: ["지형의 형성", "산지지형", "해안지형", "특수지형"] },
      { id: "soc_4", name: "다양한 세계, 다양한 문화", topics: ["문화의 의미", "세계 문화권", "문화 변용", "문화 상대주의"] }
    ]
  },
  과학: {
    chapters: [
      { id: "sci_1", name: "지권의 변화", topics: ["지구계", "지각의 구성", "암석의 순환", "지각 변동"] },
      { id: "sci_2", name: "여러 가지 힘", topics: ["힘의 표현", "중력과 탄성력", "마찰력", "부력"] },
      { id: "sci_3", name: "생물의 다양성", topics: ["생물 다양성", "생물 분류", "식물의 분류", "동물의 분류"] },
      { id: "sci_4", name: "기체의 성질", topics: ["입자의 운동", "보일의 법칙", "샤를의 법칙"] },
      { id: "sci_5", name: "물질의 상태 변화", topics: ["상태 변화", "상태 변화와 열에너지"] }
    ]
  }
};

// Utilities
function renderMath(text) {
  if (!text) return "";
  let rendered = text.replace(/\$\$(.*?)\$\$/gs, (_, latex) => {
    try {
      return katex.renderToString(latex, { displayMode: true, throwOnError: false });
    } catch(e) { return latex; }
  }).replace(/\$(.*?)\$/g, (_, latex) => {
    try {
      return katex.renderToString(latex, { displayMode: false, throwOnError: false });
    } catch(e) { return latex; }
  });
  return { __html: rendered };
}

// Helper to shuffle array
function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

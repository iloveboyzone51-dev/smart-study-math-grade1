// 정적 문제 은행 (원장님표 고품질 내장 문항)
const STATIC_QUESTIONS = [
  // --- 새로 추가된 고품질 시각 자료 문항 ---
  {
    id: "math_v1",
    subject: "수학",
    chapter: "기본도형과 다면체",
    difficulty: "상",
    type: "multiple_choice",
    question_text: "다음 그림의 사각뿔대에서 선분 BF와 꼬인 위치에 있는 모서리가 아닌 것은?",
    question_svg: `<svg width="240" height="180" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto;">
      <!-- Back edges (dashed) -->
      <line x1="90" y1="120" x2="190" y2="120" stroke="#333" stroke-dasharray="5,5" stroke-width="2"/>
      <line x1="90" y1="120" x2="50" y2="160" stroke="#333" stroke-dasharray="5,5" stroke-width="2"/>
      <line x1="90" y1="120" x2="105" y2="50" stroke="#333" stroke-dasharray="5,5" stroke-width="2"/>
      
      <!-- Bottom face solid -->
      <line x1="50" y1="160" x2="150" y2="160" stroke="#333" stroke-width="2"/>
      <line x1="150" y1="160" x2="190" y2="120" stroke="#333" stroke-width="2"/>
      
      <!-- Top face solid -->
      <line x1="105" y1="50" x2="155" y2="50" stroke="#333" stroke-width="2"/>
      <line x1="155" y1="50" x2="135" y2="80" stroke="#333" stroke-width="2"/>
      <line x1="135" y1="80" x2="85" y2="80" stroke="#333" stroke-width="2"/>
      <line x1="85" y1="80" x2="105" y2="50" stroke="#333" stroke-width="2"/>
      
      <!-- Lateral solid -->
      <line x1="85" y1="80" x2="50" y2="160" stroke="#333" stroke-width="2"/>
      <line x1="135" y1="80" x2="150" y2="160" stroke="#333" stroke-width="2"/>
      <line x1="155" y1="50" x2="190" y2="120" stroke="#333" stroke-width="2"/>
      
      <!-- Labels -->
      <text x="95" y="45" font-size="16" font-family="serif" font-weight="bold">D</text>
      <text x="160" y="45" font-size="16" font-family="serif" font-weight="bold">C</text>
      <text x="65" y="85" font-size="16" font-family="serif" font-weight="bold">A</text>
      <text x="142" y="85" font-size="16" font-family="serif" font-weight="bold">B</text>
      
      <text x="75" y="115" font-size="16" font-family="serif" font-weight="bold">H</text>
      <text x="195" y="125" font-size="16" font-family="serif" font-weight="bold">G</text>
      <text x="35" y="170" font-size="16" font-family="serif" font-weight="bold">E</text>
      <text x="155" y="175" font-size="16" font-family="serif" font-weight="bold">F</text>
    </svg>`,
    options: [
      "① 선분 AD",
      "② 선분 CD",
      "③ 선분 AB",
      "④ 선분 HE",
      "⑤ 선분 HG"
    ],
    correct_index: 2,
    correct_answer: "③",
    explanation: "꼬인 위치는 공간상에서 서로 평행하지도 않고 만나지도 않는 두 직선을 말합니다. 선분 AB는 선분 BF와 점 B에서 만나므로 꼬인 위치가 아닙니다.",
    hint: "만나거나 평행한 직선은 꼬인 위치가 될 수 없습니다. 그림에서 점 B에서 만나는 선분을 찾아보세요."
  },
  {
    id: "math_v2",
    subject: "수학",
    chapter: "부채꼴과 원",
    difficulty: "중",
    type: "multiple_choice",
    question_text: "다음 그림의 원 O에서 선분 AB는 원 O의 지름이고, 호 AC : 호 CB = 4 : 1 일 때, ∠BOC의 크기를 구하면?",
    question_svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto;">
      <circle cx="100" cy="100" r="80" fill="none" stroke="#222" stroke-width="2"/>
      <line x1="20" y1="100" x2="180" y2="100" stroke="#222" stroke-width="2"/>
      <line x1="100" y1="100" x2="164.7" y2="52.9" stroke="#222" stroke-width="2"/>
      <circle cx="100" cy="100" r="4" fill="#222"/>
      
      <text x="8" y="106" font-size="16" font-family="serif" font-weight="bold">A</text>
      <text x="185" y="106" font-size="16" font-family="serif" font-weight="bold">B</text>
      <text x="170" y="45" font-size="16" font-family="serif" font-weight="bold">C</text>
      <text x="95" y="120" font-size="16" font-family="serif" font-weight="bold">O</text>
      
      <!-- angle arc -->
      <path d="M 125 100 A 25 25 0 0 0 120 85" fill="none" stroke="#222" stroke-width="1.5"/>
    </svg>`,
    options: [
      "① 28°",
      "② 30°",
      "③ 32°",
      "④ 34°",
      "⑤ 36°"
    ],
    correct_index: 4,
    correct_answer: "⑤",
    explanation: "호의 길이는 중심각의 크기에 정비례합니다. 선분 AB가 지름이므로 반원의 중심각은 180°입니다. 호 AC:호 CB = 4:1 이므로, ∠BOC = 180° × (1 / (4 + 1)) = 180° × (1/5) = 36° 입니다.",
    hint: "지름에 대한 중심각은 180°입니다. 중심각은 호의 길이에 비례하여 나누어집니다."
  },
  {
    id: "math_v3",
    subject: "수학",
    chapter: "기본도형(입체도형)",
    difficulty: "중",
    type: "subjective",
    question_text: "다음 그림과 같은 두 입체도형 A, B의 교점의 개수의 합을 a, 교선의 개수의 합을 b라 할 때, a+b의 값을 구하여라.",
    question_svg: `<svg width="340" height="160" viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto; background: #f8fafc; border: 1px solid #cbd5e1;">
      <!-- Divider -->
      <line x1="170" y1="0" x2="170" y2="160" stroke="#cbd5e1" stroke-width="1"/>
      
      <!-- Headers -->
      <rect x="0" y="0" width="170" height="30" fill="#e2e8f0"/>
      <rect x="170" y="0" width="170" height="30" fill="#e2e8f0"/>
      <text x="85" y="20" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">A</text>
      <text x="255" y="20" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">B</text>
      <line x1="0" y1="30" x2="340" y2="30" stroke="#cbd5e1" stroke-width="1"/>
      
      <!-- Cylinder A -->
      <ellipse cx="85" cy="55" rx="35" ry="12" fill="white" stroke="#333" stroke-width="2"/>
      <line x1="50" y1="55" x2="50" y2="125" stroke="#333" stroke-width="2"/>
      <line x1="120" y1="55" x2="120" y2="125" stroke="#333" stroke-width="2"/>
      <path d="M 50 125 A 35 12 0 0 0 120 125" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M 50 125 A 35 12 0 0 1 120 125" fill="none" stroke="#333" stroke-dasharray="4,4" stroke-width="2"/>
      
      <!-- Square Pyramid B -->
      <g transform="translate(170, 0)">
        <!-- Base hidden -->
        <line x1="35" y1="125" x2="85" y2="105" stroke="#333" stroke-dasharray="4,4" stroke-width="2"/>
        <line x1="135" y1="125" x2="85" y2="105" stroke="#333" stroke-dasharray="4,4" stroke-width="2"/>
        <!-- Apex to Back hidden -->
        <line x1="85" y1="45" x2="85" y2="105" stroke="#333" stroke-dasharray="4,4" stroke-width="2"/>
        
        <!-- Base visible -->
        <polygon points="85,45 35,125 85,145" fill="#fed7aa" stroke="#333" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="85,45 85,145 135,125" fill="#fdba74" stroke="#333" stroke-width="2" stroke-linejoin="round"/>
      </g>
    </svg>`,
    correct_answer: "15",
    explanation: "도형 A(원기둥)는 꼭짓점(교점)이 없고 모서리(교선)가 2개(위, 아래 원)입니다. 따라서 a1=0, b1=2. 도형 B(사각뿔)는 꼭짓점 5개, 모서리가 8개입니다. 따라서 a2=5, b2=8. 전체 합 a=5, b=10 이므로 a+b=15 입니다.",
    hint: "교점은 꼭짓점을, 교선은 모서리를 의미합니다. 원기둥에는 뾰족한 교점이 있는지 생각해보세요."
  },
  {
    id: "soc_v1",
    subject: "사회",
    chapter: "지리적 위치와 대륙",
    difficulty: "상",
    type: "multiple_choice",
    question_text: "지도를 보고 대륙과 알파벳 연결이 잘못된 것을 고르면?",
    question_svg: `<svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto; border:1px solid #ccc; background:#f0f8ff;">
      <!-- Simplified Abstract Map -->
      <!-- North America (C) -->
      <path d="M 40 40 Q 80 10 130 50 T 110 100 Q 80 80 40 40" fill="#94a3b8" stroke="#fff" stroke-width="1.5"/>
      <!-- South America -->
      <path d="M 100 110 Q 140 100 130 170 T 100 190 Q 80 150 100 110" fill="#94a3b8" stroke="#fff" stroke-width="1.5"/>
      <!-- Europe (A) -->
      <path d="M 180 30 Q 210 20 220 50 T 180 70 Q 160 50 180 30" fill="#cbd5e1" stroke="#fff" stroke-width="1.5"/>
      <!-- Africa (D) -->
      <path d="M 180 80 Q 230 70 220 140 T 190 170 Q 160 120 180 80" fill="#475569" stroke="#fff" stroke-width="1.5"/>
      <!-- Asia (B) -->
      <path d="M 230 20 Q 360 10 330 90 T 260 100 Q 210 60 230 20" fill="#cbd5e1" stroke="#fff" stroke-width="1.5"/>
      <!-- Oceania (E) -->
      <path d="M 300 140 Q 350 130 360 170 T 320 190 Q 280 160 300 140" fill="#1e293b" stroke="#fff" stroke-width="1.5"/>
      
      <!-- Markers -->
      <circle cx="190" cy="45" r="14" fill="white" stroke="#333" stroke-width="2"/>
      <text x="190" y="50" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">A</text>
      
      <circle cx="280" cy="50" r="14" fill="white" stroke="#333" stroke-width="2"/>
      <text x="280" y="55" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">B</text>
      
      <circle cx="85" cy="55" r="14" fill="white" stroke="#333" stroke-width="2"/>
      <text x="85" y="60" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">C</text>
      
      <circle cx="195" cy="115" r="14" fill="white" stroke="#333" stroke-width="2"/>
      <text x="195" y="120" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">D</text>
      
      <circle cx="320" cy="160" r="14" fill="white" stroke="#333" stroke-width="2"/>
      <text x="320" y="165" font-size="14" font-family="sans-serif" text-anchor="middle" font-weight="bold">E</text>
    </svg>`,
    options: [
      "① A - 유럽",
      "② B - 아시아",
      "③ C - 북아메리카",
      "④ D - 아프리카",
      "⑤ E - 남아메리카"
    ],
    correct_index: 4,
    correct_answer: "⑤",
    explanation: "A는 유럽, B는 아시아, C는 북아메리카, D는 아프리카, E는 오세아니아입니다. 남아메리카는 북아메리카(C) 아래쪽에 위치한 대륙입니다.",
    hint: "호주가 있는 E 대륙의 이름은 무엇일까요?"
  },

  // --- 국어 ---
  {
    id: "kor_1",
    subject: "국어",
    chapter: "시의 형상성",
    difficulty: "하",
    type: "multiple_choice",
    question_text: "다음 중 '시각적 심상'이 가장 두드러지게 나타난 구절은?",
    options: [
      "① 귀뚜라미 우는 밤",
      "② 향긋한 풀내음",
      "③ 붉은 해가 솟아오른다",
      "④ 따스한 봄바람",
      "⑤ 매운 고추 맛"
    ],
    correct_index: 2,
    correct_answer: "③",
    explanation: "시각적 심상은 눈으로 보는 듯한 느낌을 줍니다. '붉은 해'는 색채를 통해 시각적 심상을 명확히 드러냅니다.",
    hint: "색깔이나 모양을 나타내는 구절을 찾아보세요."
  },
  {
    id: "kor_2",
    subject: "국어",
    chapter: "품사의 이해",
    difficulty: "중",
    type: "multiple_choice",
    question_text: "다음 문장에서 밑줄 친 단어의 품사로 알맞은 것은?<br/><br/>나는 <u>새</u> 신발을 신고 학교에 갔다.",
    options: [
      "① 명사",
      "② 대명사",
      "③ 관형사",
      "④ 부사",
      "⑤ 형용사"
    ],
    correct_index: 2,
    correct_answer: "③",
    explanation: "'새'는 뒤에 오는 명사 '신발'을 수식하며 형태가 변하지 않으므로 관형사입니다.",
    hint: "체언(명사, 대명사, 수사)을 꾸며주는 역할을 하는 품사입니다."
  },
  {
    id: "kor_3",
    subject: "국어",
    chapter: "소설의 구성",
    difficulty: "중",
    type: "multiple_choice",
    question_text: "소설의 구성 단계 중 갈등이 가장 고조되고 사건의 해결 실마리가 나타나는 단계는?",
    options: [
      "① 발단",
      "② 전개",
      "③ 위기",
      "④ 절정",
      "⑤ 결말"
    ],
    correct_index: 3,
    correct_answer: "④",
    explanation: "소설의 구성은 발단-전개-위기-절정-결말로 이루어지며, 절정 단계에서 갈등이 최고조에 달합니다.",
    hint: "갈등이 '최고'에 달하는 산의 꼭대기를 의미하는 단어입니다."
  },
  {
    id: "kor_4",
    subject: "국어",
    chapter: "비유적 표현",
    difficulty: "상",
    type: "subjective",
    question_text: "'내 마음은 호수요'와 같이 원관념과 보조관념을 'A는 B이다'의 형태로 연결하는 비유법의 이름을 쓰시오.",
    correct_answer: "은유법",
    explanation: "'A는 B이다' 형태로 원관념과 보조관념을 동일시하는 비유법을 은유법이라고 합니다.",
    hint: "'~같이', '~처럼'을 쓰는 직유법과 다르게 'A=B'의 형태를 띱니다."
  },
  {
    id: "kor_5",
    subject: "국어",
    chapter: "설명문 읽기",
    difficulty: "상",
    type: "multiple_choice",
    question_text: "설명문에 대한 설명으로 옳지 <b>않은</b> 것은?",
    options: [
      "① 객관적인 사실을 전달한다.",
      "② 독자의 이해를 돕는 것을 목적으로 한다.",
      "③ 글쓴이의 주관적인 감정이나 주장이 강하게 드러난다.",
      "④ 명료하고 간결한 문장을 주로 사용한다.",
      "⑤ 예시, 비교, 대조 등의 설명 방법을 활용한다."
    ],
    correct_index: 2,
    correct_answer: "③",
    explanation: "설명문은 정보를 전달하기 위한 글이므로 주관적인 감정이나 의견은 배제하고 객관적인 태도를 유지해야 합니다.",
    hint: "설명문은 '사실'을 바탕으로 정보를 제공하는 글입니다."
  },

  // --- 영어 ---
  {
    id: "eng_1",
    subject: "영어",
    chapter: "be동사와 인칭대명사",
    difficulty: "하",
    type: "multiple_choice",
    question_text: "빈칸에 들어갈 알맞은 be동사는?<br/><br/>My parents ______ doctors.",
    options: [
      "① am",
      "② are",
      "③ is",
      "④ was",
      "⑤ be"
    ],
    correct_index: 1,
    correct_answer: "②",
    explanation: "'My parents'는 3인칭 복수이므로 be동사 'are'를 사용해야 합니다.",
    hint: "주어가 복수(여럿)일 때 쓰는 be동사를 생각해보세요."
  },
  {
    id: "eng_2",
    subject: "영어",
    chapter: "일반동사의 현재형",
    difficulty: "중",
    type: "multiple_choice",
    question_text: "다음 중 어법상 바른 문장은?",
    options: [
      "① He play soccer well.",
      "② She don't like apples.",
      "③ They goes to school by bus.",
      "④ Tom watches TV every evening.",
      "⑤ Does you have a pen?"
    ],
    correct_index: 3,
    correct_answer: "④",
    explanation: "주어 Tom이 3인칭 단수이고 현재 시제이므로 동사에 -es가 붙은 watches가 올바릅니다.",
    hint: "주어가 3인칭 단수(He, She, It 등)일 때 일반동사의 형태에 주의하세요."
  },
  {
    id: "eng_3",
    subject: "영어",
    chapter: "조동사",
    difficulty: "중",
    type: "multiple_choice",
    question_text: "'You must not run in the hallway.'와 같은 의미를 가진 문장은?",
    options: [
      "① You don't have to run in the hallway.",
      "② You should run in the hallway.",
      "③ You can run in the hallway.",
      "④ You shouldn't run in the hallway.",
      "⑤ You are able to run in the hallway."
    ],
    correct_index: 3,
    correct_answer: "④",
    explanation: "'must not'은 강한 금지를 나타내며, '~해서는 안 된다'는 뜻의 'should not(shouldn't)'과 비슷한 의미로 쓰일 수 있습니다.",
    hint: "must not은 '금지'를 나타냅니다."
  },
  {
    id: "eng_4",
    subject: "영어",
    chapter: "의문사 의문문",
    difficulty: "상",
    type: "subjective",
    question_text: "다음 우리말과 같은 뜻이 되도록 빈칸에 알맞은 의문사를 쓰시오.<br/><br/>너는 학교에 어떻게 가니?<br/>= ______ do you go to school?",
    correct_answer: "How",
    explanation: "방법이나 수단을 물을 때는 의문사 How를 사용합니다.",
    hint: "'어떻게'에 해당하는 영어 단어입니다."
  },
  {
    id: "eng_5",
    subject: "영어",
    chapter: "현재진행형",
    difficulty: "상",
    type: "multiple_choice",
    question_text: "다음 문장을 현재진행형으로 바르게 고친 것은?<br/><br/>The baby sleeps on the bed.",
    options: [
      "① The baby is sleep on the bed.",
      "② The baby is sleeping on the bed.",
      "③ The baby sleeping on the bed.",
      "④ The baby are sleeping on the bed.",
      "⑤ The baby sleeps is on the bed."
    ],
    correct_index: 1,
    correct_answer: "②",
    explanation: "현재진행형은 「be동사 + 동사원형-ing」 형태입니다. 주어가 The baby (단수)이므로 is sleeping이 올바릅니다.",
    hint: "현재진행형의 기본 형태인 'be동사 + -ing'를 적용해보세요."
  },

  // --- 수학 ---
  {
    id: "math_1",
    subject: "수학",
    chapter: "소인수분해",
    difficulty: "하",
    type: "multiple_choice",
    question_text: "다음 중 소수에 대한 설명으로 옳은 것을 모두 고르면?",
    options: [
      "① 1은 소수이다.",
      "② 모든 소수는 홀수이다.",
      "③ 2는 가장 작은 소수이다.",
      "④ 합성수는 약수가 2개뿐이다.",
      "⑤ 소수이면서 합성수인 자연수가 존재한다."
    ],
    correct_index: 2,
    correct_answer: "③",
    explanation: "소수는 1보다 큰 자연수 중 1과 자기 자신만을 약수로 가지는 수입니다. 2는 유일한 짝수 소수이며 가장 작습니다.",
    hint: "2의 약수를 생각해보세요."
  },
  {
    id: "math_2",
    subject: "수학",
    chapter: "정수와 유리수",
    difficulty: "중",
    type: "subjective",
    question_text: "$-3$보다 크고 $2$보다 작거나 같은 정수의 개수를 구하시오.",
    correct_answer: "5",
    explanation: "해당하는 정수는 $-2, -1, 0, 1, 2$ 이므로 총 5개입니다.",
    hint: "수직선에서 -3과 2 사이에 있는 수들을 나열해보세요. (-3은 포함되지 않습니다)"
  },
  {
    id: "math_3",
    subject: "수학",
    chapter: "문자와 식",
    difficulty: "중",
    type: "multiple_choice",
    question_text: "식 $2x - 5y + 3$에서 상수항은?",
    options: [
      "① 2",
      "② -5",
      "③ 3",
      "④ x",
      "⑤ y"
    ],
    correct_index: 2,
    correct_answer: "③",
    explanation: "상수항은 문자 없이 수로만 이루어진 항을 의미합니다. 따라서 3입니다.",
    hint: "상수항이란 문자가 포함되지 않은 항입니다."
  },
  {
    id: "math_4",
    subject: "수학",
    chapter: "일차방정식",
    difficulty: "상",
    type: "multiple_choice",
    question_text: "일차방정식 $3(x - 2) = x + 4$의 해를 구하시오.",
    options: [
      "① $x = 2$",
      "② $x = 3$",
      "③ $x = 4$",
      "④ $x = 5$",
      "⑤ $x = 6$"
    ],
    correct_index: 3,
    correct_answer: "④",
    explanation: "괄호를 풀면 $3x - 6 = x + 4$가 됩니다. 이항하여 정리하면 $2x = 10$, 양변을 2로 나누면 $x = 5$입니다.",
    hint: "먼저 분배법칙을 사용하여 괄호를 풀고, x는 왼쪽으로, 숫자는 오른쪽으로 이항하세요.",
    math_solution_steps: [
      { step: 1, title: "괄호 풀기", content: "분배법칙을 적용합니다.", latex: "3x - 6 = x + 4" },
      { step: 2, title: "이항하기", content: "$x$를 좌변으로, 상수를 우변으로 이항합니다.", latex: "3x - x = 4 + 6" },
      { step: 3, title: "동류항 정리", content: "양변을 계산합니다.", latex: "2x = 10" },
      { step: 4, title: "결과 도출", content: "양변을 2로 나눕니다.", latex: "x = 5" }
    ]
  },
  {
    id: "math_5",
    subject: "수학",
    chapter: "좌표평면과 그래프",
    difficulty: "상",
    type: "subjective",
    question_text: "점 $(-3, 4)$가 위치한 사분면은 제 몇 사분면인지 숫자로만 쓰시오.",
    correct_answer: "2",
    explanation: "$x$좌표가 음수, $y$좌표가 양수이므로 제2사분면입니다.",
    hint: "x축의 음의 방향(왼쪽)과 y축의 양의 방향(위쪽)이 만나는 영역입니다."
  },

  // --- 사회 ---
  {
    id: "soc_1",
    subject: "사회",
    chapter: "내가 사는 세계",
    difficulty: "하",
    type: "multiple_choice",
    question_text: "위도와 경도를 이용하여 위치를 나타내는 방식은?",
    options: [
      "① 상대적 위치",
      "② 절대적 위치",
      "③ 지형적 위치",
      "④ 관계적 위치",
      "⑤ 문화적 위치"
    ],
    correct_index: 1,
    correct_answer: "②",
    explanation: "위도와 경도라는 수치화된 좌표를 이용해 변하지 않는 고정된 위치를 나타내는 것을 수리적 위치(절대적 위치)라고 합니다.",
    hint: "변하지 않는 고정된 좌표값이라는 점에 주목하세요."
  },
  {
    id: "soc_2",
    subject: "사회",
    chapter: "다양한 기후 지역",
    difficulty: "중",
    type: "multiple_choice",
    question_text: "1년 내내 기온이 높고 강수량이 많아 밀림이 형성되는 기후는?",
    options: [
      "① 열대 우림 기후",
      "② 사막 기후",
      "③ 지중해성 기후",
      "④ 서안 해양성 기후",
      "⑤ 툰드라 기후"
    ],
    correct_index: 0,
    correct_answer: "①",
    explanation: "적도 주변에 분포하며 고온 다습하여 다양한 동식물이 서식하는 밀림(열대 우림)이 형성됩니다.",
    hint: "'열대'와 비가 많이 내린다는 뜻의 '우림'을 조합해보세요."
  },
  {
    id: "soc_3",
    subject: "사회",
    chapter: "인구 변화와 인구 문제",
    difficulty: "중",
    type: "multiple_choice",
    question_text: "개발도상국에서 주로 나타나는 인구 문제로 가장 적절한 것은?",
    options: [
      "① 저출산",
      "② 고령화",
      "③ 인구의 급격한 증가",
      "④ 노동력 부족",
      "⑤ 인구의 역도시화"
    ],
    correct_index: 2,
    correct_answer: "③",
    explanation: "개발도상국은 사망률이 감소하는 반면 출생률은 여전히 높아 인구가 급증하는 경향을 보입니다.",
    hint: "선진국은 저출산 고령화, 개발도상국은 그 반대 양상입니다."
  },
  {
    id: "soc_4",
    subject: "사회",
    chapter: "정치 생활과 민주주의",
    difficulty: "상",
    type: "subjective",
    question_text: "국가의 주권이 국민에게 있고, 국민을 위해 정치가 이루어지는 제도를 무엇이라고 합니까?",
    correct_answer: "민주주의",
    explanation: "민주주의는 '국민(Demos)의 지배(Kratos)'라는 어원을 가지며, 국민이 주권을 갖는 정치 형태를 말합니다.",
    hint: "대한민국은 OOOO 공화국입니다."
  },
  {
    id: "soc_5",
    subject: "사회",
    chapter: "일상생활과 법",
    difficulty: "상",
    type: "multiple_choice",
    question_text: "법의 특징으로 옳지 <b>않은</b> 것은?",
    options: [
      "① 국가 기관에 의해 만들어진다.",
      "② 강제성이 있다.",
      "③ 위반 시 제재를 받는다.",
      "④ 시대와 사회에 관계없이 항상 변하지 않는다.",
      "⑤ 사람들의 외부적 행위를 주로 규율한다."
    ],
    correct_index: 3,
    correct_answer: "④",
    explanation: "법은 사회의 변화에 따라 새롭게 제정되거나 개정되기도 하므로 고정불변한 것은 아닙니다.",
    hint: "스마트폰이 생기면서 사이버 범죄 관련 법이 새로 만들어진 것을 생각해보세요."
  },

  // --- 과학 ---
  {
    id: "sci_1",
    subject: "과학",
    chapter: "지권의 변화",
    difficulty: "하",
    type: "multiple_choice",
    question_text: "지구를 둘러싸고 있는 가장 바깥쪽의 단단한 암석층은?",
    options: [
      "① 맨틀",
      "② 외핵",
      "③ 내핵",
      "④ 지각",
      "⑤ 연약권"
    ],
    correct_index: 3,
    correct_answer: "④",
    explanation: "지구 내부 구조 중 가장 겉에 있는 얇고 단단한 암석층을 지각이라고 합니다.",
    hint: "사과의 껍질에 해당하는 부분입니다."
  },
  {
    id: "sci_2",
    subject: "과학",
    chapter: "여러 가지 힘",
    difficulty: "중",
    type: "multiple_choice",
    question_text: "두 물체의 접촉면에서 물체의 운동을 방해하는 힘은?",
    options: [
      "① 중력",
      "② 탄성력",
      "③ 마찰력",
      "④ 자기력",
      "⑤ 전기력"
    ],
    correct_index: 2,
    correct_answer: "③",
    explanation: "마찰력은 접촉한 상태에서 미끄러짐을 방해하는 방향으로 작용하는 힘입니다.",
    hint: "얼음판 위보다 모래사장 위에서 걷기 힘든 이유와 관련된 힘입니다."
  },
  {
    id: "sci_3",
    subject: "과학",
    chapter: "생물의 다양성",
    difficulty: "중",
    type: "subjective",
    question_text: "생물을 분류하는 기본 단위를 무엇이라고 합니까?",
    correct_answer: "종",
    explanation: "생물 분류 체계(계-문-강-목-과-속-종)에서 가장 기본이 되는 단위는 종(species)입니다.",
    hint: "자연 상태에서 교배하여 생식 능력이 있는 자손을 낳을 수 있는 생물 무리를 일컫는 한 글자 단어입니다."
  },
  {
    id: "sci_4",
    subject: "과학",
    chapter: "기체의 성질",
    difficulty: "상",
    type: "multiple_choice",
    question_text: "온도가 일정할 때 기체의 부피는 압력에 반비례한다는 법칙은?",
    options: [
      "① 보일 법칙",
      "② 샤를 법칙",
      "③ 질량 보존 법칙",
      "④ 아보가드로 법칙",
      "⑤ 관성의 법칙"
    ],
    correct_index: 0,
    correct_answer: "①",
    explanation: "온도가 일정할 때, 압력이 커지면 기체의 부피가 작아지는 현상을 설명한 것은 보일 법칙입니다.",
    hint: "영국의 과학자 로버트 'ㅇㅇ'의 이름을 딴 법칙입니다."
  },
  {
    id: "sci_5",
    subject: "과학",
    chapter: "빛과 파동",
    difficulty: "상",
    type: "multiple_choice",
    question_text: "빛의 3원색을 모두 합치면 무슨 색이 되는가?",
    options: [
      "① 검은색",
      "② 흰색",
      "③ 빨간색",
      "④ 파란색",
      "⑤ 노란색"
    ],
    correct_index: 1,
    correct_answer: "②",
    explanation: "빛의 3원색(빨강, 초록, 파랑)을 모두 합성하면 가장 밝은 흰색(백색광)이 됩니다.",
    hint: "무지개 색이 모두 합쳐진 햇빛의 색을 생각해보세요."
  }
];

// 이전에 사용되던 데이터를 덮어씌웁니다. (window 객체에 주입)
window.STATIC_QUESTIONS = STATIC_QUESTIONS;

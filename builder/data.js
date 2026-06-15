module.exports = {
  day1: {
    title: "1일차: 곱셈, 나눗셈 기호 생략",
    date: "2026.06.12 (금)",
    id: "math_1",
    lecture: {
      title: "기호를 숨기는 마법",
      intro: "자, 이제 선생님이랑 같이 <strong>'문자와 식'</strong> 첫걸음을 떼어 볼 거야! 곱셈과 나눗셈 기호를 생략하는 규칙을 배워보자.",
      rules: [
        "수와 문자의 곱셈에서 $\\times$는 생략하고 숫자를 문자 앞에 쓴다! (예: $x \\times 3 \\Rightarrow 3x$)",
        "문자끼리의 곱셈은 알파벳 순서대로 쓴다! (예: $b \\times a \\Rightarrow ab$)",
        "같은 문자의 곱은 거듭제곱으로 나타낸다! (예: $a \\times a \\times a \\Rightarrow a^3$)",
        "1이나 -1과 문자의 곱에서 1은 생략한다! (예: $1 \\times a \\Rightarrow a$, $-1 \\times a \\Rightarrow -a$)",
        "나눗셈 $\\div$ 은 분수로 바꾼다! (예: $a \\div 3 \\Rightarrow \\dfrac{a}{3}$)"
      ],
      steps: [
        { text: "다음 식을 간단히 해보자: $(a \\div 3) \\times b$", math: "$(a \\div 3) \\times b$" },
        { text: "① 괄호 안의 나눗셈을 분수로 바꾼다.", math: "$\\dfrac{a}{3} \\times b$" },
        { text: "② 분자에 $b$를 곱해준다.", math: "$\\dfrac{ab}{3}$" }
      ]
    },
    basic: [
      { type: "subjective", q: "$x \\times 5$ 를 간단히 하시오.", a: ["5x"] },
      { type: "subjective", q: "$a \\times (-3)$ 를 간단히 하시오.", a: ["-3a"] },
      { type: "subjective", q: "$y \\times 1$ 을 간단히 하시오.", a: ["y"] },
      { type: "subjective", q: "$-1 \\times x$ 를 간단히 하시오.", a: ["-x"] },
      { type: "subjective", q: "$a \\times b \\times c$ 를 간단히 하시오.", a: ["abc"] },
      { type: "subjective", q: "$y \\times x \\times 2$ 를 간단히 하시오.", a: ["2xy"] },
      { type: "subjective", q: "$a \\times a$ 를 간단히 하시오.", a: ["a^2"] },
      { type: "subjective", q: "$x \\times x \\times x$ 를 간단히 하시오.", a: ["x^3"] },
      { type: "subjective", q: "$a \\div 4$ 를 간단히 하시오. (답 예시: a/4)", a: ["a/4"] },
      { type: "subjective", q: "$x \\div y$ 를 간단히 하시오. (답 예시: x/y)", a: ["x/y"] },
      { type: "choice", q: "$b \\times a \\times 3$ 을 간단히 한 것은?", options: ["$3ab$", "$ab3$", "$3ba$", "$a3b$"], correct: 0 },
      { type: "choice", q: "$x \\times (-1) \\times y$ 를 간단히 한 것은?", options: ["$-1xy$", "$-xy$", "$xy-1$", "$-yx$"], correct: 1 },
      { type: "choice", q: "$a \\times a \\times b$ 를 간단히 한 것은?", options: ["$2ab$", "$a^2b$", "$ab^2$", "$aab$"], correct: 1 },
      { type: "choice", q: "$x \\div (-2)$ 를 간단히 한 것은?", options: ["$\\dfrac{-2}{x}$", "$-2x$", "$-\\dfrac{x}{2}$", "$\\dfrac{x}{-2x}$"], correct: 2 },
      { type: "choice", q: "$(a+b) \\div 3$ 을 간단히 한 것은?", options: ["$\\dfrac{a}{3} + b$", "$a + \\dfrac{b}{3}$", "$\\dfrac{a+b}{3}$", "$3(a+b)$"], correct: 2 }
    ],
    advanced: [
      { type: "subjective", q: "$x \\times 3 + y \\div 2$ 를 기호를 생략하여 쓰시오. (분수는 y/2 로 입력)", a: ["3x+y/2"] },
      { type: "subjective", q: "$a \\div b \\times 5$ 를 간단히 하시오. (답 예시: 5a/b)", a: ["5a/b"] },
      { type: "subjective", q: "$x \\times x \\times y \\times (-2)$ 를 간단히 하시오.", a: ["-2x^2y"] },
      { type: "subjective", q: "$a \\div (b \\times c)$ 를 간단히 하시오. (답 예시: a/bc)", a: ["a/bc", "a/(bc)"] },
      { type: "subjective", q: "$(x-y) \\div 4$ 를 간단히 하시오. (답 예시: (x-y)/4)", a: ["(x-y)/4"] },
      { type: "subjective", q: "$a \\times 0.1$ 을 간단히 하시오.", a: ["0.1a"] },
      { type: "subjective", q: "한 변의 길이가 $a$인 정사각형의 둘레의 길이를 식(기호 생략)으로 나타내시오.", a: ["4a"] },
      { type: "subjective", q: "가로가 $x$, 세로가 $y$인 직사각형의 넓이를 나타내시오.", a: ["xy"] },
      { type: "subjective", q: "$a \\div 3 - b \\times 4$ 를 기호를 생략하여 나타내시오. (답 예시: a/3-4b)", a: ["a/3-4b"] },
      { type: "subjective", q: "$x \\div \\dfrac{1}{2}$ 를 곱셈으로 바꾸고 기호를 생략하시오.", a: ["2x"] },
      { type: "choice", q: "$a \\div b \\div c$ 를 간단히 한 것은?", options: ["$\\dfrac{ab}{c}$", "$\\dfrac{a}{bc}$", "$\\dfrac{ac}{b}$", "$abc$"], correct: 1 },
      { type: "choice", q: "$x \\times y \\div z \\times 2$ 를 간단히 한 것은?", options: ["$\\dfrac{2xy}{z}$", "$\\dfrac{xy}{2z}$", "$\\dfrac{2x}{yz}$", "$\\dfrac{2z}{xy}$"], correct: 0 },
      { type: "choice", q: "$-1 \\times (a-b)$ 를 간단히 한 것은?", options: ["$-1(a-b)$", "$-a-b$", "$-(a-b)$", "$a-b$"], correct: 2 },
      { type: "choice", q: "$x \\div y \\times y$ 의 결과는? (단, $y \\neq 0$)", options: ["$x$", "$\\dfrac{x}{y^2}$", "$\\dfrac{1}{x}$", "$xy$"], correct: 0 },
      { type: "choice", q: "거리가 $x$ km이고 속력이 시속 $5$ km일 때 걸린 시간은?", options: ["$5x$ 시간", "$\\dfrac{5}{x}$ 시간", "$\\dfrac{x}{5}$ 시간", "$x+5$ 시간"], correct: 2 }
    ]
  },
  day2: {
    title: "2일차: 대입과 식의 값",
    date: "2026.06.13 (토)",
    id: "math_2",
    lecture: {
      title: "문자에 숫자를 쏙! (대입)",
      intro: "숨겨진 문자에 숫자를 장착해보자! 이걸 '대입'이라고 불러. 생략된 기호를 다시 살려내는 게 포인트야.",
      rules: [
        "대입: 식의 문자 대신에 수를 바꾸어 넣는 것",
        "식의 값: 대입을 해서 계산해 낸 결과",
        "생략된 $\\times$를 다시 살려야 해! ($3x$ 에 $x=2$ 대입 $\\rightarrow 3 \\times 2 = 6$)",
        "음수를 대입할 때는 반드시 괄호를 쳐야 해! ($x^2$ 에 $x=-3$ 대입 $\\rightarrow (-3)^2 = 9$)"
      ],
      steps: [
        { text: "$x=-2, y=5$ 일 때, $3x + 2y$ 의 값은?", math: "$3x + 2y$" },
        { text: "① $x$와 $y$ 자리에 숫자를 괄호 쳐서 대입한다.", math: "$3 \\times (-2) + 2 \\times 5$" },
        { text: "② 곱셈을 먼저 계산한다.", math: "$-6 + 10$" },
        { text: "③ 덧셈을 계산한다.", math: "$4$" }
      ]
    },
    basic: [
      { type: "subjective", q: "$x = 3$ 일 때, $5x$ 의 값을 구하시오.", a: ["15"] },
      { type: "subjective", q: "$a = -4$ 일 때, $a + 10$ 의 값을 구하시오.", a: ["6"] },
      { type: "subjective", q: "$y = -2$ 일 때, $-3y$ 의 값을 구하시오.", a: ["6"] },
      { type: "subjective", q: "$x = 5$ 일 때, $10 - 2x$ 의 값을 구하시오.", a: ["0"] },
      { type: "subjective", q: "$a = 2, b = 3$ 일 때, $2a + 3b$ 의 값을 구하시오.", a: ["13"] },
      { type: "subjective", q: "$x = -3$ 일 때, $x^2$ 의 값을 구하시오.", a: ["9"] },
      { type: "subjective", q: "$x = -3$ 일 때, $-x^2$ 의 값을 구하시오.", a: ["-9"] },
      { type: "subjective", q: "$a = 4$ 일 때, $\\dfrac{12}{a}$ 의 값을 구하시오.", a: ["3"] },
      { type: "subjective", q: "$x = -5$ 일 때, $\\dfrac{x}{5}$ 의 값을 구하시오.", a: ["-1"] },
      { type: "subjective", q: "$a = 1, b = -1$ 일 때, $a - b$ 의 값을 구하시오.", a: ["2"] },
      { type: "choice", q: "$x = -2$ 일 때, 가장 큰 값을 갖는 식은?", options: ["$x$", "$2x$", "$x^2$", "$-x^2$"], correct: 2 },
      { type: "choice", q: "$x = 4$ 일 때, $\\dfrac{x-2}{2}$ 의 값은?", options: ["$0$", "$1$", "$2$", "$3$"], correct: 1 },
      { type: "choice", q: "$a = -1, b = 2$ 일 때, $ab$ 의 값은?", options: ["$-2$", "$-1$", "$1$", "$2$"], correct: 0 },
      { type: "choice", q: "$x = 3$ 일 때, $x^2 - x$ 의 값은?", options: ["$3$", "$6$", "$9$", "$12$"], correct: 1 },
      { type: "choice", q: "$a = \\dfrac{1}{2}$ 일 때, $\\dfrac{2}{a}$ 의 값은?", options: ["$1$", "$2$", "$4$", "$8$"], correct: 2 }
    ],
    advanced: [
      { type: "subjective", q: "$x = -2, y = 3$ 일 때, $x^2 + y$ 의 값을 구하시오.", a: ["7"] },
      { type: "subjective", q: "$a = -3, b = -2$ 일 때, $ab - a$ 의 값을 구하시오.", a: ["9"] },
      { type: "subjective", q: "$x = 4$ 일 때, $2x^2 - 3x + 1$ 의 값을 구하시오.", a: ["21"] },
      { type: "subjective", q: "$x = -1, y = 5$ 일 때, $\\dfrac{x+y}{2}$ 의 값을 구하시오.", a: ["2"] },
      { type: "subjective", q: "$a = \\dfrac{1}{3}$ 일 때, $6a - 1$ 의 값을 구하시오.", a: ["1"] },
      { type: "subjective", q: "기온이 $x$℃일 때, 소리의 속력은 $(331 + 0.6x)$ m/s 이다. 기온이 $10$℃일 때 소리의 속력은? (숫자만 입력)", a: ["337"] },
      { type: "subjective", q: "$x = -2$ 일 때, $-x^3$ 의 값을 구하시오.", a: ["8"] },
      { type: "subjective", q: "$a=2, b=-3, c=-1$ 일 때, $a+b-c$ 의 값을 구하시오.", a: ["0"] },
      { type: "subjective", q: "$x=5$ 일 때, $\\dfrac{20}{x} + 2x$ 의 값을 구하시오.", a: ["14"] },
      { type: "subjective", q: "$x = -\\dfrac{1}{2}$ 일 때, $-\\dfrac{4}{x}$ 의 값을 구하시오.", a: ["8"] },
      { type: "choice", q: "$a=-2, b=4$ 일 때, $\\dfrac{a^2 - b}{a}$ 의 값은?", options: ["$0$", "$-2$", "$2$", "$-4$"], correct: 0 },
      { type: "choice", q: "$x = 3$ 일 때, 값이 $-6$ 이 되는 식은?", options: ["$2x$", "$-2x$", "$x-9$", "$x^2-15$"], correct: 1 },
      { type: "choice", q: "어떤 수 $x$에 $3$을 곱하고 $2$를 뺀 식에서 $x=-1$ 일 때의 값은?", options: ["$-5$", "$-1$", "$1$", "$5$"], correct: 0 },
      { type: "choice", q: "$x=0.5$ 일 때, $\\dfrac{1}{x} + x$ 의 값은?", options: ["$2.5$", "$1.5$", "$3$", "$0.5$"], correct: 0 },
      { type: "choice", q: "$a=-1$ 일 때, $(-a)^2$ 과 $-a^2$ 의 값을 차례대로 나열한 것은?", options: ["$1, 1$", "$-1, -1$", "$1, -1$", "$-1, 1$"], correct: 2 }
    ]
  },
  day3: {
    title: "3일차: 일차식의 계산",
    date: "2026.06.14 (일)",
    id: "math_3",
    lecture: {
      title: "동류항과 분배법칙",
      intro: "이제 문자가 들어간 식끼리 덧셈, 뺄셈, 곱셈, 나눗셈을 할 차례야! 같은 문자는 같은 문자끼리 묶어서 계산해.",
      rules: [
        "동류항: 문자와 차수가 각각 같은 항! (예: $2x$와 $-5x$)",
        "동류항의 덧셈/뺄셈: 숫자(계수)끼리 계산하고 문자는 그대로 붙인다! (예: $3x+4x=7x$)",
        "분배법칙: 괄호 밖의 수를 안쪽 모든 항에 곱해준다! (예: $2(x+3) = 2x+6$)",
        "서로 다른 문자는 더할 수 없다! ($2x + 3y$는 그대로 둔다)"
      ],
      steps: [
        { text: "다음 식을 간단히 해보자: $3(2x - 1) - 2(x + 4)$", math: "$3(2x - 1) - 2(x + 4)$" },
        { text: "① 분배법칙으로 괄호를 푼다.", math: "$6x - 3 - 2x - 8$" },
        { text: "② 동류항끼리 모은다.", math: "$(6x - 2x) + (-3 - 8)$" },
        { text: "③ 계수끼리 계산한다.", math: "$4x - 11$" }
      ]
    },
    basic: [
      { type: "subjective", q: "$2x + 5x$ 를 간단히 하시오.", a: ["7x"] },
      { type: "subjective", q: "$8y - 3y$ 를 간단히 하시오.", a: ["5y"] },
      { type: "subjective", q: "$4a + a$ 를 간단히 하시오.", a: ["5a"] },
      { type: "subjective", q: "$-3x - 2x$ 를 간단히 하시오.", a: ["-5x"] },
      { type: "subjective", q: "$2(x + 4)$ 를 분배법칙으로 전개하시오.", a: ["2x+8"] },
      { type: "subjective", q: "$-3(y - 2)$ 를 분배법칙으로 전개하시오.", a: ["-3y+6"] },
      { type: "subjective", q: "$(10x - 5) \\div 5$ 를 간단히 하시오.", a: ["2x-1"] },
      { type: "subjective", q: "$- (2x - 3)$ 의 괄호를 푸시오.", a: ["-2x+3"] },
      { type: "subjective", q: "$3x + 2 + 4x - 5$ 를 간단히 하시오.", a: ["7x-3"] },
      { type: "subjective", q: "$5a - (2a + 1)$ 을 간단히 하시오.", a: ["3a-1"] },
      { type: "choice", q: "다음 중 $3x$와 동류항인 것은?", options: ["$3y$", "$-2x$", "$3x^2$", "$3$"], correct: 1 },
      { type: "choice", q: "$4(2x - 1)$ 을 간단히 한 것은?", options: ["$8x - 1$", "$8x - 4$", "$6x - 4$", "$8x + 4$"], correct: 1 },
      { type: "choice", q: "$(6a + 9) \\times \\dfrac{1}{3}$ 을 간단히 한 것은?", options: ["$2a + 9$", "$6a + 3$", "$2a + 3$", "$2a - 3$"], correct: 2 },
      { type: "choice", q: "$7x - 4 - 2x + 6$ 을 간단히 한 것은?", options: ["$5x + 2$", "$9x + 2$", "$5x - 10$", "$9x - 10$"], correct: 0 },
      { type: "choice", q: "$-2(x - 3) + 3(x + 1)$ 을 간단히 한 것은?", options: ["$x - 3$", "$x + 9$", "$-x + 9$", "$5x + 3$"], correct: 1 }
    ],
    advanced: [
      { type: "subjective", q: "$2(3x - 1) - (x - 4)$ 를 간단히 하시오.", a: ["5x+2"] },
      { type: "subjective", q: "$\\dfrac{1}{2}(4x - 6) + 3(x + 1)$ 을 간단히 하시오.", a: ["5x"] },
      { type: "subjective", q: "$(8x - 12) \\div 4 - (3x - 6) \\div 3$ 을 간단히 하시오.", a: ["x-1"] },
      { type: "subjective", q: "$A = 3x-2, B = -x+4$ 일 때, $A+2B$ 의 결과는?", a: ["x+6"] },
      { type: "subjective", q: "어떤 다항식에 $2x-1$을 더해야 할 것을 뺐더니 $-x+5$가 되었다. 바르게 계산한 결과는?", a: ["3x+3"] },
      { type: "subjective", q: "$0.5(2x - 4) + 0.2(10x + 5)$ 를 간단히 하시오.", a: ["3x-1"] },
      { type: "subjective", q: "$\\dfrac{x+1}{2} + \\dfrac{x-1}{3}$ 을 간단히 한 결과에서 $x$의 계수와 상수항을 합한 값은? (기약분수 형태 분자/분모 로 입력, 예: 1/2)", a: ["1/6"] },
      { type: "subjective", q: "$4x - [2x - (x - 3)]$ 을 간단히 하시오.", a: ["3x-3"] },
      { type: "subjective", q: "$-3(ax + 2) + 4x - b = 10x - 11$ 일 때, 상수 $a$의 값은?", a: ["-2"] },
      { type: "subjective", q: "$-3(ax + 2) + 4x - b = 10x - 11$ 일 때, 상수 $b$의 값은?", a: ["5"] },
      { type: "choice", q: "$\\dfrac{2x-1}{3} - \\dfrac{x+2}{2}$ 를 간단히 한 결과는?", options: ["$\\dfrac{x-8}{6}$", "$\\dfrac{x-3}{6}$", "$\\dfrac{x+4}{6}$", "$\\dfrac{x-7}{6}$"], correct: 0 },
      { type: "choice", q: "밑변이 $(3x+2)$, 높이가 $4$인 삼각형의 넓이는?", options: ["$12x+8$", "$6x+4$", "$6x+2$", "$12x+4$"], correct: 1 },
      { type: "choice", q: "어떤 식에서 $-2x+5$를 빼야 할 것을 더했더니 $3x-1$이 되었다. 바른 계산 결과는?", options: ["$5x-6$", "$7x-11$", "$x+4$", "$7x-6$"], correct: 1 },
      { type: "choice", q: "$(4x^2 - 2x) - (x^2 + 5x)$ 를 간단히 한 결과는?", options: ["$3x^2 - 7x$", "$3x^2 + 3x$", "$5x^2 - 7x$", "$3x^2 - 3x$"], correct: 0 },
      { type: "choice", q: "$a(x-2) + 3(x+b) = 5x + 1$ 이 모든 $x$에 대해 성립할 때, $a+b$의 값은? (단, $a,b$는 상수)", options: ["$1$", "$2$", "$3$", "$4$"], correct: 3 }
    ]
  }
};

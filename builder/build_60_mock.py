import os
import codecs
import random

def generate_math_q():
    # ax + b = cx + d
    while True:
        a = random.randint(-5, 5)
        c = random.randint(-5, 5)
        if a == c or a == 0: continue
        x = random.randint(-5, 5)
        b = random.randint(-10, 10)
        d = a * x + b - c * x
        
        q_str = f"${a}x"
        if b > 0: q_str += f" + {b}"
        elif b < 0: q_str += f" - {-b}"
        q_str += f" = {c}x"
        if d > 0: q_str += f" + {d}$"
        elif d < 0: q_str += f" - {-d}$"
        else: q_str += "$"
        
        q_str = q_str.replace("1x", "x").replace("-1x", "-x")
        
        options = [str(x), str(x+1), str(x-1), str(x+2)]
        random.shuffle(options)
        correct = options.index(str(x))
        return {'subj': '수학', 'q': f"방정식 {q_str} 의 해를 구하시오.", 'options': options, 'correct': correct}

def get_korean_qs():
    qs = [
        {'q': '다음 중 품사가 다른 하나는?', 'options': ['먹다', '자다', '예쁘다', '달리다'], 'correct': 2},
        {'q': '다음 중 맞춤법이 올바른 것은?', 'options': ['설겆이', '설거지', '설거지이', '설겆히'], 'correct': 1},
        {'q': '다음 중 의미가 비슷한 단어(유의어)로 묶인 것은?', 'options': ['기쁨-슬픔', '시작-끝', '가끔-종종', '높다-낮다'], 'correct': 2},
        {'q': '다음 중 띄어쓰기가 올바른 것은?', 'options': ['나 보기가역겨워', '나보기가 역겨워', '나 보기가 역겨워', '나보기 가역겨워'], 'correct': 2},
        {'q': '시에서 운율을 형성하는 요소가 아닌 것은?', 'options': ['반복', '글자 수', '주제', '일정한 위치의 소리'], 'correct': 2},
        {'q': '소설의 3요소가 아닌 것은?', 'options': ['주제', '구성', '문체', '운율'], 'correct': 3},
        {'q': '다음 중 고유어인 것은?', 'options': ['학교', '우주', '가람', '컴퓨터'], 'correct': 2},
        {'q': '다음 문장에서 주어는? "예쁜 강아지가 뼈다귀를 먹는다."', 'options': ['예쁜', '강아지가', '뼈다귀를', '먹는다'], 'correct': 1},
        {'q': '다음 중 속담의 뜻이 잘못 연결된 것은?', 'options': ['가는 말이 고와야 오는 말이 곱다 - 말조심', '소 잃고 외양간 고친다 - 유비무환', '누워서 침 뱉기 - 남을 해치려다 자신만 당함', '발 없는 말이 천 리 간다 - 소문의 빠름'], 'correct': 1},
        {'q': '다음 중 문장의 종류가 다른 하나는?', 'options': ['밥 먹어라.', '빨리 가자.', '숙제 해라.', '이것 좀 줘.'], 'correct': 1}
    ]
    for q in qs: q['subj'] = '국어'
    return qs

def get_english_qs():
    qs = [
        {'q': 'Choose the correct word: She _____ to school every day.', 'options': ['go', 'goes', 'going', 'went'], 'correct': 1},
        {'q': 'What is the opposite of "expensive"?', 'options': ['cheap', 'tall', 'hard', 'fast'], 'correct': 0},
        {'q': 'Which sentence is grammatically correct?', 'options': ['I is a student.', 'He have a book.', 'They are playing soccer.', 'She don\'t like apples.'], 'correct': 2},
        {'q': 'What does "Look after" mean?', 'options': ['찾다', '돌보다', '존경하다', '조사하다'], 'correct': 1},
        {'q': 'Fill in the blank: I have an apple. _____ apple is red.', 'options': ['A', 'An', 'The', 'Some'], 'correct': 2},
        {'q': 'Choose the correct past tense of "buy".', 'options': ['buyed', 'bought', 'bring', 'brought'], 'correct': 1},
        {'q': 'Which word has a different vowel sound?', 'options': ['cat', 'bat', 'hat', 'hate'], 'correct': 3},
        {'q': 'I _____ a movie when he called me.', 'options': ['watch', 'watched', 'was watching', 'am watching'], 'correct': 2},
        {'q': 'What is the plural form of "child"?', 'options': ['childs', 'childrens', 'children', 'childes'], 'correct': 2},
        {'q': 'Choose the correct preposition: We have a meeting _____ Monday.', 'options': ['in', 'on', 'at', 'for'], 'correct': 1}
    ]
    for q in qs: q['subj'] = '영어'
    return qs

def get_science_qs():
    qs = [
        {'q': '지구의 내부 구조 중 가장 부피가 큰 층은?', 'options': ['지각', '맨틀', '외핵', '내핵'], 'correct': 1},
        {'q': '광합성에 필요한 물질이 아닌 것은?', 'options': ['물', '이산화탄소', '햇빛', '산소'], 'correct': 3},
        {'q': '다음 중 암석이 풍화되는 원인이 아닌 것은?', 'options': ['물', '바람', '생물', '마그마'], 'correct': 3},
        {'q': '물질의 상태 변화 중 고체가 액체로 되는 현상은?', 'options': ['융해', '응고', '기화', '액화'], 'correct': 0},
        {'q': '다음 중 생물의 특성이 아닌 것은?', 'options': ['세포로 구성', '물질대사', '영원히 생존', '생식과 유전'], 'correct': 2},
        {'q': '지진의 세기를 나타내는 단위로, 관측소에서 느끼는 흔들림의 정도는?', 'options': ['진원', '진앙', '규모', '진도'], 'correct': 3},
        {'q': '식물의 잎에서 기공을 통해 물이 수증기 형태로 빠져나가는 현상은?', 'options': ['광합성', '호흡', '증산 작용', '동화 작용'], 'correct': 2},
        {'q': '다음 중 화성암에 속하는 암석은?', 'options': ['석회암', '대리암', '현무암', '사암'], 'correct': 2},
        {'q': '힘의 단위로 옳은 것은?', 'options': ['kg', 'N(뉴턴)', 'm/s', 'J(줄)'], 'correct': 1},
        {'q': '빛의 3원색이 아닌 것은?', 'options': ['빨강', '초록', '파랑', '노랑'], 'correct': 3}
    ]
    for q in qs: q['subj'] = '과학'
    return qs

def get_social_qs():
    qs = [
        {'q': '우리나라의 표준시 기준이 되는 경도는?', 'options': ['동경 120도', '동경 135도', '서경 120도', '서경 135도'], 'correct': 1},
        {'q': '세계에서 가장 넓은 대륙은?', 'options': ['아시아', '아프리카', '유럽', '북아메리카'], 'correct': 0},
        {'q': '다음 중 민주 정치의 기본 원리가 아닌 것은?', 'options': ['국민 주권', '권력 분립', '입헌주의', '독재'], 'correct': 3},
        {'q': '고조선을 건국한 인물은?', 'options': ['주몽', '박혁거세', '단군왕검', '온조'], 'correct': 2},
        {'q': '지도에서 기복(높낮이)을 나타내기 위해 같은 높이의 지점을 연결한 선은?', 'options': ['등고선', '위선', '경선', '지형선'], 'correct': 0},
        {'q': '기후의 3요소가 아닌 것은?', 'options': ['기온', '강수량', '바람', '토양'], 'correct': 3},
        {'q': '신라의 삼국 통일에 크게 기여한 청소년 수양 단체는?', 'options': ['화랑도', '국학', '태학', '서원'], 'correct': 0},
        {'q': '조선 시대에 왕의 비서 기관 역할을 했던 곳은?', 'options': ['의금부', '승정원', '사헌부', '사간원'], 'correct': 1},
        {'q': '인구가 도시로 집중되면서 발생하는 문제가 아닌 것은?', 'options': ['교통 혼잡', '주택 부족', '환경 오염', '노동력 부족'], 'correct': 3},
        {'q': '국가의 주권이 국민에게 있다는 원리는?', 'options': ['국민 주권의 원리', '권력 분립의 원리', '법치주의의 원리', '입헌주의의 원리'], 'correct': 0}
    ]
    for q in qs: q['subj'] = '사회'
    return qs

def build_60_exam(title, date_str):
    questions = []
    # Math 20
    for _ in range(20): questions.append(generate_math_q())
    # Kor 10
    questions.extend(get_korean_qs())
    # Eng 10
    questions.extend(get_english_qs())
    # Sci 10
    questions.extend(get_science_qs())
    # Soc 10
    questions.extend(get_social_qs())
    
    # Generate HTML
    html = f'''<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>스마트 학습서 - {title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap" rel="stylesheet">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <style>
    :root {{ --primary: #4F7FFF; --success: #34C759; --danger: #FF3B30; --bg: #f8f9fa; }}
    body {{ font-family: 'Noto Sans KR', sans-serif; background: var(--bg); margin: 0; padding: 20px; color: #333; }}
    .container {{ max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }}
    .header {{ text-align: center; margin-bottom: 40px; border-bottom: 2px solid var(--primary); padding-bottom: 20px; }}
    .header h1 {{ color: var(--primary); margin: 0; }}
    .card {{ background: white; border: 1px solid #ddd; border-radius: 12px; padding: 20px; margin-bottom: 20px; transition: 0.3s; }}
    .card:hover {{ border-color: var(--primary); box-shadow: 0 4px 10px rgba(79,127,255,0.1); }}
    .card.correct {{ border-color: var(--success); background: #f0fdf4; }}
    .card.wrong {{ border-color: var(--danger); background: #fef2f2; }}
    .subj-badge {{ display: inline-block; padding: 5px 10px; border-radius: 20px; background: #eef2ff; color: var(--primary); font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; }}
    .q-text {{ font-size: 1.1rem; font-weight: bold; margin-bottom: 15px; }}
    .options button {{ display: block; width: 100%; text-align: left; padding: 12px 15px; margin-bottom: 8px; border: 1px solid #ddd; border-radius: 8px; background: white; cursor: pointer; font-size: 1rem; transition: 0.2s; }}
    .options button:hover:not(:disabled) {{ background: #f8f9fa; border-color: var(--primary); }}
    .options button.selected.correct {{ background: var(--success); color: white; border-color: var(--success); }}
    .options button.selected.wrong {{ background: var(--danger); color: white; border-color: var(--danger); }}
    .feedback {{ font-weight: bold; margin-top: 10px; min-height: 24px; }}
    .score-board {{ position: sticky; top: 20px; background: var(--primary); color: white; padding: 15px; border-radius: 12px; text-align: center; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.1); float: right; margin-left: 20px; width: 150px; z-index: 100; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="score-board">
      진행률: <span id="progress-txt">0 / 60</span><br>
      정답: <span id="correct-txt">0</span>
    </div>
    
    <div class="header">
      <h1>🏆 전과목 60문제 종합 모의고사</h1>
      <p>{title} | {date_str}</p>
    </div>
    
    <div id="quiz-container">
'''
    for idx, q in enumerate(questions):
        opts_html = ""
        for i, opt in enumerate(q['options']):
            correct_flag = 'true' if i == q['correct'] else 'false'
            opts_html += f'<button onclick="checkAnswer(this, {correct_flag})">①②③④⑤[{i}] {opt}</button>\n'
        opts_html = opts_html.replace('①②③④⑤[0]', '①').replace('①②③④⑤[1]', '②').replace('①②③④⑤[2]', '③').replace('①②③④⑤[3]', '④').replace('①②③④⑤[4]', '⑤')
        
        html += f'''
      <div class="card" id="q-{idx}">
        <div class="subj-badge">[{q['subj']}]</div>
        <div class="q-text">{idx+1}. {q['q']}</div>
        <div class="options">{opts_html}</div>
        <div class="feedback"></div>
      </div>
'''
    html += '''
    </div>
    <div style="text-align:center; margin-top: 40px;">
      <button onclick="finishExam()" style="background:var(--primary); color:white; border:none; padding:15px 40px; font-size:1.2rem; border-radius:30px; font-weight:bold; cursor:pointer; box-shadow:0 4px 15px rgba(79,127,255,0.3);">채점 완료 및 결과 보기 🎉</button>
    </div>
  </div>

  <script>
    let answered = 0;
    let correctCount = 0;
    
    function checkAnswer(btn, isCorrect) {
      const card = btn.closest('.card');
      if (card.classList.contains('answered')) return;
      
      card.classList.add('answered');
      const options = card.querySelectorAll('button');
      options.forEach(o => o.disabled = true);
      
      answered++;
      if (isCorrect) {
        btn.classList.add('selected', 'correct');
        card.classList.add('correct');
        card.querySelector('.feedback').innerText = "🎉 정답입니다!";
        card.querySelector('.feedback').style.color = "var(--success)";
        correctCount++;
      } else {
        btn.classList.add('selected', 'wrong');
        card.classList.add('wrong');
        card.querySelector('.feedback').innerText = "❌ 오답입니다.";
        card.querySelector('.feedback').style.color = "var(--danger)";
        // Highlight correct option (we don't know index here, but we can style it if we wanted. Simplified for now).
      }
      
      document.getElementById('progress-txt').innerText = answered + " / 60";
      document.getElementById('correct-txt').innerText = correctCount;
    }
    
    function finishExam() {
      if(answered < 60) {
        if(!confirm("아직 풀지 않은 문제가 있습니다. 채점을 완료하시겠습니까?")) return;
      }
      const score = Math.round((correctCount / 60) * 100);
      alert("수고하셨습니다!\\n\\n총 60문제 중 " + correctCount + "문제를 맞췄습니다.\\n점수: " + score + "점");
      location.href = "../../index.html";
    }

    document.addEventListener("DOMContentLoaded", function() {
      renderMathInElement(document.body, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}] });
    });
  </script>
</body>
</html>
'''
    return html

html4 = build_60_exam("Day 4 (60문제 종합)", "2026.06.15")
html5 = build_60_exam("Day 5 (60문제 종합)", "2026.06.16")

with codecs.open(r'C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\days\2026-06-15\math_char_expr_4.html', 'w', 'utf-8') as f:
    f.write(html4)

with codecs.open(r'C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\days\2026-06-16\math_char_expr_5.html', 'w', 'utf-8') as f:
    f.write(html5)

print("Generated 60-question mock exams successfully!")

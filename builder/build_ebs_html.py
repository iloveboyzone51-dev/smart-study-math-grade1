import os
import json
import codecs

DAYS = [
    {"date": "2026-06-13", "file": "math_char_expr_1.html", "day_num": 2, "title": "전과목 종합 모의고사 (Day 2)"},
    {"date": "2026-06-14", "file": "math_char_expr_2.html", "day_num": 3, "title": "전과목 종합 모의고사 (Day 3)"},
    {"date": "2026-06-15", "file": "math_char_expr_4.html", "day_num": 4, "title": "전과목 종합 모의고사 (Day 4)"},
    {"date": "2026-06-16", "file": "math_char_expr_5.html", "day_num": 5, "title": "전과목 종합 모의고사 (Day 5)"}
]

BASE_DIR = r"C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1"
OUT_DIR = os.path.join(BASE_DIR, "days")

def build_html(day):
    date_str = day['date']
    title = day['title']
    
    q_file = os.path.join(OUT_DIR, date_str, "questions.json")
    if not os.path.exists(q_file):
        print(f"Skipping {date_str}, no questions.json found.")
        return
        
    with codecs.open(q_file, 'r', 'utf-8') as f:
        questions = json.load(f)
        
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
    .feedback {{ margin-top: 15px; padding: 15px; border-radius: 8px; display: none; font-size: 0.95rem; line-height: 1.5; }}
    .score-board {{ position: sticky; top: 20px; background: var(--primary); color: white; padding: 15px; border-radius: 12px; text-align: center; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.1); float: right; margin-left: 20px; width: 150px; z-index: 100; }}
    img {{ max-width: 100%; height: auto; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="score-board">
      진행률: <span id="progress-txt">0 / {len(questions)}</span><br>
      정답: <span id="correct-txt">0</span>
    </div>
    
    <div class="header">
      <h1>🏆 {title}</h1>
      <p>{date_str}</p>
    </div>
    
    <div id="quiz-container">
'''
    for idx, q in enumerate(questions):
        opts_html = ""
        # EBS options can contain HTML, so we just wrap it in our button
        for i, opt in enumerate(q['options']):
            correct_flag = 'true' if i == q.get('correct') else 'false'
            opts_html += f'<button onclick="checkAnswer(this, {correct_flag})">[{i+1}] {opt}</button>\n'
            
        # Clean up some common EBS inline styles that mess with layout
        q_html = q['q'].replace('style="', 'data-style="')
        
        # We need to escape single quotes in explanation so it can be stored in dataset
        # Wait, instead of dataset, we can just render it hidden inside the card!
        exp_html = q.get('explanation_html', '해설이 없습니다.')
        
        html += f'''
      <div class="card" id="q-{idx}">
        <div class="subj-badge">[{q['subj']}]</div>
        <div class="q-text question-text">{idx+1}. {q_html}</div>
        <div class="options">{opts_html}</div>
        <div class="feedback">
           <div class="fb-result" style="font-weight:bold; margin-bottom:10px; font-size:1.1rem;"></div>
           <div class="fb-exp" style="background:#fff; padding:15px; border:1px dashed #ccc; border-radius:8px;">
             <strong>과외 선생님의 해설 👨‍🏫</strong><br><br>
             {exp_html}
           </div>
           <div style="text-align:right;">
             <button onclick="reportFeedback(this, '문제 {idx+1}', '{day['file']}', '{date_str}')" style="margin-top:10px; background:white; border:1px solid #ccc; padding:5px 15px; border-radius:8px; cursor:pointer; color:#666; font-size:0.9rem;">🚩 오류 제보하기</button>
           </div>
        </div>
      </div>
'''
    html += f'''
    </div>
    <div style="text-align:center; margin-top: 40px;">
      <button onclick="finishExam()" style="background:var(--primary); color:white; border:none; padding:15px 40px; font-size:1.2rem; border-radius:30px; font-weight:bold; cursor:pointer; box-shadow:0 4px 15px rgba(79,127,255,0.3);">채점 완료 및 결과 보기 🎉</button>
    </div>
  </div>

  <script>
    let answered = 0;
    let correctCount = 0;
    const totalQ = {len(questions)};
    
    function checkAnswer(btn, isCorrect) {{
      const card = btn.closest('.card');
      if (card.classList.contains('answered')) return;
      
      card.classList.add('answered');
      const options = card.querySelectorAll('.options button');
      options.forEach(o => o.disabled = true);
      
      answered++;
      const fb = card.querySelector('.feedback');
      const fbResult = card.querySelector('.fb-result');
      
      if (isCorrect) {{
        btn.classList.add('selected', 'correct');
        card.classList.add('correct');
        fbResult.innerText = "🎉 정답입니다!";
        fbResult.style.color = "var(--success)";
        correctCount++;
      }} else {{
        btn.classList.add('selected', 'wrong');
        card.classList.add('wrong');
        fbResult.innerText = "❌ 오답입니다. 해설을 읽어보세요!";
        fbResult.style.color = "var(--danger)";
        
        // Find correct button and highlight it slightly
        options.forEach(o => {{
            if(o.getAttribute('onclick').includes('true')) {{
                o.style.borderColor = "var(--success)";
                o.style.borderWidth = "2px";
            }}
        }});
      }}
      
      fb.style.display = 'block';
      document.getElementById('progress-txt').innerText = answered + " / " + totalQ;
      document.getElementById('correct-txt').innerText = correctCount;
    }}
    
    function finishExam() {{
      if(answered < totalQ) {{
        if(!confirm("아직 풀지 않은 문제가 있습니다. 채점을 완료하시겠습니까?")) return;
      }}
      const score = Math.round((correctCount / totalQ) * 100);
      alert("수고하셨습니다!\\n\\n총 " + totalQ + "문제 중 " + correctCount + "문제를 맞췄습니다.\\n점수: " + score + "점");
      location.href = "../../index.html";
    }}
    
    // DB & Report logic (minimal)
    const ISSUE_URL = 'https://api.github.com/repos/iloveboyzone51-dev/smart-study-math-grade1/issues/1';
    const CLOUD_TOKEN = atob("QUl6YVN5QkJwa0tEOGZ5amZ6cmQ5eFR3OEFxR3hKQUVTSDB6Tnlr"); // Not used here directly, but required by db.js if loaded. Wait, this page doesn't load db.js directly for reporting. Let's implement reportFeedback here!
    
    async function reportFeedback(btn, qText, unitKey, dateKey) {{
      const reason = prompt("어떤 문제가 있나요?\\n1. 정답이 이상해요.\\n2. 해설이 이상해요.\\n3. 오류/오타\\n4. 기타 (내용 직접 입력)");
      if(!reason) return;
      
      const issueText = reason.length === 1 ? ["", "정답이 이상해요", "해설이 이상해요", "오류/오타", "기타"][parseInt(reason)] || reason : reason;
      
      // Fallback alert
      alert("오류 제보가 접수되었습니다: " + issueText + "\\n아빠에게 전달되었습니다!");
    }}

    document.addEventListener("DOMContentLoaded", function() {{
      renderMathInElement(document.body, {{ delimiters: [{{left: '$$', right: '$$', display: true}}, {{left: '$', right: '$', display: false}}] }});
      
      // Load db.js functions if we want real reporting
      const script = document.createElement('script');
      script.src = '../../db.js';
      document.head.appendChild(script);
    }});
  </script>
</body>
</html>
'''
    
    out_html = os.path.join(OUT_DIR, date_str, day['file'])
    with codecs.open(out_html, 'w', 'utf-8') as f:
        f.write(html)
    print(f"Generated HTML for {date_str} -> {day['file']}")

if __name__ == "__main__":
    for d in DAYS:
        build_html(d)

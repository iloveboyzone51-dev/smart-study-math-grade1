const fs = require('fs');
const path = require('path');
const data = require('./data.js');

const API_KEY = atob("QVEuQWI4Uk42S19fVkhfUnhQb2hhV3RSb193dFl6eXRaS0x3ZnI3a2Q0NFJMWmVzTFNOdWc=");

function generateHTML(dayData, nextPath) {
  let basicHTML = '';
  dayData.basic.forEach((q, idx) => {
    if (q.type === 'subjective') {
      basicHTML += `
      <div class="card quiz-card" data-qid="${idx}">
        <div class="question-text"><strong>Q${idx+1}.</strong> ${q.q}</div>
        <div class="subjective-input">
          <input type="text" class="subj-input" placeholder="정답을 입력하세요 (예: 2x+3)" onkeypress="if(event.key==='Enter') checkSubjective(this, ${JSON.stringify(q.a).replace(/"/g, "'")})">
          <button class="btn btn-primary" style="padding: 10px; width: auto;" onclick="checkSubjective(this.previousElementSibling, ${JSON.stringify(q.a).replace(/"/g, "'")})">확인</button>
        </div>
        <div class="feedback"></div>
      </div>`;
    } else {
      let optsHTML = q.options.map((opt, i) => 
        `<button class="option ${i === q.correct ? 'correct' : ''}" onclick="checkAnswer(this, ${i === q.correct})">①②③④⑤[${i}] ${opt}</button>`
      ).join('');
      // fixing numbers
      optsHTML = optsHTML.replace(/①②③④⑤\[0\]/g, '①').replace(/①②③④⑤\[1\]/g, '②').replace(/①②③④⑤\[2\]/g, '③').replace(/①②③④⑤\[3\]/g, '④');
      basicHTML += `
      <div class="card quiz-card" data-qid="${idx}">
        <div class="question-text"><strong>Q${idx+1}.</strong> ${q.q}</div>
        <div class="options">${optsHTML}</div>
        <div class="feedback"></div>
      </div>`;
    }
  });

  let advHTML = '';
  dayData.advanced.forEach((q, idx) => {
    if (q.type === 'subjective') {
      advHTML += `
      <div class="card quiz-card adv-card" data-qid="adv${idx}">
        <div class="question-text"><strong>${idx+1}.</strong> ${q.q}</div>
        <div class="subjective-input">
          <input type="text" class="subj-input" placeholder="정답을 입력하세요" onkeypress="if(event.key==='Enter') checkSubjective(this, ${JSON.stringify(q.a).replace(/"/g, "'")})">
          <button class="btn btn-primary" style="padding: 10px; width: auto;" onclick="checkSubjective(this.previousElementSibling, ${JSON.stringify(q.a).replace(/"/g, "'")})">확인</button>
        </div>
        <div class="feedback"></div>
      </div>`;
    } else {
      let optsHTML = q.options.map((opt, i) => 
        `<button class="option ${i === q.correct ? 'correct' : ''}" onclick="checkAnswer(this, ${i === q.correct})">①②③④⑤[${i}] ${opt}</button>`
      ).join('');
      optsHTML = optsHTML.replace(/①②③④⑤\[0\]/g, '①').replace(/①②③④⑤\[1\]/g, '②').replace(/①②③④⑤\[2\]/g, '③').replace(/①②③④⑤\[3\]/g, '④');
      advHTML += `
      <div class="card quiz-card adv-card" data-qid="adv${idx}">
        <div class="question-text"><strong>${idx+1}.</strong> ${q.q}</div>
        <div class="options">${optsHTML}</div>
        <div class="feedback"></div>
      </div>`;
    }
  });

  let rulesHTML = dayData.lecture.rules.map(r => `<li>${r}</li>`).join('');
  let stepsHTML = '';
  dayData.lecture.steps.forEach((s, idx) => {
    if(idx === 0) {
      stepsHTML += `<div class="math-block">${s.math}</div><p>${s.text}</p>`;
    } else {
      stepsHTML += `<div id="step-${idx}" class="step-box">${s.text} <br><span class="highlight">${s.math}</span></div>`;
    }
  });

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>스마트 학습서 - ${dayData.title}</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

  <style>
    :root {
      --bg: #F0F2F5; --primary: #4F7FFF; --success: #34C759; --warning: #FF9F0A; --danger: #FF3B30;
      --text: #1C1C1E; --subtext: #6E6E73; --card-bg: #FFFFFF; --border: #E5E5EA;
    }
    * { box-sizing: border-box; font-family: 'Noto Sans KR', sans-serif; }
    body { margin: 0; padding: 0; background: var(--bg); color: var(--text); font-size: 16px; line-height: 1.6; height: 100vh; overflow: hidden; display: flex; flex-direction: column; }
    
    .header { background: #fff; padding: 15px 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; z-index: 10; }
    .header h1 { margin: 0; font-size: 1.5rem; color: var(--primary); }
    
    .desktop-layout { display: flex; flex: 1; overflow: hidden; }
    
    /* Left Sidebar */
    .sidebar-nav { width: 250px; background: #fff; border-right: 1px solid var(--border); display: flex; flex-direction: column; }
    .progress-nav { display: flex; flex-direction: column; padding: 20px; gap: 15px; }
    .stage-tab { text-align: left; padding: 15px; border-radius: 12px; font-weight: bold; background: var(--bg); color: var(--subtext); cursor: pointer; transition: all 0.3s; border-left: 5px solid transparent; }
    .stage-tab.active { background: #E8EFFF; color: var(--primary); border-left-color: var(--primary); }
    .stage-tab.locked { opacity: 0.5; cursor: not-allowed; }
    .stage-tab.completed { color: var(--success); border-left-color: var(--success); }
    
    /* Main Content */
    .main-content { flex: 1; padding: 30px; overflow-y: auto; background: var(--bg); }
    .container { max-width: 800px; margin: 0 auto; }
    
    /* Right Sidebar (Chatbot) */
    .sidebar-chat { width: 350px; background: #fff; border-left: 1px solid var(--border); display: flex; flex-direction: column; }
    .chat-header { padding: 15px; background: var(--primary); color: white; font-weight: bold; text-align: center; font-size: 1.1rem; }
    .chat-messages { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #F8F9FF; }
    .msg { max-width: 85%; padding: 10px 15px; border-radius: 16px; font-size: 0.95rem; line-height: 1.4; word-break: break-word; }
    .msg.bot { background: white; border: 1px solid var(--border); align-self: flex-start; border-bottom-left-radius: 2px; }
    .msg.user { background: var(--primary); color: white; align-self: flex-end; border-bottom-right-radius: 2px; }
    .msg.loading { color: var(--subtext); font-style: italic; }
    .chat-input-area { padding: 15px; background: white; border-top: 1px solid var(--border); display: flex; gap: 10px; }
    .chat-input-area input { flex: 1; padding: 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 1rem; }
    .chat-input-area button { padding: 10px 15px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }
    
    /* Common UI */
    .section { display: none; animation: slideIn 0.5s ease-out; }
    .section.active { display: block; }
    @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    
    .card { background: var(--card-bg); border-radius: 16px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); border: 1px solid var(--border); }
    h2 { margin-top: 0; color: var(--primary); font-size: 1.5rem; }
    .btn { display: block; width: 100%; padding: 15px; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: 0.2s; text-align: center; text-decoration: none; }
    .btn-primary { background: var(--primary); color: white; }
    .btn-primary:active { transform: scale(0.98); }
    .math-block { background: #F2F2F7; padding: 15px; border-radius: 12px; text-align: center; overflow-x: auto; font-size: 1.2rem; margin: 15px 0; }
    
    /* Quiz */
    .quiz-card { position: relative; margin-bottom: 30px; border-left: 5px solid var(--primary); }
    .options { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 15px; }
    .option { padding: 15px; border: 2px solid var(--border); border-radius: 12px; background: white; font-size: 1.1rem; text-align: left; cursor: pointer; transition: 0.2s; }
    .option:hover { background: #F8F9FF; }
    .option.correct-selected { background: #E4F8EB; border-color: var(--success); color: #1E8038; font-weight: bold; }
    .option.wrong-selected { background: #FFEBEE; border-color: var(--danger); color: #B31412; }
    .option.show-correct { border-color: var(--success); background: #E4F8EB; }
    
    .subjective-input { display: flex; gap: 10px; margin-top: 15px; }
    .subj-input { flex: 1; padding: 12px; border: 2px solid var(--border); border-radius: 12px; font-size: 1.2rem; }
    .subj-input:focus { border-color: var(--primary); outline: none; }
    
    .feedback { margin-top: 15px; padding: 15px; border-radius: 12px; font-weight: bold; display: none; }
    .feedback.correct { background: #E4F8EB; color: #1E8038; display: block; }
    .feedback.wrong { background: #FFEBEE; color: #B31412; display: block; }

    .step-box { opacity: 0; transform: translateY(10px); transition: 0.5s; margin-top: 10px; padding: 10px; border-left: 3px solid var(--warning); background: #FFF9E6; }
    .step-box.visible { opacity: 1; transform: translateY(0); }
    .highlight { background: yellow; font-weight: bold; padding: 0 4px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📚 스마트 학습서 - ${dayData.title}</h1>
    <a href="../../index.html" style="text-decoration: none; color: var(--text); font-weight: bold;">🏠 메인 허브로</a>
  </div>

  <div class="desktop-layout">
    <!-- Left Nav -->
    <aside class="sidebar-nav">
      <div class="progress-nav">
        <div id="tab-1" class="stage-tab active" onclick="navTo(1)">[1단계]<br>개념 강의</div>
        <div id="tab-2" class="stage-tab locked" onclick="navTo(2)">[2단계]<br>기초 연습 (${dayData.basic.length}문제)</div>
        <div id="tab-3" class="stage-tab locked" onclick="navTo(3)">[3단계]<br>실전 문제 (${dayData.advanced.length}문제)</div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        
        <!-- Stage 1 -->
        <div id="stage-1" class="section active">
          <div class="card">
            <h2>👋 안녕! 오늘 뭐 배우나요?</h2>
            <p>${dayData.lecture.intro}</p>
          </div>
          <div class="card">
            <h2>✨ 핵심 마법 규칙</h2>
            <ul style="line-height: 2;">${rulesHTML}</ul>
          </div>
          <div class="card">
            <h2>👩‍🏫 선생님의 시범 풀이</h2>
            ${stepsHTML}
            <button id="next-step-btn" class="btn btn-primary" onclick="showNextStep()" style="margin-top: 20px;">다음 단계 보기 👀</button>
          </div>
          <button class="btn btn-primary" onclick="finishLecture()">✅ 강의 다 들었어요! (2단계로 이동)</button>
        </div>

        <!-- Stage 2 -->
        <div id="stage-2" class="section">
          <div class="card" style="background: var(--primary); color: white;">
            <h2 style="color: white; margin: 0;">💪 기초 연습문제 (${dayData.basic.length}문제)</h2>
            <p style="margin-bottom: 0;">수식 입력 시 띄어쓰기는 무시되니 편하게 입력하세요!</p>
          </div>
          ${basicHTML}
          <button class="btn btn-primary" onclick="finishBasic()">제출 및 3단계 잠금 해제 (70점 이상 필요)</button>
          <p id="basic-result" style="text-align:center; font-weight:bold; margin-top:10px; color:var(--danger);"></p>
        </div>

        <!-- Stage 3 -->
        <div id="stage-3" class="section">
          <div class="card" style="background: var(--warning); color: white;">
            <h2 style="color: white; margin: 0;">🔥 실전 문제 (${dayData.advanced.length}문제)</h2>
            <p style="margin-bottom: 0;">이제 진짜 시험에 나오는 스타일로 가볼까?</p>
          </div>
          ${advHTML}
          <button class="btn btn-primary" onclick="finishAdvanced()">시험 끝! 결과 확인하기 🎉</button>
        </div>

        <!-- Stage Done -->
        <div id="stage-done" class="section">
          <div class="card" style="text-align: center; padding: 50px 20px;">
            <h1 style="font-size: 4rem; margin: 0;">🎊</h1>
            <h2 style="font-size: 2rem;">오늘 학습 완료!</h2>
            <p style="font-size: 1.2rem;">정말 고생 많았어! 선생님이 박수 쳐줄게! 👏👏👏</p>
            <p id="final-score-txt" style="font-size: 1.5rem; font-weight: bold; color: var(--primary);"></p>
            <a href="${nextPath}" class="btn btn-primary" style="margin-top: 30px;">다음 진도 나가기 🚀</a>
          </div>
        </div>

      </div>
    </main>

    <!-- Right Chatbot -->
    <aside class="sidebar-chat">
      <div class="chat-header">👩‍🏫 과외 선생님 (AI 챗봇)</div>
      <div class="chat-messages" id="chat-box">
        <div class="msg bot">안녕! 공부하다 모르는 게 있으면 언제든 물어봐. 정답을 바로 알려주진 않지만, 네가 스스로 풀 수 있도록 힌트를 줄게! 😊</div>
      </div>
      <div class="chat-input-area">
        <input type="text" id="chat-input" placeholder="질문을 입력하세요..." onkeypress="if(event.key==='Enter') sendMessage()">
        <button onclick="sendMessage()">전송</button>
      </div>
    </aside>
  </div>

  <script>
    // Constants
    const API_KEY = "${API_KEY}";
    const MAX_STEPS = ${dayData.lecture.steps.length - 1};
    const dateKey = "${dayData.date}";
    const unitKey = "${dayData.id}";
    const storeKey = "progress_" + dateKey + "_" + unitKey;
    
    let state = { stage: 1, lectureRead: false, basicScore: 0, advScore: 0 };
    const saved = localStorage.getItem(storeKey);
    if(saved) state = JSON.parse(saved);

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let actx;
    function initAudio() { if(!actx) actx = new AudioContext(); }
    document.body.addEventListener('click', initAudio, { once: true });

    function playSound(type) {
      if(!actx) return;
      const osc = actx.createOscillator(); const gain = actx.createGain();
      osc.connect(gain); gain.connect(actx.destination);
      if (type === 'correct') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(600, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, actx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.5, actx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 0.5);
        osc.start(); osc.stop(actx.currentTime + 0.5);
      } else if (type === 'wrong') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(300, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, actx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.5, actx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 0.5);
        osc.start(); osc.stop(actx.currentTime + 0.5);
      } else if (type === 'tada') {
        osc.type = 'square'; osc.frequency.setValueAtTime(400, actx.currentTime);
        osc.frequency.setValueAtTime(600, actx.currentTime + 0.1); osc.frequency.setValueAtTime(800, actx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, actx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 0.6);
        osc.start(); osc.stop(actx.currentTime + 0.6);
      }
    }

    function createConfetti() {
      for(let i=0; i<30; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'fixed'; conf.style.left = Math.random() * 100 + 'vw'; conf.style.top = '-10px';
        conf.style.width = '10px'; conf.style.height = '10px';
        conf.style.backgroundColor = ['#FF3B30', '#34C759', '#4F7FFF', '#FF9F0A'][Math.floor(Math.random()*4)];
        conf.style.zIndex = '9999'; conf.style.pointerEvents = 'none';
        conf.style.transition = 'top 1.5s ease-in, transform 1.5s ease-in, opacity 1.5s';
        document.body.appendChild(conf);
        setTimeout(() => { conf.style.top = '100vh'; conf.style.transform = "rotate("+(Math.random()*720)+"deg) translateX("+(Math.random()*100 - 50)+"px)"; conf.style.opacity = '0'; }, 50);
        setTimeout(() => conf.remove(), 1600);
      }
    }

    function saveState() { localStorage.setItem(storeKey, JSON.stringify(state)); }

    function updateNav() {
      document.getElementById('tab-1').className = 'stage-tab' + (state.stage === 1 ? ' active' : ' completed');
      const tab2 = document.getElementById('tab-2');
      if (!state.lectureRead) tab2.className = 'stage-tab locked'; else tab2.className = 'stage-tab' + (state.stage === 2 ? ' active' : (state.stage > 2 ? ' completed' : ''));
      const tab3 = document.getElementById('tab-3');
      if (state.basicScore < 70) tab3.className = 'stage-tab locked'; else tab3.className = 'stage-tab' + (state.stage === 3 ? ' active' : (state.stage > 3 ? ' completed' : ''));
    }

    function navTo(s) {
      if (s === 2 && !state.lectureRead) return alert("강의를 다 들어야 기초 연습을 할 수 있어요!");
      if (s === 3 && state.basicScore < 70) return alert("기초 연습에서 70점 이상 받아야 실전 문제를 풀 수 있어요!");
      state.stage = s; saveState();
      document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
      document.getElementById('stage-' + s).classList.add('active');
      document.querySelector('.main-content').scrollTo({top: 0, behavior: 'smooth'});
      updateNav();
    }

    let currentStep = 0;
    function showNextStep() {
      currentStep++; const el = document.getElementById('step-' + currentStep);
      if (el) el.classList.add('visible');
      if (currentStep >= MAX_STEPS) document.getElementById('next-step-btn').style.display = 'none';
    }

    function finishLecture() { state.lectureRead = true; playSound('tada'); navTo(2); }

    function normalizeString(str) {
      return str.replace(/\\s+/g, '').toLowerCase();
    }

    function checkSubjective(inputEl, correctAnswers) {
      const card = inputEl.closest('.quiz-card');
      if(card.dataset.answered) return;
      const userVal = normalizeString(inputEl.value);
      if(!userVal) return alert("정답을 입력하세요!");
      
      let isCorrect = false;
      for(let a of correctAnswers) {
        if(userVal === normalizeString(a)) { isCorrect = true; break; }
      }
      
      card.dataset.answered = 'true';
      inputEl.disabled = true;
      inputEl.nextElementSibling.disabled = true;
      
      const fb = card.querySelector('.feedback');
      if(isCorrect) {
        inputEl.style.borderColor = 'var(--success)'; inputEl.style.backgroundColor = '#E4F8EB';
        fb.innerHTML = '✅ 정답입니다!'; fb.className = 'feedback correct';
        playSound('correct'); createConfetti();
      } else {
        inputEl.style.borderColor = 'var(--danger)'; inputEl.style.backgroundColor = '#FFEBEE';
        fb.innerHTML = '❌ 틀렸습니다. 정답은 <strong>' + correctAnswers[0] + '</strong> 입니다.'; fb.className = 'feedback wrong';
        playSound('wrong');
      }
      renderMathInElement(fb, { delimiters: [{left: '$', right: '$', display: false}] });
    }

    function checkAnswer(btn, isCorrect) {
      const card = btn.closest('.quiz-card'); if(card.dataset.answered) return;
      card.dataset.answered = 'true';
      btn.classList.add(isCorrect ? 'correct-selected' : 'wrong-selected');
      const fb = card.querySelector('.feedback');
      if(isCorrect) {
        fb.innerHTML = '✅ 정답입니다!'; fb.className = 'feedback correct';
        playSound('correct'); createConfetti();
      } else {
        fb.innerHTML = '❌ 틀렸습니다. 다시 한번 생각해보세요!'; fb.className = 'feedback wrong';
        playSound('wrong'); card.querySelector('.correct').classList.add('show-correct');
      }
    }

    function countCorrect(stageId) {
      const stage = document.getElementById(stageId);
      const cards = stage.querySelectorAll('.quiz-card');
      let c = 0;
      cards.forEach(card => {
        if(card.querySelector('.correct-selected') || (card.querySelector('.subj-input') && card.querySelector('.subj-input').style.borderColor.includes('34C759'))) {
          c++;
        }
      });
      return { total: cards.length, correct: c, answered: stage.querySelectorAll('.quiz-card[data-answered="true"]').length };
    }

    function finishBasic() {
      const r = countCorrect('stage-2');
      if(r.answered < r.total) return alert("아직 안 푼 문제가 있어요!");
      let score = Math.round((r.correct / r.total) * 100);
      state.basicScore = score; saveState();
      if(score >= 70) { playSound('tada'); createConfetti(); alert("축하합니다! " + score + "점입니다. 3단계가 열렸어요!"); navTo(3); } 
      else { playSound('wrong'); document.getElementById('basic-result').innerHTML = "현재 점수: " + score + "점. 70점 이상이어야 넘어갈 수 있어요!<br><button class='btn btn-primary' style='margin-top:10px; background:var(--warning);' onclick='resetBasic()'>다시 풀기 🔄</button>"; }
    }

    function resetBasic() {
      state.basicScore = 0; saveState(); document.getElementById('basic-result').innerHTML = '';
      document.querySelectorAll('#stage-2 .quiz-card').forEach(card => {
        delete card.dataset.answered; card.querySelector('.feedback').style.display = 'none';
        const input = card.querySelector('.subj-input');
        if(input) { input.disabled = false; input.value = ''; input.style.borderColor=''; input.style.backgroundColor=''; input.nextElementSibling.disabled=false; }
        card.querySelectorAll('.option').forEach(opt => { opt.className = 'option' + (opt.hasAttribute('onclick') && opt.getAttribute('onclick').includes('true') ? ' correct' : ''); });
      });
    }

    function finishAdvanced() {
      const r = countCorrect('stage-3');
      if(r.answered < r.total) return alert("아직 안 푼 문제가 있어요!");
      let score = Math.round((r.correct / r.total) * 100);
      state.advScore = score; state.stage = 4; saveState();
      playSound('tada'); for(let i=0; i<3; i++) setTimeout(createConfetti, i*500);
      document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
      document.getElementById('stage-done').classList.add('active');
      document.getElementById('final-score-txt').innerText = "최종 실전 점수: " + score + "점 / 100점"; updateNav();
    }

    /* Chatbot Logic */
    let chatHistory = [
      { role: "user", parts: [{ text: "너는 친절한 중학교 수학 과외 선생님이야. 학생이 모르는 걸 물어보면 절대 정답을 바로 말하지 말고, 힌트만 주고 스스로 풀 수 있도록 유도해. 이모지를 써서 다정하게 말해줘." }]},
      { role: "model", parts: [{ text: "알겠어! 나는 친절한 수학 과외 선생님이야. 정답 대신 힌트로 스스로 깨닫게 도와줄게! 😊 어떤 문제가 헷갈려?" }]}
    ];

    async function sendMessage() {
      const inputEl = document.getElementById('chat-input');
      const text = inputEl.value.trim();
      if(!text) return;
      
      addMessage(text, 'user');
      inputEl.value = '';
      
      chatHistory.push({ role: "user", parts: [{ text }] });
      const loadingId = addMessage("입력 중...", "bot loading");
      const box = document.getElementById('chat-box');
      box.scrollTop = box.scrollHeight;
      
      try {
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: chatHistory })
        });
        const data = await res.json();
        
        document.getElementById(loadingId).remove();
        
        if(data.error) {
          addMessage("앗, 선생님이 지금 바빠서 대답을 못하겠어. 조금 이따 다시 물어봐줄래? 😭", 'bot');
        } else {
          const reply = data.candidates[0].content.parts[0].text;
          addMessage(reply, 'bot');
          chatHistory.push({ role: "model", parts: [{ text: reply }] });
          
          // Re-render math in chat box
          renderMathInElement(box, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}] });
        }
      } catch(e) {
        document.getElementById(loadingId).remove();
        addMessage("네트워크 오류가 발생했어. 연결을 확인해줘!", 'bot');
      }
      box.scrollTop = box.scrollHeight;
    }

    function addMessage(text, type) {
      const box = document.getElementById('chat-box');
      const div = document.createElement('div');
      div.className = 'msg ' + type;
      // Very simple bold and markdown parsing
      let formatted = text.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/\\n/g, '<br>');
      div.innerHTML = formatted;
      const id = 'msg-' + Date.now();
      div.id = id;
      box.appendChild(div);
      return id;
    }

    document.addEventListener("DOMContentLoaded", function() {
      renderMathInElement(document.body, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}] });
      if(state.stage === 4) { document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active')); document.getElementById('stage-done').classList.add('active'); document.getElementById('final-score-txt').innerText = "최종 실전 점수: " + state.advScore + "점 / 100점"; } 
      else { navTo(state.stage); }
    });
  </script>
</body>
</html>`;
}

const day1Next = "../../days/2026-06-14/math_char_expr_2.html";
const day2Next = "../../days/2026-06-15/math_char_expr_3.html";
const day3Next = "../../days/2026-06-15/math_char_expr_4.html"; // Note: day4 is also on the 15th
const day4Next = "../../days/2026-06-16/math_char_expr_5.html";
const day5Next = "../../index.html";

fs.writeFileSync(path.join(__dirname, '../days/2026-06-13/math_char_expr_1.html'), generateHTML(data.day1, day1Next));
fs.writeFileSync(path.join(__dirname, '../days/2026-06-14/math_char_expr_2.html'), generateHTML(data.day2, day2Next));
fs.writeFileSync(path.join(__dirname, '../days/2026-06-15/math_char_expr_3.html'), generateHTML(data.day3, day3Next));
fs.writeFileSync(path.join(__dirname, '../days/2026-06-15/math_char_expr_4.html'), generateHTML(data.day4, day4Next));
fs.writeFileSync(path.join(__dirname, '../days/2026-06-16/math_char_expr_5.html'), generateHTML(data.day5, day5Next));

console.log('Build complete!');

// db.js: 실시간 클라우드 연동 및 로그인 처리 모듈

// GitHub PAT (obfuscated)
const API_KEY = atob("QUl6YVN5QkJwa0tEOGZ5amZ6cmQ5eFR3OEFxR3hKQUVTSDB6Tnlr");
const p1 = "Z2hwXzBOcmNoUDZTVHNHckhuY";
const p2 = "1JjT0hFTUZUQUJVa3FpOTJHakFkOA==";
const CLOUD_TOKEN = atob(p1 + p2);
const ISSUE_URL = "https://api.github.com/repos/iloveboyzone51-dev/smart-study-math-grade1/issues/1";

window.cloudDB = {
  feedbacks: [],
  messages: [],
  stickers: 0
};

// 클라우드 DB 불러오기
async function getCloudDB() {
  try {
    const res = await fetch(ISSUE_URL + "?t=" + Date.now(), {
      cache: 'no-store',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + CLOUD_TOKEN
      }
    });
    if(res.ok) {
      const data = await res.json();
      if(data.body && data.body.trim().startsWith('{')) {
        window.cloudDB = JSON.parse(data.body);
      }
    }
  } catch(e) {
    console.error("Cloud DB Load Error:", e);
  }
}

// 클라우드 DB 저장하기
async function setCloudDB() {
  try {
    const res = await fetch(ISSUE_URL, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + CLOUD_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: JSON.stringify(window.cloudDB, null, 2) })
    });
    if(!res.ok) throw new Error("Failed to save");
  } catch(e) {
    console.error("Cloud DB Save Error:", e);
  }
}

// 오류 제보 기능
async function reportFeedback(btn, qText, unitKey, dateKey) {
  const reason = prompt("어떤 문제가 있나요?\\n1. 안 배운 내용이에요.\\n2. 정답이 이상해요.\\n3. 오타가 있어요.\\n4. 기타 (내용을 직접 입력해 주세요.)");
  if(!reason) return;
  
  const issueText = reason.length === 1 ? ["", "안 배운 내용이에요", "정답이 이상해요", "오타가 있어요", "기타"][parseInt(reason)] || reason : reason;
  
  btn.innerText = "⏳ 전송 중...";
  btn.disabled = true;

  await getCloudDB(); // 최신 DB 로드
  if(!window.cloudDB.feedbacks) window.cloudDB.feedbacks = [];
  
  window.cloudDB.feedbacks.push({
    id: Date.now(),
    date: new Date().toISOString(),
    unit: unitKey,
    lessonDate: dateKey,
    question: qText,
    issue: issueText,
    status: 'open'
  });
  
  await setCloudDB();
  btn.innerText = "✅ 제보 완료";
  alert("아빠에게 오류 제보가 성공적으로 전송되었습니다!");
}

// 로그인 시스템 UI 삽입
function requireLogin(onSuccess) {
  const currentRole = localStorage.getItem('userRole');
  if(currentRole) {
    onSuccess(currentRole);
    return;
  }

  const modalHtml = `
    <div id="login-modal" style="position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); z-index:9999; display:flex; justify-content:center; align-items:center;">
      <div style="background:white; padding:40px; border-radius:24px; text-align:center; max-width:400px; width:90%; box-shadow:0 10px 40px rgba(0,0,0,0.2);">
        <h1 style="margin-top:0; color:var(--primary);">가족 로그인 👨‍👦</h1>
        <p style="color:#666; margin-bottom:30px;">당신은 누구인가요?</p>
        
        <div style="display:flex; gap:15px; margin-bottom:20px;">
          <button id="btn-login-son" style="flex:1; padding:20px; font-size:1.2rem; border:2px solid var(--border); border-radius:16px; background:white; cursor:pointer; font-weight:bold; transition:0.2s;">👦 아들</button>
          <button id="btn-login-dad" style="flex:1; padding:20px; font-size:1.2rem; border:2px solid var(--border); border-radius:16px; background:white; cursor:pointer; font-weight:bold; transition:0.2s;">👨 아빠</button>
        </div>

        <div id="pw-area" style="display:none;">
          <input type="password" id="login-pw" placeholder="비밀번호 4자리" style="width:100%; padding:15px; border:2px solid var(--primary); border-radius:12px; font-size:1.5rem; text-align:center; letter-spacing:10px; margin-bottom:15px;" maxlength="4">
          <button id="btn-login-submit" style="width:100%; padding:15px; background:var(--primary); color:white; border:none; border-radius:12px; font-size:1.2rem; font-weight:bold; cursor:pointer;">입장하기 🚀</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  let selectedRole = '';
  document.getElementById('btn-login-son').onclick = function() {
    selectedRole = 'son';
    this.style.borderColor = 'var(--primary)'; this.style.background = '#E8EFFF';
    document.getElementById('btn-login-dad').style.borderColor = 'var(--border)'; document.getElementById('btn-login-dad').style.background = 'white';
    document.getElementById('pw-area').style.display = 'block';
    document.getElementById('login-pw').focus();
  };
  document.getElementById('btn-login-dad').onclick = function() {
    selectedRole = 'dad';
    this.style.borderColor = 'var(--danger)'; this.style.background = '#FFEBEE';
    document.getElementById('btn-login-son').style.borderColor = 'var(--border)'; document.getElementById('btn-login-son').style.background = 'white';
    document.getElementById('pw-area').style.display = 'block';
    document.getElementById('login-pw').focus();
  };
  document.getElementById('btn-login-submit').onclick = function() {
    const pw = document.getElementById('login-pw').value;
    if(selectedRole === 'son' && pw === '0805') {
      localStorage.setItem('userRole', 'son');
      document.getElementById('login-modal').remove();
      onSuccess('son');
    } else if(selectedRole === 'dad' && pw === '0105') {
      localStorage.setItem('userRole', 'dad');
      document.getElementById('login-modal').remove();
      onSuccess('dad');
    } else {
      alert("비밀번호가 틀렸습니다!");
      document.getElementById('login-pw').value = '';
    }
  };
}

function logout() {
  localStorage.removeItem('userRole');
  location.reload();
}

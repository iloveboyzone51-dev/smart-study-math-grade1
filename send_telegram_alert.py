import os
import json
import urllib.request
import urllib.parse
from datetime import datetime, timedelta, timezone

# 1. Environment Variables
TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
ISSUE_URL = "https://api.github.com/repos/iloveboyzone51-dev/smart-study-math-grade1/issues/1"

def send_telegram_message(text):
    if not TELEGRAM_TOKEN or not TELEGRAM_CHAT_ID:
        print("Missing Telegram credentials")
        return
        
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': TELEGRAM_CHAT_ID,
        'text': text,
        'parse_mode': 'HTML'
    }).encode('utf-8')
    
    try:
        req = urllib.request.Request(url, data=data, method='POST')
        with urllib.request.urlopen(req) as response:
            print("Message sent successfully!")
    except Exception as e:
        print(f"Failed to send Telegram message: {e}")

def main():
    # 2. Calculate "Yesterday" in KST
    kst = timezone(timedelta(hours=9))
    now_kst = datetime.now(kst)
    yesterday_kst = now_kst - timedelta(days=1)
    yesterday_str = yesterday_kst.strftime("%Y-%m-%d")

    # 3. Fetch Data from GitHub DB (Issue #1)
    req = urllib.request.Request(ISSUE_URL)
    req.add_header("Accept", "application/vnd.github.v3+json")
    if GITHUB_TOKEN:
        req.add_header("Authorization", f"token {GITHUB_TOKEN}")

    db_data = {}
    try:
        with urllib.request.urlopen(req) as response:
            issue = json.loads(response.read().decode('utf-8'))
            db_data = json.loads(issue.get("body", "{}"))
    except Exception as e:
        print(f"Failed to fetch DB: {e}")
        return

    # 4. Check for yesterday's progress
    progress_list = db_data.get("progress", [])
    yesterday_record = None
    for p in progress_list:
        if p.get("dateKey") == yesterday_str:
            yesterday_record = p
            break

    # 5. Generate and Send Message
    if yesterday_record:
        msg = f"✅ <b>[스마트 학습서 알림]</b>\\n\\n원장님! 아드님이 어제({yesterday_str}) 학습을 무사히 완료했습니다.\\n\\n"
        msg += f"📚 <b>학습 단원:</b> {yesterday_record.get('unitKey', '알 수 없음')}\\n"
        msg += f"⏱ <b>소요 시간:</b> {yesterday_record.get('durationMins', 0)}분\\n"
        msg += f"💯 <b>최종 점수:</b> {yesterday_record.get('score', 0)}점\\n"
        msg += f"❌ <b>오답 횟수:</b> {yesterday_record.get('wrongCount', 0)}번\\n\\n"
        msg += "대시보드에 접속해서 칭찬 스티커와 편지를 남겨주세요! 🎁"
    else:
        msg = f"🚨 <b>[스마트 학습서 경고]</b>\\n\\n원장님! 아드님이 어제({yesterday_str}) 학습을 진행하지 않았습니다.\\n\\n"
        msg += "학습 일정이 밀리지 않도록 아드님께 따뜻한 독려가 필요합니다! 👨‍👦"

    send_telegram_message(msg)

if __name__ == "__main__":
    main()

import time
import os
import json
import urllib.request
import websockets
import asyncio
import sys
import subprocess
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import UnexpectedAlertPresentException, NoAlertPresentException
from selenium.webdriver.common.keys import Keys

sys.stdout.reconfigure(encoding='utf-8')

def parse_ebs_html(html_path, out_json_path, subject_title):
    print(f"[{subject_title}] Parsing HTML to JSON...")
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    soup = BeautifulSoup(html, 'lxml')
    quboxes = soup.select('.qubox')
    grouped_data = {}
    
    for q in quboxes:
        index = q.get('data-index', 'unknown')
        if index not in grouped_data:
            grouped_data[index] = {"index": index, "id": q.get('id'), "passage_html": "", "question_html": "", "options": [], "answer": "", "explanation_html": ""}
            
        data = grouped_data[index]
        if q.get('id') and not data['id']: data['id'] = q.get('id')
            
        question_div = q.select_one('div[name="divQUESTION"]')
        if question_div: data['question_html'] = str(question_div)
            
        explan_div = q.select_one('div[name="divEXPLAN"]')
        if explan_div: data['explanation_html'] = str(explan_div)
            
        options = q.select('li')
        if options and not data['options']: data['options'] = [str(opt) for opt in options]
            
        answer_node = q.find(lambda tag: tag.name in ["div", "span"] and "정답" in tag.text and len(tag.text) < 15)
        if answer_node:
            ans_text = answer_node.text.replace("정답", "").strip()
            if ans_text: data['answer'] = ans_text
                
        if not question_div:
            lml_div = q.select_one('div[name="divLML"]')
            if lml_div:
                data['passage_html'] += str(lml_div)
            else:
                dd = q.select_one('dd')
                if dd: data['passage_html'] += "".join([str(c) for c in dd.contents])

    final_questions = [grouped_data[k] for k in sorted(grouped_data.keys(), key=lambda x: int(x) if x.isdigit() else 9999) if grouped_data[k]['question_html'] or grouped_data[k]['passage_html']]
            
    db = {"test_title": subject_title, "total_questions": len(final_questions), "questions": final_questions}
    with open(out_json_path, 'w', encoding='utf-8') as f:
        json.dump(db, f, indent=2, ensure_ascii=False)
    print(f"[{subject_title}] JSON Saved! ({len(final_questions)} items)")

async def capture_html_via_cdp(subject_title, base_dir):
    try:
        req = urllib.request.Request('http://127.0.0.1:9222/json')
        with urllib.request.urlopen(req) as response:
            tabs = json.loads(response.read().decode())
    except Exception as e:
        print(f"CDP Connect Failed: {e}")
        return False
        
    target_ws = None
    for tab in tabs:
        if 'solvePaper' in tab.get('url', ''):
            target_ws = tab.get('webSocketDebuggerUrl')
            break
            
    if not target_ws:
        print("Solve Paper tab not found in CDP! Retrying...")
        time.sleep(2)
        try:
            with urllib.request.urlopen(req) as response:
                tabs = json.loads(response.read().decode())
            for tab in tabs:
                if 'solvePaper' in tab.get('url', ''):
                    target_ws = tab.get('webSocketDebuggerUrl')
                    break
        except:
            pass
        
    if not target_ws:
        print("Still no Solve Paper tab found.")
        return False

    async with websockets.connect(target_ws, max_size=10_000_000) as ws:
        print(f"[{subject_title}] Injecting Auto-Clicker...")
        # Wait for the DOM to fully render the questions
        for _ in range(15): # wait up to 30 seconds
            await asyncio.sleep(2)
            await ws.send(json.dumps({
                "id": 2,
                "method": "Runtime.evaluate",
                "params": {"expression": "document.querySelector('.qubox') ? document.body.innerHTML : ''", "returnByValue": True}
            }))
            
            # Flush any pending messages until we get our response for id: 2
            html = ''
            while True:
                try:
                    resp_str = await asyncio.wait_for(ws.recv(), timeout=2.0)
                    resp = json.loads(resp_str)
                    if resp.get("id") == 2:
                        html = resp.get('result', {}).get('result', {}).get('value', '')
                        break
                except asyncio.TimeoutError:
                    break
                    
            if html:
                html_path = os.path.join(base_dir, f"{subject_title}_출력용.html")
                json_path = os.path.join(base_dir, f"{subject_title}_문제은행.json")
                with open(html_path, "w", encoding="utf-8") as f:
                    f.write("<html><head><meta charset='utf-8'></head><body>\n")
                    f.write(html)
                    f.write("\n</body></html>")
                print(f"[{subject_title}] HTML Saved!")
                parse_ebs_html(html_path, json_path, subject_title)
                return True
    return False

def wait_for_element_and_click(driver, script, wait_time=5):
    end_time = time.time() + wait_time
    while time.time() < end_time:
        try:
            driver.execute_script(script)
            return True
        except:
            time.sleep(0.5)
    return False

def handle_alerts(driver):
    try:
        alert = driver.switch_to.alert
        print(f"Popup alert detected: {alert.text}")
        alert.accept()
        time.sleep(1)
    except NoAlertPresentException:
        pass

def start_chrome():
    print("▶ 크롬 브라우저를 백그라운드(Headless) 모드로 실행합니다...")
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    user_data_dir = r"C:\Users\LG\Desktop\Chrome_EBS_Profile"
    subprocess.Popen([
        chrome_path, 
        f"--user-data-dir={user_data_dir}",
        "--remote-debugging-port=9222", 
        "--remote-allow-origins=*",
        "--disable-popup-blocking",
        "--no-first-run",
        "--no-default-browser-check",
        "--window-position=-32000,-32000"  # Hides window completely off-screen instead of headless, preserving autofill
    ])
    time.sleep(3)

def main():
    print("==================================================")
    print("EBS 단추 마스터 봇 (End-to-End 완전 자동화)")
    print("==================================================")
    
    os.system("taskkill /F /IM chrome.exe >nul 2>&1")
    os.system("taskkill /F /IM chromedriver.exe >nul 2>&1")
    time.sleep(2)
    
    start_chrome()
    
    options = webdriver.ChromeOptions()
    options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
    
    try:
        driver = webdriver.Chrome(options=options)
    except Exception as e:
        print(f"Chrome 연결 실패: {e}")
        return

    driver.maximize_window()
    
    print("\n[단계 1] EBS 단추 시험지 페이지 접속 및 로그인 진입 중...")
    driver.get('https://ai-plus.ebs.co.kr/mid/exmpaper/makeExmPaper.ebs')
    mypaper_url = '/mid/lrnstts/myExamPaper.ebs'
    
    # Wait to see if login modal appears or if we're already logged in
    time.sleep(3)
    try:
        # Check if the green '로그인 하러가기' button is present without throwing an exception if missing
        login_btns = driver.find_elements(By.XPATH, "//button[contains(text(), '로그인 하러가기') or contains(text(), '로그인')]")
        if login_btns and login_btns[0].is_displayed():
            login_btns[0].click()
            
        # Wait briefly for the login page to load fully
        time.sleep(3)
        
        # Check if we are actually on a login page
        if 'login' in driver.current_url.lower():
            print("▶ 로그인 페이지 진입 완료. 파란색 '로그인' 버튼을 찾아 강제로 누릅니다...")
            
            # Wait for the login button to be present
            time.sleep(2)
            
            try:
                # 1. Awaken Chrome Autofill by clicking the inputs
                id_field = driver.find_element(By.ID, "id")
                pw_field = driver.find_element(By.ID, "pw")
                
                id_field.click()
                time.sleep(0.5)
                pw_field.click()
                time.sleep(0.5)
                
                # 2. Press ENTER exactly like a human user would to submit the form!
                print("▶ 아이디/비밀번호 입력칸을 활성화하고 엔터키를 눌러 로그인을 시도합니다!")
                pw_field.send_keys(Keys.RETURN)
                
                # Check if an alert popped up right after pressing ENTER
                time.sleep(1)
                try:
                    alert = driver.switch_to.alert
                    print(f"▶ [경고] 로그인 경고창 발생: {alert.text}")
                    alert.accept()
                    
                    # If ENTER failed due to alert, try clicking the button as a fallback
                    print("▶ 엔터키 제출 실패. btn_submit 버튼을 직접 클릭합니다.")
                    login_btn = driver.find_element(By.CSS_SELECTOR, "button.btn_submit")
                    login_btn.click()
                except:
                    pass
            except Exception as e:
                print(f"▶ [오류] 로그인 버튼 클릭 실패: {e}")
            
            # Wait until user logs in and the URL is actually the exam paper page
            try:
                WebDriverWait(driver, 60).until(lambda d: 'login' not in d.current_url.lower() and 'makeExmPaper' in d.current_url)
            except Exception as e:
                print(f"▶ [오류] 로그인 이후 페이지 전환 대기 실패: {e}")
    except Exception as e:
        # If no login button or error, we might already be logged in
        print(f"▶ 로그인 모달이 없거나 이미 로그인된 상태입니다. (상세: {e})")

    print("\n[단계 2] 로그인 성공! 맞춤문제은행 진입 완료.")
    
    subjects = [
        {"id": "S01", "name": "국어"},
        {"id": "S02", "name": "수학"},
        {"id": "S03", "name": "영어"},
        {"id": "S06", "name": "사회"},
        {"id": "S05", "name": "과학"}
    ]
    
    base_dir = r"C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\EBS_완전자동추출"
    os.makedirs(base_dir, exist_ok=True)
    
    success_count = 0
    
    for subj in subjects:
        print(f"\n========================================")
        print(f"[{subj['name']}] 추출 시작...")
        
        if 'makeExmPaper' not in driver.current_url:
            driver.get('https://ai-plus.ebs.co.kr/mid/exmpaper/makeExmPaper.ebs')
            time.sleep(3)
            
        try:
            handle_alerts(driver)
            
            print(f"[{subj['name']}] 과목 선택 중...")
            js_script = f"""
                var btn = document.querySelector('.learning__subject li[data-id="{subj['id']}"] button') || document.querySelector('.learning__subject button[data-id="{subj['id']}"]');
                if(btn) {{
                    btn.click();
                    return true;
                }} else {{
                    throw new Error("Button not found");
                }}
            """
            clicked = wait_for_element_and_click(driver, js_script)
            if not clicked:
                print(f"[{subj['name']}] 과목 버튼을 찾을 수 없습니다. 건너뜁니다.")
                continue
            time.sleep(2)
            
            driver.execute_script("""
            var sorts = document.querySelectorAll('.sort_selection li:first-child .item_sort');
            for(var i=0; i<sorts.length; i++) {
                if(!sorts[i].classList.contains('active')) {
                    sorts[i].click();
                }
            }
            """)
            time.sleep(1)
            
            driver.execute_script("if(typeof addDanwon === 'function') addDanwon();")
            time.sleep(2)
            
            driver.execute_script("var el = document.getElementById('sel-count'); if(el) el.value = '50'; if(typeof selectCount === 'function') selectCount(50);")
            time.sleep(1)
            
            driver.execute_script("if(typeof searchItem === 'function') searchItem();")
            time.sleep(4)
            
            test_title = f"{subj['name']}_테스트"
            driver.execute_script(f"""
                var checks = document.querySelectorAll('input[id^="probchk"]');
                for(var i=0; i<checks.length; i++) {{
                    if(!checks[i].checked) checks[i].click();
                }}
                var titleEl = document.getElementById('title');
                if(titleEl) titleEl.value = '{test_title}';
                if(typeof goSubmit === 'function') goSubmit();
            """)
            print(f"[{subj['name']}] 시험지 생성 중...")
            time.sleep(5)
            
            handle_alerts(driver)
            
            driver.execute_script(f"if(typeof goPageJhs === 'function') goPageJhs('{mypaper_url}'); else window.location.href='{mypaper_url}';")
            time.sleep(4)
            
            handle_alerts(driver)
            
            print(f"[{subj['name']}] 시험지 풀기 창 여는 중...")
            driver.execute_script("""
                var buttons = document.querySelectorAll('.question-list .item__content .btn-wrap button');
                for(var i=0; i<buttons.length; i++) {
                    if(buttons[i].innerText.includes('시험지풀기')) {
                        buttons[i].click();
                        break;
                    }
                }
            """)
            time.sleep(5)
            
            handle_alerts(driver)
            
            print(f"[{subj['name']}] HTML/JSON 추출 중 (백그라운드 CDP)...")
            result = asyncio.run(capture_html_via_cdp(test_title, base_dir))
            
            if result:
                success_count += 1
            else:
                print(f"[{subj['name']}] 데이터 추출에 실패했습니다.")
                
            for handle in driver.window_handles:
                driver.switch_to.window(handle)
                if 'solvePaper' in driver.current_url:
                    driver.close()
                    break
            
            driver.switch_to.window(driver.window_handles[0])
            time.sleep(2)
            
        except Exception as e:
            print(f"[{subj['name']}] 오류 발생: {e}")
            continue
            
    print("\n==================================================")
    print(f"추출 작업이 모두 끝났습니다! (성공: {success_count}/5)")
    print("==================================================")
    time.sleep(3)
    driver.quit()

if __name__ == "__main__":
    main()

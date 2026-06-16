import os
import json
import codecs
import re
import urllib.request
import urllib.error
import concurrent.futures
import time

API_KEY = "AIzaSyBBpkKD8fyjfzrd9xTw8AqGxJAESH0zNyk"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key={API_KEY}"

DAYS = [
    {"date": "2026-06-13", "file": "math_char_expr_1.html", "day_num": 2},
    {"date": "2026-06-14", "file": "math_char_expr_2.html", "day_num": 3},
    {"date": "2026-06-15", "file": "math_char_expr_4.html", "day_num": 4},
    {"date": "2026-06-16", "file": "math_char_expr_5.html", "day_num": 5}
]

BASE_DIR = r"C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1"
EBS_DIR = os.path.join(BASE_DIR, "EBS_완전자동추출")
OUT_DIR = os.path.join(BASE_DIR, "days")

def call_gemini(prompt):
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.7}
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(URL, data=data, headers={'Content-Type': 'application/json'})
    
    for _ in range(3):
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                result = json.loads(resp.read().decode('utf-8'))
                return result['candidates'][0]['content']['parts'][0]['text']
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(2)
            else:
                time.sleep(1)
        except Exception as e:
            time.sleep(1)
    return None

def process_ebs_question(q, subj):
    q_html = q.get('question_html', '')
    opts = q.get('options', [])
    
    prompt = f"""You are a friendly middle school tutor (과외 선생님).
Here is a multiple choice question for '{subj}'.
Question HTML: {q_html}
Options: {opts}

Your task:
1. Figure out the correct answer (index 0 to {len(opts)-1}).
2. Write a highly detailed, student-friendly explanation (학생 친화적인 과외 선생님 말투, 존댓말, 이모지 사용).
3. IF it's Math (수학), you MUST provide an extremely detailed step-by-step solution.
4. Format your explanation in HTML snippet (e.g. <p>, <b>, <ul>) and wrap math formulas with $.
Return JSON exactly:
```json
{{
  "correct_index": 2,
  "explanation_html": "<p>안녕! 이 문제는...</p>"
}}
```"""
    
    res = call_gemini(prompt)
    if res:
        try:
            match = re.search(r'```json\s*(\{.*?\})\s*```', res, re.DOTALL)
            if match:
                res_json = json.loads(match.group(1))
            else:
                res_json = json.loads(res.strip())
            return {
                "subj": subj,
                "q": q_html,
                "options": opts,
                "correct": res_json.get("correct_index", 0),
                "explanation_html": res_json.get("explanation_html", "<p>해설을 불러올 수 없습니다.</p>")
            }
        except Exception as e:
            pass
            
    return {
        "subj": subj,
        "q": q_html,
        "options": opts,
        "correct": 0,
        "explanation_html": "<p>해설 생성에 실패했습니다.</p>"
    }

def generate_ai_question(subj):
    prompt = f"""You are a middle school tutor. Generate 1 multiple choice question for middle school 1st grade '{subj}'.
Make it engaging and use HTML for formatting.
If it's Math, wrap formulas in $.
Return JSON exactly:
```json
{{
  "q": "Question text in HTML",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  "correct": 2,
  "explanation_html": "<p>Detailed, friendly step-by-step explanation!</p>"
}}
```"""
    res = call_gemini(prompt)
    if res:
        try:
            match = re.search(r'```json\s*(\{.*?\})\s*```', res, re.DOTALL)
            if match:
                res_json = json.loads(match.group(1))
            else:
                res_json = json.loads(res.strip())
            res_json["subj"] = subj
            return res_json
        except Exception as e:
            pass
            
    return {
        "subj": subj,
        "q": "AI 문제 생성 실패",
        "options": ["1", "2", "3", "4", "5"],
        "correct": 0,
        "explanation_html": "<p>실패</p>"
    }

def process_item(task):
    type_, args = task
    if type_ == "ebs":
        return process_ebs_question(args[0], args[1])
    else:
        return generate_ai_question(args[0])

def load_ebs_data():
    ebs_data = {"수학": [], "국어": [], "영어": [], "과학": []}
    files = [f for f in os.listdir(EBS_DIR) if f.endswith('.json')]
    for f in files:
        subj = ""
        f_decoded = f.encode('utf-8').decode('utf-8', errors='replace')
        if "수학" in f_decoded: subj = "수학"
        elif "국어" in f_decoded: subj = "국어"
        elif "영어" in f_decoded: subj = "영어"
        elif "과학" in f_decoded: subj = "과학"
        
        if subj:
            try:
                with codecs.open(os.path.join(EBS_DIR, f), 'r', 'utf-8') as file:
                    data = json.load(file)
                    qs = data.get("questions", [])
                    ebs_data[subj].extend(qs)
            except:
                pass
    return ebs_data

def build_day(day_info, ebs_data, used_indices):
    print(f"Building {day_info['date']}...")
    reqs = {"수학": 20, "국어": 10, "영어": 10, "과학": 10, "사회": 10}
    
    tasks = []
    for subj, count in reqs.items():
        for _ in range(count):
            if subj in ebs_data and len(ebs_data[subj]) > used_indices.get(subj, 0):
                q = ebs_data[subj][used_indices[subj]]
                used_indices[subj] += 1
                tasks.append(("ebs", (q, subj)))
            else:
                tasks.append(("ai", (subj,)))
                
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        for res in executor.map(process_item, tasks):
            results.append(res)
            
    day_dir = os.path.join(OUT_DIR, day_info['date'])
    os.makedirs(day_dir, exist_ok=True)
    with codecs.open(os.path.join(day_dir, "questions.json"), "w", "utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(results)} questions for {day_info['date']}")

def main():
    ebs_data = load_ebs_data()
    used_indices = {"수학": 0, "국어": 0, "영어": 0, "과학": 0, "사회": 0}
    
    for day in DAYS:
        build_day(day, ebs_data, used_indices)

if __name__ == "__main__":
    main()

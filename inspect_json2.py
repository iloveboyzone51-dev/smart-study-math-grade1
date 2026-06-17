import os
import glob
import json

base_dir = r"C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\EBS_완전자동추출"
files = glob.glob(os.path.join(base_dir, "*_문제은행.json"))

for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            data = json.load(file)
            questions = data.get("questions", [])
            total_qs = len(questions)
            with_explan = sum(1 for q in questions if q.get("explanation_html", "").strip())
            with_ans = sum(1 for q in questions if q.get("answer", "").strip())
            print(f"File: {os.path.basename(f)}")
            print(f" - Total Questions: {total_qs}")
            print(f" - With Explanations: {with_explan}")
            print(f" - With Answers: {with_ans}\n")
    except Exception as e:
        print(f"Error reading {f}: {e}")

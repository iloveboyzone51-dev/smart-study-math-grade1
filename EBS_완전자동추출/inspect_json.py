import os
import json
import codecs

path = r'C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\EBS_완전자동추출'
files = [f for f in os.listdir(path) if f.endswith('.json')]

for f in files:
    try:
        with codecs.open(os.path.join(path, f), 'r', 'utf-8') as file:
            data = json.load(file)
            print(f"--- File: {f.encode('utf-8').decode('utf-8', errors='replace')} ---")
            if "questions" in data:
                qs = data["questions"]
                print(f"Total questions: {len(qs)}")
                if len(qs) > 0:
                    print(f"First question: {qs[0]}")
    except Exception as e:
        print(f'Error reading {f}: {e}')

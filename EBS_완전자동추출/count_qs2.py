import os
import json
import codecs

path = r'C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\EBS_완전자동추출'
files = [f for f in os.listdir(path) if f.endswith('.json')]

for f in files:
    try:
        with codecs.open(os.path.join(path, f), 'r', 'utf-8') as file:
            data = json.load(file)
            print(f"File {f.encode('utf-8')}: {len(data.get('questions', []))} questions")
    except Exception as e:
        pass

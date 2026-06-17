import os
import glob

base_dir = r"C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\EBS_완전자동추출"
files = glob.glob(os.path.join(base_dir, "*_출력용.html"))

for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            html = file.read()
            count = html.count("divEXPLAN")
            count_explan = html.count("EXPLAN")
            print(f"File: {os.path.basename(f)} - 'divEXPLAN': {count}, 'EXPLAN': {count_explan}")
    except Exception as e:
        print(f"Error reading {f}: {e}")

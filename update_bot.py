import sys

with open(r"C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\ebs_master_bot.py", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
in_loop = False
loop_started = False

for line in lines:
    if line.startswith("    for subj in subjects:"):
        # Inject the outer loop before the subjects loop
        new_lines.append("""    try:
        num_sets = int(input("\\n▶ 몇 세트를 연속으로 추출하시겠습니까? (숫자만 입력, 기본값 1): ") or "1")
    except ValueError:
        num_sets = 1
        
    for set_idx in range(1, num_sets + 1):
        if num_sets > 1:
            print(f"\\n==================================================")
            print(f"[{set_idx}번째 세트] 추출 시작!")
            print(f"==================================================")
            
""")
        new_lines.append("    " + line)
        in_loop = True
        loop_started = True
        continue
        
    if in_loop:
        if line.startswith("    print(\"\\n==================================================\")") and "성공:" in "".join(lines):
            # End of the subjects loop, we reached the final print
            in_loop = False
            new_lines.append(line)
        else:
            # Indent the line by 4 spaces
            if line.strip() == "":
                new_lines.append(line)
            else:
                new_lines.append("    " + line)
    else:
        new_lines.append(line)

with open(r"C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\ebs_master_bot.py", "w", encoding="utf-8") as f:
    f.writelines(new_lines)
print("Updated successfully")

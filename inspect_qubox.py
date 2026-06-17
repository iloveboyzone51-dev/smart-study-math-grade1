path = r"C:\Users\LG\Desktop\안티그래비티\자녀 문제집\중1\EBS_완전자동추출\EBS_중1_과학_20260617_105458_출력용.html"
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

count = html.count("divEXPLANATION")
print(f"divEXPLANATION count in today's Science HTML: {count}")

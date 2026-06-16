@echo off
chcp 65001
echo =======================================================
echo EBS 단추 마스터 봇 (End-to-End 완전 자동화) 가동
echo =======================================================
python "%~dp0ebs_master_bot.py"
pause

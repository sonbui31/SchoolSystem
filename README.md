- Bạn chỉ cần chạy lại lệnh bỏ các thư mục đang tồn tại (theo ảnh bạn gửi thì có test-results, playwright-report, screenshots):
  +  git rm -r --cached test-results playwright-report test-results screenshots
- Rồi commit lại
-------------------------------- gitignore ----------------------------------------------------
- # Bỏ qua thư mục node_modules
node_modules/

# Bỏ kết quả test và báo cáo Playwright
test-results/
playwright-report/
blob-report/
screenshots/
*.zip

# Bỏ ảnh hoặc video tự động sinh
*.png
*.jpg
*.jpeg
*.webm
*.mp4

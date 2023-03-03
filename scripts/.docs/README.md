# Tại sao lại có folder này?
- Khi build production, cwd của mỗi folder là khác nhau dẫn đến việc không thể load file .env nằm tại ROOT direction
  - Build frontend cwd = ROOT/web/frontend
  - Build backend cwd = ROOT/web
  - Khi start server cwd = ROOT/
- Folder này có trách nhiệm generate ra các file .env đến các folder con khi chạy development và production
# Folder chứa services cho toàn app

- Là nơi tiền xử lý dữ liệu trước khi đẩy lên API
  - Validate
  - Convert các type bị sót bởi các form (Ví dụ moment, ...)
  - Convert response của BE thành kết quả mong muốn cuối cùng của FE (Error code, ignore foreign key, ...)
## Các bước deploy heroku
1. Setup shopify app in partner
  1.1 Tại dashboard team chọn "Create New App" ![Setup Shopify App In Partner](./images/setup-shopify-app-in-partner.png)
  1.2 Các phần còn lại (App Logic, Rule, ...) sẽ được người khác setup

2. Tạo app heroku
  2.1 Tại dashboard team chọn "Create New App" ![Create new app](./images/create-app-heroku.png)
  2.2 Setup biến môi trường cần thiết ![Setup heroku env](./images/setup-heroku-env.png) 
  2.3 Deploy ![Deploy](./images/deploy-code-heroku.png)
  2.4 Theo dõi kết quả build
  2.5 Xem log xem server đã được start hay gặp lỗi



## Example
1. Kết quả của "Setup shopify app in partner"
  - Kết quả bước 1.1 ![Result 1.1](./images/result-1.1.png)
  - Kết quả bước 1.2 ![Result 1.2](./images/result-1.2.png)

2. Kết quả của "Tạo app heroku"
  - Env setup ![Result setup env](./images/result-setup-env.png)
  - Build log ![Result build log](./images/result-build-log.png)
  - Server log ![Result server log](./images/result-server-log.png)
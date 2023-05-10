# Tích hợp hệ thống Apps vào trong App được Installed.

Mức độ ưu tiên: Cao 
Ngày tạo: May 9, 2023 10:59 PM
Người chịu trách nhiệm: Tưởng Lê Mạnh
Người nghiệm thu: Nguyen Dttn
Status: In progress

- Mục đích
    
    Khách cài Product Badge biết thêm về Popup SmartBar và cài đặt nó. Tương tự như AfterShip, khi cài 1 app nó hiển thị hết các page khác ở sidebar. 
    
    [Screen Recording 2023-05-09 at 23.00.50.mov](Ti%CC%81ch%20ho%CC%9B%CC%A3p%20he%CC%A3%CC%82%20tho%CC%82%CC%81ng%20Apps%20va%CC%80o%20trong%20App%20%C4%91u%CC%9Bo%CC%9B%206d54b1f097c344eb80188e24d342203f/Screen_Recording_2023-05-09_at_23.00.50.mov)
    
- Nhiệm vụ
    
    Tương tự như Myshopkit Insert Code, Shopify cung cấp việc add a custom Menu ⇒ Không cần code vào giao diện của app mà code thành 1 router riêng. 
    
    [Screen Recording 2023-05-09 at 23.05.25.mov](Ti%CC%81ch%20ho%CC%9B%CC%A3p%20he%CC%A3%CC%82%20tho%CC%82%CC%81ng%20Apps%20va%CC%80o%20trong%20App%20%C4%91u%CC%9Bo%CC%9B%206d54b1f097c344eb80188e24d342203f/Screen_Recording_2023-05-09_at_23.05.25.mov)
    
    Code 1 giao diện có chức năng như sau:
    
    - Kiểm tra xem khách cài app hay chưa
        
        Nguyên sẽ cung cấp API này.
        
    - Khách chưa cài app
        1. Nếu khách chưa cài app, giao diện có các phần: [https://ecomposer.io/](https://ecomposer.io/) 
            1. Featured Image: Required
            2. Description: Required  (in ra HTML nếu có thẻ HTML)
            3. Features: Optional  Không in nếu không có
            4. Button (đổi sang Icon connect) và Link 
            
            ![Screenshot 2023-05-09 at 23.09.10.png](Ti%CC%81ch%20ho%CC%9B%CC%A3p%20he%CC%A3%CC%82%20tho%CC%82%CC%81ng%20Apps%20va%CC%80o%20trong%20App%20%C4%91u%CC%9Bo%CC%9B%206d54b1f097c344eb80188e24d342203f/Screenshot_2023-05-09_at_23.09.10.png)
            
        2. Click vào link sẽ mở target blank 
        3. Tất cả các phần cần được định nghĩa tại 1 file json. Ví dụ:
            
            ```json
            {
            	featuredImage: https://image.png
            	description: Description
            	...
            }
            ```
            
        4. Viết doc mô tả các config và build tại 
            
            [Tích hợp App vào trong Menu ](https://www.notion.so/T-ch-h-p-App-v-o-trong-Menu-d732cb4a44884a21881a7762b5e5a398)
            
    - Khách cài App rồi
        1. Tìm hiểu nếu redirect được sang App ngay tại Shopify không, nếu có thì làm 
        2. Nếu không, tạo nút Customize → Click vào đó thì nhảy qua App 
        
        Ví dụ: Click vào Integration thì mở ra app Popup 
        
        ![Screenshot 2023-05-09 at 23.18.47.png](Ti%CC%81ch%20ho%CC%9B%CC%A3p%20he%CC%A3%CC%82%20tho%CC%82%CC%81ng%20Apps%20va%CC%80o%20trong%20App%20%C4%91u%CC%9Bo%CC%9B%206d54b1f097c344eb80188e24d342203f/Screenshot_2023-05-09_at_23.18.47.png)
        
    - API
        
        Endpoint: [https://myshopkit.app/wp-json/ebase/v1/app-integrations/<appSlug>](https://myshopkit.app/wp-json/ebase/v1/app-integrations/%3CappSlug%3E)
        
        Response
        
        ```tsx
        // code 200
        export interface Item {
        	featuredImage: String
        	description: HTML
        	features: String[]
        	buttonText: String
        	buttonLink: String
        }
        
        export interface Response {
        	message: String
        	data: Item
        }
        ```
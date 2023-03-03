# Requirements
  - You've installed [Nodejs](https://nodejs.org/en/download/) 14.17.0 or higher.
  - You've installed a Node.js package manager: either [npm](https://docs.npmjs.com/getting-started), [Yarn 1.x](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).
  - You've installed [Git 2.28.0](https://git-scm.com/) or higher.
  - You've installed [Ruby](https://www.ruby-lang.org/en/documentation/installation/) 2.7.5 or higher.
  - You're using the latest version of [Chrome](https://www.google.com/chrome/) or [Firefox](https://www.mozilla.org/vi/).


# Root
  - Là nơi chứa những configs chung của cả project 
    - env file
    - eslint
    - husky, lint-staged, commitlint
    - .vscode
    - ...

# "Web" folder
  - Folder "src" là nơi chứa code BE
  - Root direction chứa các config cho BE
    - typescript config
    - nodemon config
    - ...

# "Web/frontend" folder
  - Folder "src" là nơi chứa code FE
  - Root direction chứa các config cho FE
    - vite config
    - typescript config
    - ...

# Get started
  - File "ShopifyApp.ts" bắt buộc phải update field "sessionStorage" - có tag "START_EDIT:"
  - Xem xét update các tag "START_EDIT:" được comment
  - Các tag "DANGER:" và "WARNING:" cần phải xem xét trước khi thay đổi
  - Chạy 2 scripts "husky:commitlint" và "husky:lint-staged" để khởi tạo husky trước khi tạo commit và push lên github
  - Chạy "yarn dev"
  - "yarn commit" để sử dụng prompt commit



# Relate documentations
  - [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
  - [Theme app extension](https://shopify.dev/docs/apps/online-store/theme-app-extensions/)
  - [Admin embeded app](https://shopify.dev/docs/apps/getting-started/create)
/** Định nghĩa các biến môi trường được sử dụng trong app */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * @name @lemanh-tuong
       * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
       */
      /** Required */
      HOST: string;
      SHOPIFY_API_KEY: string;
      SHOPIFY_API_SECRET: string;
      SCOPES: string;
      API_VERSION: string;
      BACKEND_PORT: string;
      PORT: string;
      NODE_ENV: 'production' | 'development';
      /** <------------------------------------------------------------------------------------------> */

      /**
       * START_EDIT:
       * Tác dụng của các biến env này sẽ được comment tại file .ts vì tên có thể giống nhau nhưng chức năng có thể khác nhau
       * Ví dụ cùng tên
          - "_____ADDITIONAL_VARIABLE______APP_NAME":
            - FE sử dụng để làm Logo
            - BE sử dụng để lưu tên biến đó lên shopify
          - "_____ADDITIONAL_VARIABLE______APP_EMBED_EXTENSION_UUID":
            - FE sử dụng để link người dùng đến trang active theme app extension
            - BE sử dụng để check shop đã active theme app extension lên chưa

       */
      /** Custom */
      _____ADDITIONAL_VARIABLE______APP_NAME: string;
      _____ADDITIONAL_VARIABLE______APP_EMBED_EXTENSION_UUID?: string;
      _____ADDITIONAL_VARIABLE______BULK_SERVICE_URL: string;
      _____ADDITIONAL_VARIABLE______BULK_TOKEN_FOR_SERVICE: string;
      _____ADDITIONAL_VARIABLE______PRICING_SERVICE_URL: string;
      _____ADDITIONAL_VARIABLE______SECRET_KEY_OF_SERVICE: string;
      _____ADDITIONAL_VARIABLE______UNINSTALLED_SERVICE_URL: string;
    }
  }
}

export {};

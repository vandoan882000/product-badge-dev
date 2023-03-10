/// <reference types="vite/client" />

interface ImportMetaEnv {
  // TIDIO
  readonly _____ADDITIONAL_VARIABLE______TIDIO_KEY: string;
  readonly _____ADDITIONAL_VARIABLE______TIDIO_HELLO_MESSAGE: string; // Message chào khi mới vào app
  readonly _____ADDITIONAL_VARIABLE______TIDIO_REQUEST_FEATURES_MESSAGE: string; // Message khi muốn yêu cầu thêm tính năng mới
  readonly _____ADDITIONAL_VARIABLE______TIDIO_UNLOCK_FEATURES_MESSAGE: string; // Message khi muốn unlock 1 feature - cái mà cần phải pricing để mở nếu trong thời gian không có người support

  // Pricing
  readonly _____ADDITIONAL_VARIABLE______API_PROMO_CODE_URL: string;
  readonly _____ADDITIONAL_VARIABLE______API_CHARGE_URL: string;
  readonly _____ADDITIONAL_VARIABLE______API_CURRENT_PLAN: string;
  readonly _____ADDITIONAL_VARIABLE______API_ALL_PLAN: string;

  // Tên của app
  readonly _____ADDITIONAL_VARIABLE______APP_NAME: string;

  // API base url
  readonly _____ADDITIONAL_VARIABLE______AXIOS_BASE_URL: string;

  // Link review app trên shopify store
  readonly _____ADDITIONAL_VARIABLE______REVIEW_APP_URL: string;

  // Email feedback
  readonly _____ADDITIONAL_VARIABLE______FEEDBACK_MAIL: string;

  // App Recommendations
  readonly _____ADDITIONAL_VARIABLE______APP_RECOMMENDATIONS_URL: string;

  // Xin rate
  readonly _____ADDITIONAL_VARIABLE______GET_REVIEW_STATUS_API_URL: string;
  readonly _____ADDITIONAL_VARIABLE______SET_REVIEW_STATUS_API_URL: string;

  readonly _____ADDITIONAL_VARIABLE______YOUTUBE_LINK: string;

  readonly _____ADDITIONAL_VARIABLE______WARNING_TEXT: string;

  readonly _____ADDITIONAL_VARIABLE______DOCUMENTATION: string;

  readonly _____ADDITIONAL_VARIABLE______ENABLE_NEW_FEATURE: string;
  readonly _____ADDITIONAL_VARIABLE______NEW_FEATURE_YOUTUBE_ID: string;

  readonly _____ADDITIONAL_VARIABLE______HOW_IT_WORKS_LINK: string;

  readonly _____ADDITIONAL_VARIABLE______FRONTEND_URL: string;

  readonly _____ADDITIONAL_VARIABLE______ACTIVE_LABEL: string;

  readonly _____ADDITIONAL_VARIABLE______TUTORIALS_VIDEO: string;

  readonly _____ADDITIONAL_VARIABLE______ACTIVE_FEATURE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

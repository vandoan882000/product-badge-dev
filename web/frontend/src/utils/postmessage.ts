import { FRONTEND_URL } from 'configs/env';
import { ResponseSuccess as ResponseAutomaticSuccess } from 'pages/HomePage/AutomaticAPI';
import {
  ResponseError as ResponseBadgesError,
  ResponseSuccess as ResponseBadgesSuccess,
  SettingsBadge,
} from 'pages/HomePage/BadgeAPI';
import { DocumentsData } from 'pages/HomePage/DocumentAPI';
import { RecommendItem } from 'pages/HomePage/Features';
import { ServerGetMediaResponse, ServerUploadFileResponse } from 'pages/HomePage/MediaAPI';
import { PlanAPIResponseData } from 'pages/HomePage/PlanAPI';
import { ResponseError, ResponseSuccess } from 'pages/HomePage/ProductAPI';
import { ResponseSuccess as TagsSuccess } from 'pages/HomePage/TagsAPI';
import { createPostMessage } from 'wiloke-react-core/utils';

export interface ParentOnMessage {
  '@Badges/trackingBadges/request': undefined;
  '@Document/getDocuments/request': {
    s?: string;
  };
  '@Navigation/OpenDocument': undefined;
  '@Navigation/DiemMyCuuThay': undefined;
  '@Navigation/Feedbacks': undefined;

  '@Automatic/getSubTagsRequest': undefined;
  '@Automatic/getTagsRequest': {
    searchKey: string;
  };
  '@Automatic/loadMoreTagsRequest': undefined;
  '@Automatic/sortListPostType': {
    listPostType: string[];
  };
  '@PlanPage/chargeUrl/request': {
    planName: string;
    coupon: string;
  };
  '@PlanPage/getPromoCode/request': {
    code: string;
  };
  '@SendReview': undefined;
  '@SendPublish': {
    isNew: boolean;
  };
  '@InitializationPage/sendYoutubeLink': undefined;
  '@PlanPage/getPlans/request': undefined;
  '@InitializationPage/request': undefined;
  '@Navigation/RequestFeature': undefined;
  '@UnblockFeature': undefined;
  '@ProductPage/fullProductRequest': {
    searchKey: string;
  };
  '@ProductPage/fullProductLoadMoreRequest': undefined;
  '@ProductPage/manualProductRequest': {
    searchKey: string;
  };
  '@ProductPage/manualProductLoadMoreRequest': undefined;
  '@BadgesPage/getBadgesRequest': {
    searchKey: string;
    page: number;
    taxSlugs?: string;
    taxName?: string;
    limit?: number;
  };
  '@BadgesPage/getVariantBadgesRequest': {
    id: string;
  };
  '@BadgesPage/loadMoreBadgesRequest': {
    searchKey: string;
    page: number;
    taxSlugs?: string;
    taxName?: string;
    limit?: number;
  };
  '@CUDBadge/createBadgesRequest': {
    slug: string[];
    config: SettingsBadge[];
  };
  '@CUDBadge/updateBadgesRequest': {
    slug: string[];
    config: SettingsBadge[];
    ids: string[];
  };
  '@CUDBadge/deleteBadgesRequest': {
    id: string;
  };
  '@Automatic/getAutomaticBadgesRequest': undefined;

  // cud automatic
  '@CUDAutomatic/createAutomaticRequest': {
    title: string;
    config: any[];
    postType: string;
    tagSelected: string;
    description: string;
    status?: 'active' | 'deactive';
  };

  '@CUDAutomatic/updateAutomaticRequest': {
    id: string;
    title: string;
    config: any[];
    postType: string;
    tagSelected: string;
    description: string;
    status?: 'active' | 'deactive';
  };

  '@CUDAutomatic/deleteAutomaticRequest': {
    id: string;
    postType: string;
  };

  '@InitializationPage/getTemplate': undefined;
  '@FeaturePage/getFeature/request': undefined;
  '@PlanPage/getCurrentPlan/request': undefined;
  '@Media/uploadFile/request': undefined;
  '@Media/getMedia/request': undefined;
  '@Media/loadMoreMedia/request': { page: number };
  '@Media/deleteMedia/request': { id: string };
}

export interface ParentEmitMessage {
  '@Media/deleteMedia/success': { id: string };
  '@Media/deleteMedia/failure': undefined;

  '@Media/loadMoreMedia/success': ServerGetMediaResponse;
  '@Media/loadMoreMedia/failure': undefined;
  '@Media/getMedia/success': ServerGetMediaResponse;
  '@Media/getMedia/failure': undefined;
  '@Media/uploadFile/success': ServerUploadFileResponse;
  '@Media/uploadFile/failure': undefined;
  '@Badges/trackingBadges/success': {
    maxBadges: number;
    takenBadge: number;
    message: string;
  };
  '@Badges/trackingBadges/failure': undefined;
  '@Document/getDocuments/success': {
    data: DocumentsData[];
  };
  '@Document/getDocuments/failure': undefined;

  '@Automatic/getSubTagsSuccess': {
    items: ResponseAutomaticSuccess['data']['items'];
    maxPages: ResponseAutomaticSuccess['data']['maxPages'];
  };
  '@Automatic/getSubTagsFailure': undefined;
  '@Automatic/getTagsSuccess': {
    tags: TagsSuccess['data']['items'];
    hasNextPage: boolean;
  };
  '@Automatic/loadMoreTagsSuccess': {
    tags: TagsSuccess['data']['items'];
    hasNextPage: boolean;
  };
  '@Automatic/getTagsFailure': undefined;
  '@Automatic/loadMoreTagsFailure': undefined;
  '@PlanPage/getPromoCode/success': {
    coupon: string;
    percentage: string;
    couponID: string;
    message: string;
  };
  '@PlanPage/getPromoCode/failure': undefined;
  '@PlanPage/getCurrentPlan/success': {
    currentPlan: string;
    currentToggleAutomatic: boolean;
    freeTrial: string;
    productPerBadges: {
      label: string;
      name: string;
      value: string;
    };
  };
  '@PlanPage/getCurrentPlan/failure': undefined;
  '@PlanPage/getPlans/success': {
    data: PlanAPIResponseData[];
  };
  '@PlanPage/getPlans/failure': undefined;
  '@FeaturePage/getFeature/success': {
    data: RecommendItem[];
  };
  '@FeaturePage/getFeature/failure': undefined;
  '@GetPublish': {
    isPublish: boolean;
  };
  '@InitializationPage/sendTemplate': {
    template: 'wordpress' | 'shopify';
  };
  '@InitializationPage/getYoutubeLink': {
    youtube: string;
    tutorialsVideo: string;
  };
  '@InitializationPage/success': {
    shopDomain: string | null;
    themeId: number | null;
    currencyFormat: string;
    reviewUrl: string;
    feedBackMail: string;
    activeFeature: boolean;
    activeFeatureLabel: string;
    enableNewFeature: boolean;
    newFeatureContent: string;
    howItWorksLink: string;
    warningText: string;
  };
  // full products
  '@ProductPage/fullProductSuccess': {
    fullProducts: {
      items: ResponseSuccess['data']['items'];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
    };
  };
  '@ProductPage/fullProductFailure': {
    message: ResponseError['message'];
  };
  '@ProductPage/fullProductLoadMoreSuccess': {
    fullProducts: {
      items: ResponseSuccess['data']['items'];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
    };
  };
  '@ProductPage/fullProductLoadMoreFailure': {
    message: ResponseError['message'];
  };
  // manual products
  '@ProductPage/manualProductSuccess': {
    fullProducts: {
      items: ResponseSuccess['data']['items'];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
    };
  };
  '@ProductPage/manualProductFailure': {
    message: ResponseError['message'];
  };
  '@ProductPage/manualProductLoadMoreSuccess': {
    fullProducts: {
      items: ResponseSuccess['data']['items'];
      hasNextPage: ResponseSuccess['data']['hasNextPage'];
    };
  };
  '@ProductPage/manualProductLoadMoreFailure': {
    message: ResponseError['message'];
  };

  // badge page
  '@BadgesPage/getBadgesSuccess': {
    data: {
      items: ResponseBadgesSuccess['data']['items'];
      maxPages: ResponseBadgesSuccess['data']['maxPage'];
      page: number;
    };
  };
  '@BadgesPage/getVariantBadgesSuccess': {
    data: {
      items: ResponseBadgesSuccess['data']['items'];
    };
  };

  '@BadgesPage/getVariantBadgesFailure': {
    message: ResponseBadgesError['message'];
  };

  '@BadgesPage/getBadgesFailure': {
    message: ResponseBadgesError['message'];
  };

  '@BadgesPage/loadMoreBadgesSuccess': {
    data: {
      items: ResponseBadgesSuccess['data']['items'];
      maxPages: ResponseBadgesSuccess['data']['maxPage'];
    };
  };
  '@BadgesPage/loadMoreBadgesFailure': {
    message: ResponseBadgesError['message'];
  };

  '@CUDBadge/createBadgesSuccess': {
    data: Array<{ id: string; date?: string; slug: string }>;
    message: string;
  };
  '@CUDBadge/createBadgesFailure': {
    message: string;
  };

  '@CUDBadge/updateBadgesSuccess': {
    data: Array<{ id: string; slug: string; date: string }>;
    message: string;
  };
  '@CUDBadge/updateBadgesFailure': {
    message: string;
  };

  '@CUDBadge/deleteBadgesSuccess': {
    id: string;
    message: string;
  };
  '@CUDBadge/deleteBadgeFailure': {
    message: string;
  };

  // autoamtic
  '@Automatic/getAutomaticBadgesSuccess': {
    data: ResponseAutomaticSuccess['data']['items'];
  };
  '@Automatic/getAutomaticBadgesFailure': {
    message: string;
  };

  // cud automatic
  '@CUDAutomatic/createAutomaticSuccess': {
    id: string;
    description: string;
    message: string;
  };
  '@CUDAutomatic/createAutomaticFailure': {
    message: string;
  };
  '@CUDAutomatic/updateAutomaticSuccess': {
    id: string;
    description: string;
    message: string;
  };
  '@CUDAutomatic/updateAutomaticFailure': {
    message: string;
  };
  '@CUDAutomatic/deactiveAutomaticSuccess': {
    id: string;
    message: string;
  };
  '@CUDAutomatic/deactiveAutomaticFailure': {
    message: string;
  };
  '@CUDAutomatic/deleteAutomaticSuccess': {
    id: string;
    urlImage: string;
    description: string;
    message: string;
  };
  '@CUDAutomatic/deleteAutomaticFailure': {
    message: string;
  };
}

export const postmessage = createPostMessage<ParentEmitMessage, ParentOnMessage>({
  is: 'parent',
  iframeSelector: '#frontend-iframe',
  url: FRONTEND_URL,
});

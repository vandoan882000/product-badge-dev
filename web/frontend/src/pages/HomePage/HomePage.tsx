import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from '@shopify/app-bridge-react';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { Alert } from 'components/Alert';
import Button from 'components/Button';
import {
  ACTIVE_FEATURE,
  ACTIVE_LABEL,
  API_CHARGE_URL,
  APP_NAME,
  DOCUMENTATION,
  ENABLE_NEW_FEATURE,
  FEEDBACK_MAIL,
  HOW_IT_WORKS_LINK,
  NEW_FEATURE_YOUTUBE_ID,
  REVIEW_APP_URL,
  TIDIO_REQUEST_FEATURES_MESSAGE,
  TIDIO_UNLOCK_FEATURES_MESSAGE,
  TUTORIALS_VIDEO,
  WARNING_TEXT,
  YOUTUBE_LINK,
} from 'configs/env';
import useIsTabVisible from 'hooks/useTabVisible';
import { useTidioChat } from 'hooks/useTidioChat';
import { useListenAppActiveExtension } from 'pages/InitializationPage/actions/actionInitializationPage';
import { ChangeEventHandler, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { initializationSelector } from 'store/selectors';
import { fetchAPI, postmessage } from 'utils';
import { View } from 'wiloke-react-core';
import { IframePage } from '../IframePage/IframePage';
import {
  useCreateAutomatic,
  useDeleteAutomatic,
  useGetAutomatics,
  useSortAutomatic,
  useUpdateAutomatic,
} from './actions/actionAutomaticProducts';
import {
  useChangeActiveKey as useChangeActiveKeyBadges,
  useGetBadges,
  useGetVariantBadges,
  useLoadmoreBadges,
  useTrackingBadges,
} from './actions/actionBadges';
import { useCreateBadge, useDeleteBadge, useUpdateBadge } from './actions/actionCUDBadge';
import { useGetDocuments } from './actions/actionDocuments';
import { useGetFeatures } from './actions/actionFeatures';
import {
  useChangeActiveKey as useChangeActiveKeyFullProducts,
  useGetFullProducts,
  useLoadmoreFullProducts,
} from './actions/actionFullProducts';
import {
  useChangeActiveKey as useChangeActiveKeyManualProducts,
  useGetManualProducts,
  useLoadmoreManualProducts,
} from './actions/actionManualProducts';
import { useDeleteMedia, useGetMedia, useLoadMoreMedia, useUploadMedia } from './actions/actionMedia';
import { useGetCurrentPlan, useGetPlans, useGetPromoCode } from './actions/actionPlans';
import { useGetSubTags } from './actions/actionSubTags';
import { useChangeTagKey, useGetTags, useLoadMoreTags } from './actions/actionTags';
import { ChargeUrlAPIResponse } from './PlanAPI';
import * as styles from './styles';

export const HomePage = () => {
  const getFullProducts = useGetFullProducts();
  const getManualProducts = useGetManualProducts();
  const getBadges = useGetBadges();
  const loadMoreBadges = useLoadmoreBadges();
  const createBadge = useCreateBadge();
  const updateBadge = useUpdateBadge();
  const getAutomatic = useGetAutomatics();
  const createAutomatic = useCreateAutomatic();
  const updateAutomatic = useUpdateAutomatic();
  const deleteAutomatic = useDeleteAutomatic();
  const trackingBadges = useTrackingBadges();

  const deleteBadge = useDeleteBadge();
  const changeActiveKeyFullProducts = useChangeActiveKeyFullProducts();
  const changeActiveKeyManualProducts = useChangeActiveKeyManualProducts();
  const changeActiveKeyBadges = useChangeActiveKeyBadges();
  const loadmoreFullProducts = useLoadmoreFullProducts();
  const loadmoreManualProducts = useLoadmoreManualProducts();
  const getVariantBadge = useGetVariantBadges();

  // plans
  const getPlans = useGetPlans();
  const getCurrentPlan = useGetCurrentPlan();
  const getCode = useGetPromoCode();
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const getDocument = useGetDocuments();
  const listenAppExtension = useListenAppActiveExtension();
  const isChangedTab = useIsTabVisible();

  // manual
  const pmFullProduct = useRef<(() => void) | undefined>();
  const pmManualProducts = useRef<(() => void) | undefined>();
  const pmGetBadges = useRef<(() => void) | undefined>();
  const pmTrackingBadges = useRef<(() => void) | undefined>();
  const pmGetVariantBadges = useRef<(() => void) | undefined>();
  const pmCreateBadges = useRef<(() => void) | undefined>();
  const pmUpdateBadge = useRef<(() => void) | undefined>();
  const pmDeleteBadges = useRef<(() => void) | undefined>();
  const pmLoadMoreFull = useRef<(() => void) | undefined>();
  const pmLoadMoreManual = useRef<(() => void) | undefined>();
  const pmLoadMoreBadge = useRef<(() => void) | undefined>();

  // automatic
  const pmGetAutomatic = useRef<(() => void) | undefined>();
  const pmCreateAutomatic = useRef<(() => void) | undefined>();
  const pmUpdateAutomatic = useRef<(() => void) | undefined>();
  const pmDeleteAutomatic = useRef<(() => void) | undefined>();
  const pmInit = useRef<(() => void) | undefined>();
  const pmOpenTidio = useRef<(() => void) | undefined>();
  const pmOpenTidio2 = useRef<(() => void) | undefined>();
  const pmOpenTidio3 = useRef<(() => void) | undefined>();

  const pmSendReview = useRef<(() => void) | undefined>();
  const pmSendPublish = useRef<(() => void) | undefined>();
  const pmTemplate = useRef<(() => void) | undefined>();
  const pmYoutube = useRef<(() => void) | undefined>();
  const pmFeature = useRef<(() => void) | undefined>();
  const pmChargeUrl = useRef<(() => void) | undefined>();
  const pmPromoCode = useRef<(() => void) | undefined>();
  const pmUnblockFeature = useRef<(() => void) | undefined>();
  const pmSortPostType = useRef<(() => void) | undefined>();

  const pmGetTags = useRef<(() => void) | undefined>();
  const pmLoadMoreTags = useRef<(() => void) | undefined>();

  const sortAutomatic = useSortAutomatic();
  const searchTags = useChangeTagKey();
  const getTags = useGetTags();
  const getSubTags = useGetSubTags();
  const loadMoreTag = useLoadMoreTags();

  // plans
  const pmPlans = useRef<(() => void) | undefined>();
  const pmCurrentPlan = useRef<(() => void) | undefined>();
  const pmGetSubTags = useRef<(() => void) | undefined>();
  const pmGoDocument = useRef<(() => void) | undefined>();
  const pmUploadMedia = useRef<(() => void) | undefined>();
  const pmGetMedia = useRef<(() => void) | undefined>();
  const pmLoadMoreMedia = useRef<(() => void) | undefined>();
  const pmDeleteMedia = useRef<(() => void) | undefined>();
  const pmGetDocuments = useRef<(() => void) | undefined>();

  const { initTidioChat } = useTidioChat();

  const {
    shopDomain,
    themeId,
    currencyFormat,
    appExtensionActived,
    statusInitialization,
    // statusInitialization
  } = useSelector(initializationSelector);
  const getFeatures = useGetFeatures();
  // Tuong update
  const shopify_pagebuilder = `https://${shopDomain}/admin/themes/${themeId}/editor?context=apps`;
  const uploadMedia = useUploadMedia();
  const getMedia = useGetMedia();
  const loadMoreMedia = useLoadMoreMedia();
  const deleteMedia = useDeleteMedia();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isChangedTab && !appExtensionActived && statusInitialization === 'success') {
      listenAppExtension.request({ appBridge: app });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChangedTab, app, appExtensionActived, statusInitialization]);

  useEffect(() => {
    pmGetDocuments.current = postmessage.on('@Document/getDocuments/request', payload => {
      getDocument.request({ s: payload.s });
    });

    return () => {
      pmGetDocuments.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Media
  useEffect(() => {
    pmUploadMedia.current = postmessage.on('@Media/uploadFile/request', () => {
      inputRef.current?.click();
    });

    pmGetMedia.current = postmessage.on('@Media/getMedia/request', () => {
      getMedia.request(undefined);
    });

    pmLoadMoreMedia.current = postmessage.on('@Media/loadMoreMedia/request', data => {
      loadMoreMedia.request({ page: data.page });
    });

    pmDeleteMedia.current = postmessage.on('@Media/deleteMedia/request', data => {
      deleteMedia.request({ id: data.id });
    });

    return () => {
      pmUploadMedia.current?.();
      pmGetMedia.current?.();
      pmLoadMoreMedia.current?.();
      pmDeleteMedia.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // feature page
  useEffect(() => {
    pmUnblockFeature.current = postmessage.on('@UnblockFeature', () => {
      window.tidioChatApi?.open();
      window.tidioChatApi?.messageFromVisitor(TIDIO_UNLOCK_FEATURES_MESSAGE);
    });

    pmFeature.current = postmessage.on('@FeaturePage/getFeature/request', () => {
      getFeatures.request(undefined);
    });

    return () => {
      pmFeature.current?.();
      pmUnblockFeature.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initTidioChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reviews
  useEffect(() => {
    pmSendReview.current = postmessage.on('@SendReview', async () => {
      await fetchAPI.request({
        url: 'me/reviews',
        method: 'POST',
      });
    });

    pmSendPublish.current = postmessage.on('@SendPublish', async () => {
      postmessage.emit('@GetPublish', { isPublish: !!appExtensionActived });
    });

    return () => {
      pmSendPublish.current?.();
      pmSendReview.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // navigation
  useEffect(() => {
    pmGoDocument.current = postmessage.on('@Navigation/OpenDocument', () => {
      window.open(DOCUMENTATION);
    });

    pmOpenTidio.current = postmessage.on('@Navigation/RequestFeature', () => {
      window.tidioChatApi?.open();
      window.tidioChatApi?.messageFromVisitor(TIDIO_REQUEST_FEATURES_MESSAGE);
    });

    pmOpenTidio2.current = postmessage.on('@Navigation/DiemMyCuuThay', () => {
      window.tidioChatApi?.open();
      window.tidioChatApi?.messageFromVisitor(
        `Hi, I'm getting trouble when setting up MyShopKit's Product Badges app on my site https://${shopDomain}`,
      );
    });

    pmOpenTidio3.current = postmessage.on('@Navigation/Feedbacks', () => {
      window.open(FEEDBACK_MAIL);

      // window.tidioChatApi?.open();
      // window.tidioChatApi?.messageFromVisitor("Hi, I would like to leave a feedback for the MyShopKit's Product Badges app");
    });

    return () => {
      pmOpenTidio.current?.();
      pmOpenTidio2.current?.();
      pmOpenTidio3.current?.();
      pmGoDocument.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // InitializationPage
  useEffect(() => {
    pmTemplate.current = postmessage.on('@InitializationPage/getTemplate', () => {
      postmessage.emit('@InitializationPage/sendTemplate', {
        template: 'shopify',
      });
    });

    pmYoutube.current = postmessage.on('@InitializationPage/sendYoutubeLink', () => {
      postmessage.emit('@InitializationPage/getYoutubeLink', {
        youtube: YOUTUBE_LINK,
        tutorialsVideo: TUTORIALS_VIDEO,
      });
    });

    pmInit.current = postmessage.on('@InitializationPage/request', () => {
      postmessage.emit('@InitializationPage/success', {
        shopDomain,
        themeId,
        currencyFormat,
        reviewUrl: REVIEW_APP_URL,
        feedBackMail: FEEDBACK_MAIL,
        activeFeature: JSON.parse(ACTIVE_FEATURE.toLowerCase()),
        activeFeatureLabel: ACTIVE_LABEL,
        enableNewFeature: JSON.parse(ENABLE_NEW_FEATURE.toLocaleLowerCase()),
        newFeatureContent: NEW_FEATURE_YOUTUBE_ID,
        howItWorksLink: HOW_IT_WORKS_LINK,
        warningText: WARNING_TEXT,
      });
    });
    return () => {
      pmInit.current?.();
      pmYoutube.current?.();
      pmTemplate.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // plan page
  useEffect(() => {
    pmPromoCode.current = postmessage.on('@PlanPage/getPromoCode/request', payload => {
      const { code } = payload;
      getCode.request({ code });
    });

    pmPlans.current = postmessage.on('@PlanPage/getPlans/request', () => {
      getPlans.request(undefined);
    });

    pmCurrentPlan.current = postmessage.on('@PlanPage/getCurrentPlan/request', () => {
      getCurrentPlan.request(undefined);
    });

    pmChargeUrl.current = postmessage.on('@PlanPage/chargeUrl/request', async payload => {
      const { planName, coupon } = payload;
      const response: AxiosResponse<ChargeUrlAPIResponse> = await fetchAPI.request({
        baseURL: API_CHARGE_URL,
        method: 'post',
        data: {
          planSlug: planName,
          coupon,
        },
      });
      redirect.dispatch(Redirect.Action.REMOTE, response.data.data.redirectTo);
    });

    return () => {
      pmCurrentPlan.current?.();
      pmPlans.current?.();
      pmPromoCode.current?.();
      pmChargeUrl.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Automatic
  useEffect(() => {
    pmSortPostType.current = postmessage.on('@Automatic/sortListPostType', payload => {
      const { listPostType } = payload;
      sortAutomatic.request({ listPostType });
    });

    pmGetTags.current = postmessage.on('@Automatic/getTagsRequest', payload => {
      const { searchKey } = payload;
      searchTags(searchKey);
      getTags.request(undefined);
    });

    pmLoadMoreTags.current = postmessage.on('@Automatic/loadMoreTagsRequest', () => {
      loadMoreTag.request(undefined);
    });

    pmGetSubTags.current = postmessage.on('@Automatic/getSubTagsRequest', () => {
      getSubTags.request(undefined);
    });

    pmGetAutomatic.current = postmessage.on('@Automatic/getAutomaticBadgesRequest', () => {
      getAutomatic.request(undefined);
    });

    pmCreateAutomatic.current = postmessage.on('@CUDAutomatic/createAutomaticRequest', payload => {
      const { config, description, postType, tagSelected, title, status } = payload;
      createAutomatic.request({
        config,
        description,
        postType,
        tagSelected,
        title,
        status,
      });
    });

    pmUpdateAutomatic.current = postmessage.on('@CUDAutomatic/updateAutomaticRequest', payload => {
      const { config, description, id, postType, tagSelected, title, status } = payload;
      updateAutomatic.request({
        config,
        description,
        id,
        postType,
        tagSelected,
        title,
        status,
      });
    });

    pmDeleteAutomatic.current = postmessage.on('@CUDAutomatic/deleteAutomaticRequest', payload => {
      const { id, postType } = payload;
      deleteAutomatic.request({ id, postType });
    });

    return () => {
      pmCreateAutomatic.current?.();
      pmUpdateAutomatic.current?.();
      pmGetAutomatic.current?.();
      pmDeleteAutomatic.current?.();
      pmSortPostType.current?.();
      pmGetTags.current?.();
      pmLoadMoreTags.current?.();
      pmGetSubTags.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // full products
  useEffect(() => {
    pmFullProduct.current = postmessage.on('@ProductPage/fullProductRequest', payload => {
      const { searchKey } = payload;
      changeActiveKeyFullProducts(searchKey);
      getFullProducts.request(undefined);
    });
    pmLoadMoreFull.current = postmessage.on('@ProductPage/fullProductLoadMoreRequest', () => {
      loadmoreFullProducts.request(undefined);
    });

    return () => {
      pmFullProduct.current?.();
      pmLoadMoreFull.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // manual products
  useEffect(() => {
    pmLoadMoreManual.current = postmessage.on('@ProductPage/manualProductLoadMoreRequest', () => {
      loadmoreManualProducts.request(undefined);
    });
    pmManualProducts.current = postmessage.on('@ProductPage/manualProductRequest', payload => {
      const { searchKey } = payload;
      changeActiveKeyManualProducts(searchKey);
      getManualProducts.request(undefined);
    });

    return () => {
      pmLoadMoreManual.current?.();
      pmManualProducts.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // badges
  useEffect(() => {
    pmGetBadges.current = postmessage.on('@BadgesPage/getBadgesRequest', payload => {
      const { searchKey, taxName, taxSlugs, limit } = payload;
      changeActiveKeyBadges(searchKey);
      getBadges.request({ taxName, taxSlugs, limit });
    });

    pmGetVariantBadges.current = postmessage.on('@BadgesPage/getVariantBadgesRequest', payload => {
      const { id } = payload;
      getVariantBadge.request({ id });
    });

    pmLoadMoreBadge.current = postmessage.on('@BadgesPage/loadMoreBadgesRequest', payload => {
      const { limit, page } = payload;
      loadMoreBadges.request({ limit, page });
    });

    pmCreateBadges.current = postmessage.on('@CUDBadge/createBadgesRequest', payload => {
      const { config, slug } = payload;
      createBadge.request({ config, slug });
    });

    pmUpdateBadge.current = postmessage.on('@CUDBadge/updateBadgesRequest', payload => {
      const { config, slug, ids } = payload;
      updateBadge.request({ config, slug, ids });
    });

    pmDeleteBadges.current = postmessage.on('@CUDBadge/deleteBadgesRequest', payload => {
      const { id } = payload;
      deleteBadge.request({ ids: [id] });
    });

    pmTrackingBadges.current = postmessage.on('@Badges/trackingBadges/request', () => {
      trackingBadges.request(undefined);
    });

    return () => {
      pmGetBadges.current?.();
      pmGetVariantBadges.current?.();
      pmLoadMoreBadge.current?.();
      pmCreateBadges.current?.();
      pmUpdateBadge.current?.();
      pmDeleteBadges.current?.();
      pmTrackingBadges.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beforeUpload = (file: File) => {
    const sizeMB = file.size / 1024 / 1024;
    if (5 && sizeMB > 5) {
      notification.error({
        message: `Image must be smaller ${5}MB`,
      });
      return false;
    }
    return true;
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.target.files) {
      const files = event.target.files;
      if (files.length > 0) {
        if (beforeUpload(files[0])) {
          uploadMedia.request({ file: files[0] });
        }
      } else {
        postmessage.emit('@Media/uploadFile/failure', undefined);
      }
    } else {
      postmessage.emit('@Media/uploadFile/failure', undefined);
    }
  };

  return (
    <View css={styles.container}>
      <input
        required
        type="file"
        accept="image/png, image/jpeg"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleChange}
      />
      {statusInitialization === 'success' && !appExtensionActived && (
        <Alert
          css={{ margin: '8px 4px' }}
          type="danger"
          radius={6}
          message={
            <View>
              <View tagName="p">
                To complete setup, Enable "{APP_NAME}" to continue <br />"{APP_NAME}" is a embed extension help app that
                can access your theme to display the "{APP_NAME}" on your store
                <br />
                We strongly recommend enable to allow this app working properly.
                <br /> To activate and deactivate app embed blocks please click the{' '}
                <View
                  tagName="a"
                  css={{ textDecoration: 'underline', fontWeight: 500 }}
                  href={shopify_pagebuilder}
                  target="blank"
                >
                  "Config now"
                </View>{' '}
                button below, and press Save from Theme settings
              </View>
              <Button
                colorHover="light"
                size="medium"
                radius={6}
                css={{ marginTop: '8px', textDecoration: 'none' }}
                href={shopify_pagebuilder}
                target="blank"
              >
                Config now
              </Button>
            </View>
          }
          closable={false}
        />
      )}
      <IframePage />
    </View>
  );
};

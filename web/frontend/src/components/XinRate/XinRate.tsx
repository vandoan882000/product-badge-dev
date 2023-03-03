import { AxiosResponse } from 'axios';
import { GET_REVIEW_STATUS_API_URL, REVIEW_APP_URL, SET_REVIEW_STATUS_API_URL } from 'configs/env';
import { useEffect, useRef, useState } from 'react';
import { fetchAPI } from 'utils';
import { Image, Text, View } from 'wiloke-react-core';
import MyModal from '../MyModal';
import congratulationImage from './congrat.png';
import * as style from './styles';

export interface Response {
  data: { hasReview: boolean };
  message: string;
  status: 'success' | 'error';
}

export const XinRate = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalThank, setModalThank] = useState(false);
  const interval = useRef<number | undefined>();

  const _handleGetReview = async () => {
    try {
      const res: AxiosResponse<Response> = await fetchAPI.request({
        url: GET_REVIEW_STATUS_API_URL,
        baseURL: '',
      });
      if (res.data.status === 'success') {
        setModalVisible(!res.data.data.hasReview);
      }
    } catch {}
  };

  const _handleCloseModal = (_variant: 'ok' | 'cancel') => async () => {
    // if (variant === 'ok') window.open(REVIEW_URL);
    // if (variant === 'cancel') window.open(`mailto:${FEEDBACK_MAIL}`);

    if (_variant === 'cancel') {
      window.tidioChatApi?.open();
      window.tidioChatApi?.messageFromVisitor(
        "Hi, I would like to leave a feedback for the MyShopKit's Product Badges app",
      );
    }

    setModalThank(true);
    setModalVisible(false);

    try {
      await fetchAPI.request({
        method: 'POST',
        url: SET_REVIEW_STATUS_API_URL,
        baseURL: '',
      });
    } finally {
    }
  };

  useEffect(() => {
    if (!modalVisible) {
      interval.current = window.setInterval(() => {
        _handleGetReview();
      }, 20000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [modalVisible]);

  const _openThank = () => {
    setModalThank(true);
  };

  return (
    <View>
      <MyModal
        isVisible={modalVisible}
        okText="Great! I'll leave a good review"
        cancelText="Not good, I have some feedbacks"
        okProps={{ tagName: 'a', href: REVIEW_APP_URL, onClick: _openThank }}
        onOk={_handleCloseModal('ok')}
        onCancel={_handleCloseModal('cancel')}
        scrollDisabled
        bodyCss={{ minHeight: '460px' }}
        headerText="Thank you for using Magic Badges"
      >
        <View css={style.container}>
          <Image src={congratulationImage} />
          <Text css={style.title}>Thank you for using Magic Badges</Text>
          <Text css={style.message}>Could you please share with us your experience of this App</Text>
          <Text
            onClick={() => {
              setModalVisible(false);
            }}
            color="gray8"
            colorHover="gray8"
            css={{ cursor: 'pointer' }}
          >
            (I already wrote a review)
          </Text>
        </View>
      </MyModal>

      <MyModal
        isVisible={modalThank}
        okText=""
        scrollDisabled
        bodyCss={{ minHeight: '300px' }}
        contentCss={{ display: 'flex', alignItems: 'center', height: '100%' }}
        cancelText="Close"
        onCancel={() => {
          setModalThank(false);
        }}
      >
        <View css={style.container}>
          <Text css={style.title}>Thanks for your support 🎉</Text>
          <Text css={style.message}>Your feedback is much appreciated. It allow us to create better app</Text>
        </View>
      </MyModal>
    </View>
  );
};

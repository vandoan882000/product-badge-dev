import { Skeleton } from 'antd';
import { AxiosResponse } from 'axios';
import { AsyncComponent } from 'components/AsyncComponent';
import { Retry } from 'components/Retry/Retry';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { initializationSelector } from 'store/selectors';
import { fetchAPI } from 'utils';
import { v4 } from 'uuid';
import { View } from 'wiloke-react-core';
import { Card } from './components/Card';
import { IntegrationApp } from './models/IntegrationApp';

export const IntegrationAppPage = () => {
  const { appSlug } = useParams<{ appSlug: string }>();
  const { shopDomain } = useSelector(initializationSelector);
  const [session, setSession] = useState('');

  const state = useAsync(async () => {
    interface ResponseSuccess {
      message: string;
      data: IntegrationApp;
    }
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `https://myshopkit.app/wp-json/ebase/v1/app-integrations/${appSlug}`,
      params: { shop: shopDomain },
    });
    return response.data.data;
  }, [appSlug, session]);

  return (
    <View container css={{ marginTop: '40px' }}>
      <AsyncComponent
        status={state.loading ? 'loading' : state.error ? 'failure' : 'success'}
        isEmpty={!state.value}
        Request={<Skeleton />}
        Success={<Card {...(state.value as IntegrationApp)} />}
        Failure={<Retry description="Something went wrong!!!" retryText="Retry" onClick={() => setSession(v4())} />}
      />
    </View>
  );
};

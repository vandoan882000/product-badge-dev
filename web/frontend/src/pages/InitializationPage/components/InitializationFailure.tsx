import { useAppBridge } from '@shopify/app-bridge-react';
import { Retry } from 'components/Retry/Retry';
import { Text, View } from 'wiloke-react-core';
import { useInitialization } from '../actions/actionInitializationPage';
import * as styles from '../styles';

export const InitializationFailure = () => {
  const app = useAppBridge();
  const init = useInitialization();

  return (
    <View css={styles.container}>
      <Text css={{ textAlign: 'center', fontSize: '22px', marginBottom: '10px' }}>Something went wrong</Text>
      <Retry
        onClick={() => {
          init.request({ appBridge: app });
        }}
      />
    </View>
  );
};

import { Retry } from 'components/Retry/Retry';
import { useSelector } from 'react-redux';
import { initializationSelector } from 'store/selectors';
import { Text, View } from 'wiloke-react-core';
import * as styles from '../styles';

export const NotFoundTheme = () => {
  const { shopDomain } = useSelector(initializationSelector);

  return (
    <View css={styles.container}>
      <Text css={{ textAlign: 'center', fontSize: '22px', marginBottom: '10px' }}>
        We can't detect theme in your store. Make sure you've activated a theme and refresh the browser
      </Text>
      <Retry
        retryText="Active now"
        onClick={() => {
          window.open(`https://${shopDomain}/admin/themes`);
        }}
      />
    </View>
  );
};

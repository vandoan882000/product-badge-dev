import { ActivityIndicator, View } from 'wiloke-react-core';
import * as styles from '../styles';

export const InitializationLoading = () => {
  return (
    <View css={styles.container}>
      <ActivityIndicator size={50} />
    </View>
  );
};

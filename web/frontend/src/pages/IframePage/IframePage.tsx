import { FRONTEND_URL } from 'configs/env';
import { View } from 'wiloke-react-core';
import * as styles from './style';

const IframePage = () => {
  return (
    <View css={styles.container}>
      <iframe title="IFRAME" id="frontend-iframe" src={FRONTEND_URL} />
    </View>
  );
};

export { IframePage };

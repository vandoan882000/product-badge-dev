import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { LinkLikeComponentProps } from '@shopify/polaris/build/ts/latest/src/utilities/link';
import translations from '@shopify/polaris/locales/en.json';
import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

const AdapterLink: FC<LinkLikeComponentProps> = ({ url, children, ...rest }) => {
  return (
    // @ts-ignore
    <Link to={url} {...rest}>
      {children}
    </Link>
  );
};

export const PolarisProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppProvider i18n={translations} linkComponent={AdapterLink}>
      {children}
    </AppProvider>
  );
};

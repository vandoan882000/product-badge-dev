import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge, Loading } from '@shopify/app-bridge-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ExitIframe() {
  const app = useAppBridge();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const redirectUri = params.get('redirectUri');
    if (!!app && !!search && !!redirectUri) {
      const url = new URL(decodeURIComponent(redirectUri));

      if (url.hostname === location.hostname) {
        const redirect = Redirect.create(app);
        redirect.dispatch(Redirect.Action.REMOTE, decodeURIComponent(redirectUri));
      }
    }
  }, [app, search]);

  return <Loading />;
}

import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { delay } from 'utils';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface ScrollBarsProps extends ViewProps {
  css?: ViewProps['css'];
  scrollTo?: number;
  children: ReactNode;
  onScrollFrame?: (value: { scrollHeight: number; scrollTop: number; clientHeight: number }) => void;
}

export const ScrollBars: FC<ScrollBarsProps> = ({ scrollTo, children, css, onScrollFrame, ...rest }) => {
  const scrollBarsRef = useRef<HTMLDivElement | null>(null);
  const [checkScroll, setCheckScroll] = useState(false);

  const checkHeight = () => {
    if (scrollBarsRef.current) {
      setCheckScroll(scrollBarsRef.current.offsetHeight < scrollBarsRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    checkHeight();
    const observer = new MutationObserver(checkHeight);
    if (scrollBarsRef.current) {
      observer.observe(scrollBarsRef.current, { attributes: true, childList: true, subtree: true });
    }
    window.addEventListener('resize', checkHeight);
    return () => {
      window.removeEventListener('resize', checkHeight);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleAsync = async () => {
      if (typeof scrollTo !== 'undefined') {
        await delay();
        scrollBarsRef.current?.scrollTo({ top: scrollTo });
      }
    };
    handleAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTo]);

  return (
    <View
      ref={scrollBarsRef}
      {...rest}
      css={[styles.scrollbar, css]}
      onScroll={event => {
        const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
        onScrollFrame?.({ scrollHeight, scrollTop, clientHeight });
      }}
    >
      <View css={checkScroll ? { marginRight: '-10px' } : {}}>{children}</View>
    </View>
  );
};

import { ComponentParams, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { JSX, useEffect, useRef } from 'react';

declare global {
  interface Window {
    CoveoSearchPage?: {
      initialize: (apiKey: string, options: { target: string }) => void;
    };
  }
}

interface Fields {
  // Add fields if you want to expose any Sitecore fields (optional)
  Title?: Field<string>;
}

type CoveoSearchWidgetProps = {
  params: ComponentParams;
  fields: Fields;
};

const COVEO_API_KEY = process.env.NEXT_PUBLIC_COVEO_API_KEY;
const CONTAINER_ID = 'coveo-search-page-container';

export const Default = (props: CoveoSearchWidgetProps) => {
  if (!COVEO_API_KEY) {
    throw new Error('COVEO API KEY is not defined');
  }
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || initializedRef.current) return;

    if (!document.getElementById('coveo-loader-script')) {
      const script = document.createElement('script');
      script.id = 'coveo-loader-script';
      script.src =
        'https://search.cloud.coveo.com/rest/organizations/xmcpocypispnj5/searchpage/v1/interfaces/3371c260-2438-43a9-a7e2-0513bf4bfdec/loader';
      script.async = true;
      script.onload = () => {
        if (window.CoveoSearchPage) {
          window.CoveoSearchPage.initialize(COVEO_API_KEY, {
            target: `#${CONTAINER_ID}`,
          });
          initializedRef.current = true;
        }
      };
      document.body.appendChild(script);
    } else {
      if (window.CoveoSearchPage) {
        window.CoveoSearchPage.initialize(COVEO_API_KEY, {
          target: `#${CONTAINER_ID}`,
        });
        initializedRef.current = true;
      }
    }
  }, []);

  return <div id={CONTAINER_ID}></div>;
};

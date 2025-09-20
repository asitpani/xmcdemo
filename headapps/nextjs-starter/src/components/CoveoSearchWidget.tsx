// CoveoSearchWidget.tsx
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    CoveoSearchPage?: {
      initialize: (apiKey: string, options: { target: string }) => void;
    };
  }
}

const COVEO_API_KEY = 'xxd1ce7885-157d-4d78-ad51-41d92f830795'; // <-- Replace with your actual key
const CONTAINER_ID = 'coveo-search-page-container';

const CoveoSearchWidget = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || initializedRef.current) return;

    // Check if script already exists
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
      // Script already loaded, just initialize
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

export default CoveoSearchWidget;

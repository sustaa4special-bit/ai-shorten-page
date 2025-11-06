import { useEffect, useRef } from "react";

interface AdBannerProps {
  position: "top" | "bottom";
}

const AdBanner = ({ position }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Only load the ad script once per position
    if (scriptLoaded.current || !adRef.current) return;
    
    scriptLoaded.current = true;

    // Create and inject the ad configuration
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.innerHTML = `
      atOptions = {
        'key' : '988629ac76fde4e22965d0540e5ee022',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    // Create and inject the ad invocation script
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = "//www.highperformanceformat.com/988629ac76fde4e22965d0540e5ee022/invoke.js";
    invokeScript.async = true;

    // Append scripts to the ad container
    if (adRef.current) {
      adRef.current.appendChild(configScript);
      adRef.current.appendChild(invokeScript);
    }

    return () => {
      // Cleanup on unmount
      scriptLoaded.current = false;
    };
  }, [position]);

  return (
    <div className="flex justify-center w-full">
      <div 
        className="w-full max-w-[728px] min-h-[90px] flex items-center justify-center"
        style={{ maxWidth: '728px' }}
      >
        <div 
          ref={adRef}
          id={`${position}-ad-banner`}
          className="ad-container"
          aria-label={`Advertisement ${position}`}
        />
      </div>
    </div>
  );
};

export default AdBanner;

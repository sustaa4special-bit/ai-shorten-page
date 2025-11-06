import { useEffect, useRef } from "react";
interface AdBannerProps {
  position: "top" | "bottom";
}
declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}
const AdBanner = ({
  position
}: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  useEffect(() => {
    // Only load the ad script once per position
    if (scriptLoaded.current || !adRef.current) return;
    scriptLoaded.current = true;

    // Set atOptions on window object for global access
    window.atOptions = {
      key: '988629ac76fde4e22965d0540e5ee022',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {}
    };

    // Create the configuration script element
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.text = `
      atOptions = {
        'key': '988629ac76fde4e22965d0540e5ee022',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
    `;

    // Create the ad invocation script element
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = "//www.highperformanceformat.com/988629ac76fde4e22965d0540e5ee022/invoke.js";
    invokeScript.async = true;

    // Add error handling
    invokeScript.onerror = () => {
      console.error(`Failed to load ad script for ${position} banner`);
    };
    invokeScript.onload = () => {
      console.log(`Ad script loaded successfully for ${position} banner`);
    };

    // Append scripts to the ad container in correct order
    if (adRef.current) {
      adRef.current.appendChild(configScript);
      adRef.current.appendChild(invokeScript);
    }
    return () => {
      // Cleanup on unmount
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
      scriptLoaded.current = false;
    };
  }, [position]);
  return <div className="flex justify-center w-full">
      <div className="w-full max-w-[728px] min-h-[90px] flex items-center justify-center" style={{
      maxWidth: '728px'
    }}>
        
      </div>
    </div>;
};
export default AdBanner;
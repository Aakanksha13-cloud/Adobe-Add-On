import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Initialize Adobe SDK at runtime (not static import)
const initAdobeSDK = async () => {
  if (typeof window !== 'undefined') {
    // Check if SDK is available in parent window (Adobe Express environment)
    const checkForSDK = () => {
      // Check multiple possible locations for the SDK
      if (window.parent && window.parent.addOnUISdk) {
        return window.parent.addOnUISdk;
      }
      if (window.addOnUISdk) {
        return window.addOnUISdk;
      }
      return null;
    };

    try {
      // Wait a bit for SDK to be available (in case it's still loading)
      let addOnUISdk = checkForSDK();
      let attempts = 0;
      const maxAttempts = 10;
      
      while (!addOnUISdk && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 200));
        addOnUISdk = checkForSDK();
        attempts++;
      }

      if (!addOnUISdk) {
        // SDK not available - running outside Adobe Express
        console.log("Adobe SDK not detected - using fallback notifications (react-toastify)");
        window.adobeSDKReady = false;
        return;
      }

      // Wait for SDK to be ready
      await addOnUISdk.ready;
      
      console.log("Adobe Add-on SDK is ready!");
      
      // Store SDK globally
      window.addOnUISdk = addOnUISdk;
      window.adobeSDKReady = true;
      
      // Create global function to show Adobe dialogs
      window.showAdobeDialog = async (variant, title, description) => {
        try {
          const result = await addOnUISdk.app.showModalDialog({
            variant: variant,
            title: title,
            description: description,
            buttonLabels: { primary: "OK" }
          });
          console.log("Dialog result:", result);
          return result;
        } catch (error) {
          console.error("Error showing Adobe modal:", error);
          return null;
        }
      };
      
      console.log("Adobe SDK initialized successfully");
    } catch (error) {
      // Gracefully handle SDK initialization errors
      console.log("Adobe SDK initialization failed - using fallback notifications (react-toastify)");
      console.log("This is normal when running outside Adobe Express");
      window.adobeSDKReady = false;
    }
  }
};

// Initialize SDK
initAdobeSDK();

// Render React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

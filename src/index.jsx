import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Check for Adobe SDK availability at runtime (will be available when loaded in Adobe Express)
const initAdobeSDK = () => {
  // Adobe SDK is loaded via script tag in index.html when running in Adobe Express
  // Check if it's available globally
  if (typeof window !== 'undefined') {
    window.adobeSDKReady = false;
    
    // Try to check for Adobe SDK presence
    const checkSDK = () => {
      if (window.addOnUISdk) {
        window.addOnUISdk.ready.then(() => {
          console.log("Adobe Add-on SDK is ready!");
          window.adobeSDKReady = true;
          
          // Create global function to show Adobe dialogs
          window.showAdobeDialog = async (variant, title, description) => {
            try {
              const result = await window.addOnUISdk.app.showModalDialog({
                variant: variant,
                title: title,
                description: description,
                buttonLabels: { primary: "OK" }
              });
              return result;
            } catch (error) {
              console.log("Error showing Adobe modal:", error);
              return null;
            }
          };
        });
      } else {
        console.log("Running outside Adobe Express - using fallback notifications");
      }
    };
    
    // Check after a short delay to allow SDK to load
    setTimeout(checkSDK, 100);
  }
};

// Initialize
initAdobeSDK();

// Render React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

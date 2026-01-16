import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Try to import Adobe Add-on SDK (will work when running in Adobe Express)
let addOnUISdk = null;

// Function to show modal dialogs using Adobe SDK
const showAdobeDialog = async (variant, title, description) => {
  if (addOnUISdk) {
    try {
      const result = await addOnUISdk.app.showModalDialog({
        variant: variant, // "information", "confirmation", "warning", "error"
        title: title,
        description: description,
        buttonLabels: { primary: "OK" }
      });
      return result;
    } catch (error) {
      console.log("Error showing Adobe modal:", error);
    }
  }
  return null;
};

// Initialize Adobe SDK when running in Adobe Express
const initAdobeSDK = async () => {
  try {
    // Dynamic import for Adobe SDK (only works in Adobe Express environment)
    const sdk = await import("https://express.adobe.com/static/add-on-sdk/sdk.js");
    addOnUISdk = sdk.default;
    await addOnUISdk.ready;
    console.log("Adobe Add-on SDK is ready!");
    
    // Make dialog functions available globally
    window.showAdobeDialog = showAdobeDialog;
    window.adobeSDKReady = true;
  } catch (error) {
    console.log("Running outside Adobe Express - using fallback notifications");
    window.adobeSDKReady = false;
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

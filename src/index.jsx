import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Adobe SDK
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

// Initialize Adobe SDK
const initAdobeSDK = async () => {
  if (typeof window !== 'undefined') {
    try {
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
      console.log("Running outside Adobe Express - using fallback notifications");
      console.error("SDK initialization error:", error);
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

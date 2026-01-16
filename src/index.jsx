import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Function to show notification (uses Adobe SDK if available, otherwise toast)
const showNotification = async (type, title, message) => {
  // Wait a bit for SDK to initialize if it's still loading
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Try Adobe SDK first (when running in Adobe Express)
  if (window.adobeSDKReady && window.showAdobeDialog) {
    try {
      const variant = type === 'error' ? 'error' : 'information';
      await window.showAdobeDialog(variant, title, message);
      return;
    } catch (error) {
      console.error('Adobe dialog failed:', error);
    }
  }
  
  // Fallback to react-toastify for development
  console.log('Using toast notification (Adobe SDK not available)');
  if (type === 'error') {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
    });
  } else {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
    });
  }
};

function App() {
  const [contentText, setContentText] = useState('');
  const [contentType, setContentType] = useState('');
  const [complianceCheck, setComplianceCheck] = useState(false);
  const [copyrightCheck, setCopyrightCheck] = useState(false);
  const [brandImages, setBrandImages] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [sdkStatus, setSdkStatus] = useState('checking');
  const dropdownRef = useRef(null);

  // Check SDK status
  useEffect(() => {
    const checkSDKStatus = () => {
      if (window.adobeSDKReady) {
        setSdkStatus('ready');
        console.log('Adobe SDK is ready in App component');
      } else {
        setSdkStatus('fallback');
        console.log('Using fallback mode (development)');
      }
    };
    
    // Check immediately
    checkSDKStatus();
    
    // Also check after a delay to catch late initialization
    const timer = setTimeout(checkSDKStatus, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBrandImagesChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setBrandImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate content type selection
    if (!contentType) {
      await showNotification('error', 'Validation Error', 'Please choose the type of content you want to create');
      // Highlight dropdown
      if (dropdownRef.current) {
        dropdownRef.current.classList.add('highlight');
        setTimeout(() => {
          dropdownRef.current.classList.remove('highlight');
        }, 3000);
      }
      return;
    }
    
    // Show success message
    await showNotification('success', 'Success', 'Created Successfully');
    setShowActions(true);
  };

  const handlePostToLinkedIn = async () => {
    await showNotification('success', 'LinkedIn', 'Posted on LinkedIn Successfully');
  };

  const handleSendToSlack = async () => {
    await showNotification('success', 'Slack', 'Message sent successfully');
  };

  return (
    <div className="app-container">
      <div className="content-area">
        <h1 className="app-title">✨ Content Publisher</h1>
        {sdkStatus === 'fallback' && (
          <p className="sdk-status">⚠️ Development Mode (Toast Notifications)</p>
        )}
        {sdkStatus === 'ready' && (
          <p className="sdk-status" style={{color: '#4caf50'}}>✅ Adobe Express Mode</p>
        )}
      </div>

      <div className="bottom-section">
        <form onSubmit={handleSubmit} className="input-form" noValidate>
          <div className="input-box">
            <textarea
              className="message-input"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="✍️ Type your content here..."
            />
            
            <div className="input-toolbar">
              <div className="dropdown-container" ref={dropdownRef}>
                <span className="dropdown-text">
                  {contentType === 'image' ? '🖼️ Image ▼' : contentType === 'design' ? '🎨 Design ▼' : 'Content Type ▼'}
                </span>
                <select
                  className="toolbar-dropdown"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="image">🖼️ Image</option>
                  <option value="design">🎨 Design</option>
                </select>
              </div>
              
              <label className="toolbar-icon" title="Upload Brand Images">
                <input
                  type="file"
                  className="hidden-file-input"
                  onChange={handleBrandImagesChange}
                  accept="image/*"
                  multiple
                />
                📎
                {brandImages && <span className="file-count">{Array.from(brandImages).length}</span>}
              </label>
              
              <button
                type="button"
                className={`toolbar-icon ${complianceCheck ? 'active' : ''}`}
                onClick={() => setComplianceCheck(!complianceCheck)}
                title="Compliance Check"
              >
                {complianceCheck ? '✅' : '☑️'}
              </button>
              
              <button
                type="button"
                className={`toolbar-icon ${copyrightCheck ? 'active' : ''}`}
                onClick={() => setCopyrightCheck(!copyrightCheck)}
                title="Copyright Check"
              >
                {copyrightCheck ? '©️' : '©'}
              </button>
            </div>
          </div>
          
          <button type="submit" className="create-button">
            ✨ Create
          </button>
        </form>

        {showActions && (
          <div className="action-buttons">
            <button
              className="action-button linkedin-button"
              onClick={handlePostToLinkedIn}
              type="button"
            >
              🔗 Post on LinkedIn
            </button>
            <button
              className="action-button slack-button"
              onClick={handleSendToSlack}
              type="button"
            >
              💬 Send Message to Slack
            </button>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;

import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Function to show notification (uses Adobe SDK if available, otherwise toast)
const showNotification = async (type, title, message) => {
  // Try Adobe SDK first (when running in Adobe Express)
  if (window.adobeSDKReady && window.showAdobeDialog) {
    const variant = type === 'error' ? 'error' : 'information';
    await window.showAdobeDialog(variant, title, message);
  } else {
    // Fallback to react-toastify for development
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
  }
};

function App() {
  const [contentText, setContentText] = useState('');
  const [contentType, setContentType] = useState('');
  const [complianceCheck, setComplianceCheck] = useState(false);
  const [copyrightCheck, setCopyrightCheck] = useState(false);
  const [brandImages, setBrandImages] = useState(null);
  const [brandLogo, setBrandLogo] = useState(null);
  const [brandGuidelines, setBrandGuidelines] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [isDraggingImages, setIsDraggingImages] = useState(false);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const dropdownRef = useRef(null);

  const handleBrandImagesChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setBrandImages(files);
    }
  };

  const handleBrandLogoChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setBrandLogo(files);
    }
  };

  const handleBrandGuidelinesChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setBrandGuidelines(files);
    }
  };

  const handleDragOverImages = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingImages(true);
  };

  const handleDragLeaveImages = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingImages(false);
  };

  const handleDropImages = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingImages(false);

    const files = e.dataTransfer.files;
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      const dataTransfer = new DataTransfer();
      imageFiles.forEach(file => dataTransfer.items.add(file));
      setBrandImages(dataTransfer.files);
    }
  };

  const handleDragOverLogo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingLogo(true);
  };

  const handleDragLeaveLogo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingLogo(false);
  };

  const handleDropLogo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingLogo(false);

    const files = e.dataTransfer.files;
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      // For logo, take only the first file
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(imageFiles[0]);
      setBrandLogo(dataTransfer.files);
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
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
    await showNotification('success', 'Slack', 'Posted on Slack Successfully');
  };

  // LinkedIn Icon SVG
  const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  // Slack Icon SVG
  const SlackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 5.042a2.528 2.528 0 0 1-2.52-2.52A2.528 2.528 0 0 1 18.956 0a2.528 2.528 0 0 1 2.523 2.522v2.52h-2.523zM18.956 6.313a2.528 2.528 0 0 1 2.523 2.521 2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V6.313zM15.165 2.522A2.528 2.528 0 0 1 17.686 0a2.528 2.528 0 0 1 2.521 2.522 2.528 2.528 0 0 1-2.521 2.523h-2.521V2.522zM15.165 8.834a2.528 2.528 0 0 1 2.521-2.521 2.528 2.528 0 0 1 2.521 2.521v6.313A2.528 2.528 0 0 1 17.686 24a2.528 2.528 0 0 1-2.521-2.522V8.834z"/>
    </svg>
  );

  return (
    <div className="app-container">
      <div className="content-area">
        <h1 className="app-title">✨ Content Publisher</h1>
        
        {showActions && (
          <div className="centered-action-buttons">
            <button
              className="action-button linkedin-button"
              onClick={handlePostToLinkedIn}
              type="button"
            >
              <LinkedInIcon />
              <span>Post on LinkedIn</span>
            </button>
            <button
              className="action-button slack-button"
              onClick={handleSendToSlack}
              type="button"
            >
              <SlackIcon />
              <span>Post on Slack</span>
            </button>
          </div>
        )}
      </div>

      <div className="bottom-section">
        <div className="input-form">
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
              
              <label className="toolbar-icon" title="Upload Brand Guidelines">
                <input
                  type="file"
                  className="hidden-file-input"
                  onChange={handleBrandGuidelinesChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  multiple
                />
                ➕
                {brandGuidelines && <span className="file-count">{Array.from(brandGuidelines).length}</span>}
              </label>
            </div>
          </div>
          
          <button type="button" className="create-button" onClick={handleSubmit}>
            ✨ Create
          </button>
        </div>
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

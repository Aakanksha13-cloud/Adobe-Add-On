import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Toast configuration
const toastConfig = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

function App() {
  const [contentText, setContentText] = useState('');
  const [contentType, setContentType] = useState('');
  const [complianceCheck, setComplianceCheck] = useState(false);
  const [copyrightCheck, setCopyrightCheck] = useState(false);
  const [brandImages, setBrandImages] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const dropdownRef = useRef(null);

  const handleBrandImagesChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setBrandImages(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate content type selection
    if (!contentType) {
      toast.error('Please choose the type of content you want to create', toastConfig);
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
    toast.success('Created Successfully', toastConfig);
    setShowActions(true);
  };

  const handlePostToLinkedIn = () => {
    toast.success('Posted on LinkedIn Successfully', toastConfig);
  };

  const handleSendToSlack = () => {
    toast.success('Message sent successfully', toastConfig);
  };

  return (
    <div className="app-container">
      <div className="content-area">
        <h1 className="app-title">✨ Content Publisher</h1>
      </div>

      <div className="bottom-section">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-box">
            <textarea
              className="message-input"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="✍️ Type your content here..."
              required
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

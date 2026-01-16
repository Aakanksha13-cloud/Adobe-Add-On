import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [contentText, setContentText] = useState('');
  const [contentType, setContentType] = useState('image');
  const [complianceCheck, setComplianceCheck] = useState(false);
  const [brandImages, setBrandImages] = useState(null);
  const [showActions, setShowActions] = useState(false);

  const handleBrandImagesChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setBrandImages(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate content creation
    setTimeout(() => {
      toast.success('✨ Content Created Successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '12px',
          fontWeight: '600'
        }
      });
      setShowActions(true);
    }, 500);
  };

  const handlePostToLinkedIn = () => {
    const params = {
      text: contentText,
      image: brandImages ? Array.from(brandImages).map(f => f.name).join(', ') : 'No image'
    };
    
    toast.info('🔗 Posting to LinkedIn...', {
      position: "top-center",
      autoClose: 3000,
      style: {
        background: 'linear-gradient(135deg, #0077b5 0%, #005885 100%)',
        color: 'white',
        borderRadius: '12px',
        fontWeight: '600'
      }
    });
  };

  const handleSendToSlack = () => {
    const params = {
      text: contentText
    };
    
    toast.info('💬 Sending to Slack...', {
      position: "top-center",
      autoClose: 3000,
      style: {
        background: 'linear-gradient(135deg, #611f69 0%, #4a154b 100%)',
        color: 'white',
        borderRadius: '12px',
        fontWeight: '600'
      }
    });
  };

  return (
    <div className="app-container">
      <div className="content-area">
        <h1 className="app-title">✨ Content Publisher</h1>
        
        <div className="info-section">
          <div className="info-card">
            <div className="info-icon">🖼️</div>
            <div className="info-text">
              <strong>Content Type</strong>
              <span>Select image or design from input controls</span>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon">📎</div>
            <div className="info-text">
              <strong>Brand Assets</strong>
              <span>{brandImages ? `${Array.from(brandImages).length} file(s) selected` : 'No files selected'}</span>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon">{complianceCheck ? '✅' : '☑️'}</div>
            <div className="info-text">
              <strong>Compliance</strong>
              <span>{complianceCheck ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-wrapper">
            <textarea
              className="message-input"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="✍️ Type your content here..."
              required
              rows="3"
            />
            <div className="input-actions">
              {/* Content Type Dropdown */}
              <div className="action-icon-wrapper">
                <select
                  className="icon-dropdown"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  title="Content Type"
                >
                  <option value="image">🖼️</option>
                  <option value="design">🎨</option>
                </select>
              </div>
              
              {/* Brand Images Upload */}
              <div className="action-icon-wrapper">
                <label className="icon-button" title="Upload Brand Images">
                  <input
                    type="file"
                    className="hidden-file-input"
                    onChange={handleBrandImagesChange}
                    accept="image/*"
                    multiple
                  />
                  📎
                </label>
              </div>
              
              {/* Compliance Check Toggle */}
              <div className="action-icon-wrapper">
                <button
                  type="button"
                  className={`icon-button ${complianceCheck ? 'active' : ''}`}
                  onClick={() => setComplianceCheck(!complianceCheck)}
                  title="Compliance Check"
                >
                  {complianceCheck ? '✅' : '☑️'}
                </button>
              </div>
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
            >
              🔗 LinkedIn
            </button>
            <button
              className="action-button slack-button"
              onClick={handleSendToSlack}
            >
              💬 Slack
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;

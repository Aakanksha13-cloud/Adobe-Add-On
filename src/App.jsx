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
        
        <div className="form-section">
          <div className="form-group">
            <label className="form-label">📝 Content Type</label>
            <select
              className="select-input"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              <option value="image">🖼️ Image</option>
              <option value="design">🎨 Design</option>
            </select>
          </div>

          <div className="form-group">
            <div className="toggle-container">
              <span className="toggle-label">✅ Compliance Check</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={complianceCheck}
                  onChange={(e) => setComplianceCheck(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">🎯 Brand Assets</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                className="file-input"
                onChange={handleBrandImagesChange}
                accept="image/*"
                multiple
              />
              <div className="file-input-text">
                📎 Upload Images
              </div>
              {brandImages && (
                <div className="file-name">
                  {Array.from(brandImages).length} file(s) selected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-container">
            <textarea
              className="message-input"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="✍️ Type your content here..."
              required
              rows="3"
            />
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

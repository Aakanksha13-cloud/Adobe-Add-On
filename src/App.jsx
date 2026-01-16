import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [contentText, setContentText] = useState('');
  const [contentType, setContentType] = useState('');
  const [complianceCheck, setComplianceCheck] = useState(false);
  const [copyrightCheck, setCopyrightCheck] = useState(false);
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
    
    // Validate content type selection
    if (!contentType) {
      toast.error('Please choose the type of content you want to create', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
          color: 'white',
          borderRadius: '12px',
          fontWeight: '600'
        }
      });
      // Highlight dropdown
      document.querySelector('.dropdown-container').classList.add('highlight');
      setTimeout(() => {
        document.querySelector('.dropdown-container').classList.remove('highlight');
      }, 2000);
      return;
    }
    
    // Simulate content creation
    setTimeout(() => {
      toast.success('Created Successfully', {
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
    toast.success('Posted on LinkedIn Successfully', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: 'linear-gradient(135deg, #0077b5 0%, #005885 100%)',
        color: 'white',
        borderRadius: '12px',
        fontWeight: '600'
      }
    });
  };

  const handleSendToSlack = () => {
    toast.success('Message sent successfully', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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
      </div>

      <div className="bottom-section">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-box">
            {/* Text Input */}
            <textarea
              className="message-input"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              placeholder="✍️ Type your content here..."
              required
            />
            
            {/* Icons Row Below Input */}
            <div className="input-toolbar">
              <div className="dropdown-container">
                <span className="dropdown-text">
                  {contentType ? (contentType === 'image' ? '🖼️ Image' : '🎨 Design') : 'Content Type ▼'}
                </span>
                <select
                  className="toolbar-dropdown"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  title="Content Type"
                >
                  <option value="" disabled>Select type</option>
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

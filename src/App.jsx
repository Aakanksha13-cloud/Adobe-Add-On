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
      toast.success('Content Created Successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'linear-gradient(135deg, #b8a9d4 0%, #a29cbd 100%)',
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
    
    toast.info(`Posting to LinkedIn\nText: ${params.text}\nImage: ${params.image}`, {
      position: "top-center",
      autoClose: 4000,
      style: {
        background: 'linear-gradient(135deg, #a8d8ea 0%, #88c6db 100%)',
        color: 'white',
        borderRadius: '12px'
      }
    });
  };

  const handleSendToSlack = () => {
    const params = {
      text: contentText
    };
    
    toast.info(`Sending Message to Slack\nMessage: ${params.text}`, {
      position: "top-center",
      autoClose: 4000,
      style: {
        background: 'linear-gradient(135deg, #ffd5e5 0%, #ffb8d4 100%)',
        color: '#6b5b95',
        borderRadius: '12px'
      }
    });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Content Publisher</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Content Text</label>
          <textarea
            className="textarea-input"
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            placeholder="Enter content text..."
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content Type</label>
          <select
            className="select-input"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="image">Image</option>
            <option value="design">Design</option>
          </select>
        </div>

        <div className="form-group">
          <div className="toggle-container">
            <span className="toggle-label">Compliance Check</span>
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
          <label className="form-label">Brand Details</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              className="file-input"
              onChange={handleBrandImagesChange}
              accept="image/*"
              multiple
            />
            <div className="file-input-text">
              Upload Brand Images
            </div>
            {brandImages && (
              <div className="file-name">
                {Array.from(brandImages).map(f => f.name).join(', ')}
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Create Content
        </button>
      </form>

      {showActions && (
        <div className="action-buttons">
          <button
            className="action-button linkedin-button"
            onClick={handlePostToLinkedIn}
          >
            Post to LinkedIn
          </button>
          <button
            className="action-button slack-button"
            onClick={handleSendToSlack}
          >
            Send to Slack
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;

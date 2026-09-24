import { useState } from 'react';
import api from '../api';

const TenderDownloadModal = ({ isOpen, onClose, tender }) => {
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !tender) return null;

  const doc = tender.documents && tender.documents.length > 0 ? tender.documents[0] : null;
  const docUrl = doc ? doc.url : '#';
  const tenderTitle = tender.title || 'Tender Document';
  const tenderRef = tender.reference || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !mobileNumber.trim()) {
      setError('Please fill in both Email Address and Mobile Number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/tender-downloads', {
        tenderId: tender._id,
        tenderTitle,
        tenderReference: tenderRef,
        email: email.trim(),
        mobileNumber: mobileNumber.trim(),
        documentUrl: docUrl,
      });

      setSubmitted(true);

      // Trigger document download / open in new tab
      if (docUrl && docUrl !== '#') {
        const link = document.createElement('a');
        link.href = docUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        setMobileNumber('');
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tender-modal-overlay" onClick={onClose}>
      <div className="tender-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="tender-modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <h2 className="tender-modal-title">Download Tender Document</h2>

        <div className="tender-modal-body">
          {/* Left Column: Form */}
          <div className="tender-modal-form-col">
            <p className="tender-modal-instruction">
              Please provide your contact details to download the tender document for{' '}
              <strong>{tenderTitle}</strong>.
            </p>

            {error && <div className="tender-modal-error">{error}</div>}
            {submitted && (
              <div className="tender-modal-success">
                Thank you! Download is starting automatically...
              </div>
            )}

            <form onSubmit={handleSubmit} className="tender-modal-form">
              <div className="tender-form-group">
                <label htmlFor="tender-email">Email Address *</label>
                <input
                  id="tender-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || submitted}
                />
              </div>

              <div className="tender-form-group">
                <label htmlFor="tender-mobile">Mobile Number *</label>
                <input
                  id="tender-mobile"
                  type="tel"
                  required
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  disabled={loading || submitted}
                />
              </div>

              <div className="tender-modal-actions">
                <button
                  type="submit"
                  className="tender-submit-btn"
                  disabled={loading || submitted}
                >
                  {loading ? 'Processing...' : 'Submit & Download'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Preview */}
          <div className="tender-modal-preview-col">
            <h3 className="tender-preview-title">Document Preview</h3>
            <div className="tender-preview-box">
              {docUrl && docUrl.endsWith('.pdf') ? (
                <iframe
                  src={`${docUrl}#toolbar=0`}
                  title={`Preview of ${tenderTitle}`}
                  className="tender-pdf-frame"
                />
              ) : docUrl && docUrl !== '#' ? (
                <div className="tender-preview-fallback">
                  <div className="pdf-doc-icon">📄</div>
                  <p className="pdf-doc-name">{doc?.name || tenderTitle}</p>
                  <span className="pdf-doc-type">Tender PDF Document</span>
                </div>
              ) : (
                <div className="tender-preview-fallback">
                  <p>Document preview unavailable</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderDownloadModal;

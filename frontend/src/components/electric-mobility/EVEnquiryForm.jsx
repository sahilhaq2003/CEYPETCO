import { useState } from 'react';
import { Send, CircleCheck, CircleAlert } from 'lucide-react';
import { contactService } from '../../services/contentService';
import { EV_LOCATIONS, INFO_REQUIRED_OPTIONS } from './electricMobilityContent';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  vehicleMake: '',
  vehicleModel: '',
  connectorType: '',
  informationRequired: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EVEnquiryForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Please enter your full name.';
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.phone.trim()) nextErrors.phone = 'Please enter a contact number.';
    if (!form.informationRequired) {
      nextErrors.informationRequired = 'Please select the information you require.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      setStatus('idle');
      return;
    }

    const messageLines = [
      'EV Charging / Electric Mobility enquiry',
      `Preferred charging location: ${form.location || 'Not specified'}`,
      `Vehicle make: ${form.vehicleMake || 'Not specified'}`,
      `Vehicle model: ${form.vehicleModel || 'Not specified'}`,
      `Connector type: ${form.connectorType || 'Not specified'}`,
      `Information required: ${form.informationRequired}`,
      form.message.trim() ? `Additional message: ${form.message.trim()}` : '',
    ].filter(Boolean);

    setStatus('submitting');
    try {
      await contactService.create({
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: `EV Charging Enquiry — ${form.location || 'General'}`,
        message: messageLines.join('\n'),
      });
      setStatus('success');
      setForm(INITIAL_FORM);
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="em-section em-enquiry" id="ev-enquiry" aria-labelledby="em-enquiry-title">
      <div className="container em-enquiry-grid">
        <div className="em-enquiry-copy">
          <p className="em-eyebrow">EV information request</p>
          <h2 id="em-enquiry-title">Request Current EV Charging Information</h2>
          <p>
            Submit your details below to request current information about
            CEYPETCO EV charging. You can ask about charging availability,
            tariffs, charger type, connector compatibility, charging capacity,
            operating hours or payment information.
          </p>
          <p className="em-enquiry-note">
            Please note that station availability, tariffs and specifications may
            change. Information provided in response to an enquiry reflects the
            position at the time of response.
          </p>
        </div>

        <form className="em-form" onSubmit={handleSubmit} noValidate>
          <div className="em-form-row">
            <div className="em-field">
              <label htmlFor="em-full-name">
                Full Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="em-full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={updateField('fullName')}
                aria-required="true"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'em-full-name-error' : undefined}
              />
              {errors.fullName && (
                <span className="em-field-error" id="em-full-name-error" role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>
            <div className="em-field">
              <label htmlFor="em-email">
                Email Address <span aria-hidden="true">*</span>
              </label>
              <input
                id="em-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={updateField('email')}
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'em-email-error' : undefined}
              />
              {errors.email && (
                <span className="em-field-error" id="em-email-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="em-form-row">
            <div className="em-field">
              <label htmlFor="em-phone">
                Contact Number <span aria-hidden="true">*</span>
              </label>
              <input
                id="em-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={updateField('phone')}
                aria-required="true"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'em-phone-error' : undefined}
              />
              {errors.phone && (
                <span className="em-field-error" id="em-phone-error" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>
            <div className="em-field">
              <label htmlFor="em-location">Preferred Charging Location</label>
              <select id="em-location" name="location" value={form.location} onChange={updateField('location')}>
                <option value="">Not sure / General enquiry</option>
                {EV_LOCATIONS.map((location) => (
                  <option value={location} key={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="em-form-row">
            <div className="em-field">
              <label htmlFor="em-vehicle-make">Vehicle Make</label>
              <input
                id="em-vehicle-make"
                name="vehicleMake"
                type="text"
                autoComplete="off"
                value={form.vehicleMake}
                onChange={updateField('vehicleMake')}
              />
            </div>
            <div className="em-field">
              <label htmlFor="em-vehicle-model">Vehicle Model</label>
              <input
                id="em-vehicle-model"
                name="vehicleModel"
                type="text"
                autoComplete="off"
                value={form.vehicleModel}
                onChange={updateField('vehicleModel')}
              />
            </div>
          </div>

          <div className="em-form-row">
            <div className="em-field">
              <label htmlFor="em-connector">Connector Type</label>
              <input
                id="em-connector"
                name="connectorType"
                type="text"
                autoComplete="off"
                placeholder="Enter your vehicle's connector type"
                value={form.connectorType}
                onChange={updateField('connectorType')}
              />
            </div>
            <div className="em-field">
              <label htmlFor="em-information-required">
                Information Required <span aria-hidden="true">*</span>
              </label>
              <select
                id="em-information-required"
                name="informationRequired"
                value={form.informationRequired}
                onChange={updateField('informationRequired')}
                aria-required="true"
                aria-invalid={Boolean(errors.informationRequired)}
                aria-describedby={errors.informationRequired ? 'em-information-required-error' : undefined}
              >
                <option value="">Select an option</option>
                {INFO_REQUIRED_OPTIONS.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.informationRequired && (
                <span className="em-field-error" id="em-information-required-error" role="alert">
                  {errors.informationRequired}
                </span>
              )}
            </div>
          </div>

          <div className="em-field">
            <label htmlFor="em-message">Message</label>
            <textarea
              id="em-message"
              name="message"
              rows="4"
              value={form.message}
              onChange={updateField('message')}
            />
          </div>

          <div className="em-form-actions">
            <button type="submit" className="em-btn em-btn--primary" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting...' : 'Request Charging Information'}
              {status !== 'submitting' && <Send size={16} aria-hidden="true" />}
            </button>
            <div className="em-form-status" aria-live="polite">
              {status === 'success' && (
                <span className="em-form-success">
                  <CircleCheck size={18} aria-hidden="true" />
                  Thank you. Your request has been submitted and will be reviewed.
                </span>
              )}
              {status === 'error' && (
                <span className="em-form-error">
                  <CircleAlert size={18} aria-hidden="true" />
                  We could not submit your request. Please try again later.
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EVEnquiryForm;

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { EV_FAQS } from './electricMobilityContent';

const EVFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="em-section em-faq" id="ev-faq" aria-labelledby="em-faq-title">
      <div className="container em-faq-grid">
        <div className="em-faq-heading">
          <p className="em-eyebrow">Frequently asked questions</p>
          <h2 id="em-faq-title">Electric Mobility FAQs</h2>
          <p>
            General answers about CEYPETCO EV charging. Check current details
            with the station before planning a charging stop.
          </p>
        </div>
        <div className="em-faq-list">
          {EV_FAQS.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            const panelId = `em-faq-panel-${index}`;
            const buttonId = `em-faq-button-${index}`;
            return (
              <div className={`em-faq-item${isOpen ? ' is-open' : ''}`} key={question}>
                <h3 className="em-faq-question">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span>{question}</span>
                    <span className="em-faq-toggle" aria-hidden="true">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                </h3>
                <div
                  className="em-faq-answer"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p>{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EVFAQ;

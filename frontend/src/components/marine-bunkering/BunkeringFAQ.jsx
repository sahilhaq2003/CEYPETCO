import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { BUNKERING_FAQS } from './bunkeringContent';

const BunkeringFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="mb-section mb-faq"
      id="bunkering-faq"
      aria-labelledby="mb-faq-title"
    >
      <div className="container mb-faq-grid">
        <div className="mb-faq-intro">
          <p className="mb-eyebrow">Helpful answers</p>
          <h2 id="mb-faq-title">Frequently asked questions</h2>
          <p>
            Essential information about marine bunkering and CEYPETCO&apos;s
            bunkering activities.
          </p>
        </div>
        <div className="mb-faq-list">
          {BUNKERING_FAQS.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                className={`mb-faq-item${isOpen ? ' is-open' : ''}`}
                key={question}
              >
                <h3 className="mb-faq-question">
                  <button
                    type="button"
                    id={`mb-faq-button-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`mb-faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>{question}</span>
                    <span className="mb-faq-icon" aria-hidden="true">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                </h3>
                <div
                  className="mb-faq-panel"
                  id={`mb-faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`mb-faq-button-${index}`}
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

export default BunkeringFAQ;

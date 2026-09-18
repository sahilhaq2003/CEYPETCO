import { CircleAlert } from 'lucide-react';

const EVNotice = () => (
  <section className="em-notice" aria-labelledby="em-notice-title">
    <div className="container em-notice-inner">
      <span className="em-notice-icon" aria-hidden="true">
        <CircleAlert size={26} />
      </span>
      <div className="em-notice-copy">
        <h2 id="em-notice-title">Before You Travel</h2>
        <p>
          Charging infrastructure, operational availability and technical
          specifications may vary by location. Before relying on a charging
          point, confirm its status, charger type, connector compatibility,
          charging capacity, operating hours, price and payment method.
        </p>
      </div>
    </div>
  </section>
);

export default EVNotice;

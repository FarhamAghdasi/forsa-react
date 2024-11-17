import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [showMore, setShowMore] = useState({});

  // Fetch data from the API
  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await axios.get('https://bk.acoachgroup.com/pricePlan-get', {
          headers: { domain: 'acoachgroup.com' } // Adjust headers as required
        });
        const { data, code, msg } = response.data;
        if (code === 1) {
          setPlans(data); // Set fetched data to the state
        } else {
          console.error(msg);
        }
      } catch (error) {
        console.error('Error fetching pricing plans:', error);
      }
    };
    fetchPricingPlans();
  }, []);

  const handleShowMore = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-heading center-heading">
          <h2 className="section-title">قیمت گذاری وبسایت</h2>
          <p className="section-subtitle">قیمت انواع خدمات سایت را در زیر ببینید</p>
        </div>
        <div className="row">
          {plans.map((plan) => (
            <div key={plan.id} className="col-lg-4 price-plan">
              <div className="plan">
                <div className="plan-cost">
                  <img src={plan.pic} alt={plan.title} className="pricing-img icon" />
                  {plan.position === '2' && <div className="ribbon">محبوبترین</div>}
                  <p className="plan-price">{plan.price} تومان</p>
                  <h4 className="plan-name">{plan.title}</h4>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <div className="plan-details">
                  <ul className="plan-list">
                    {showMore[plan.id] ? (
                      plan.features.map((feature, index) => (
                        <li key={index} className={`plan-feat ${feature.isRed ? 'red' : ''}`}>
                          {feature.name}
                        </li>
                      ))
                    ) : (
                      plan.features.slice(0, 10).map((feature, index) => (
                        <li key={index} className={`plan-feat ${feature.isRed ? 'red' : ''}`}>
                          {feature.name}
                        </li>
                      ))
                    )}
                  </ul>
                  <button
                    className="showmore-btn"
                    onClick={() => handleShowMore(plan.id)}
                  >
                    {showMore[plan.id] ? 'نمایش کمتر' : plan.moreBtnTitle}
                  </button>
                  <a href={plan.orderBtnUrl} className="order-btn">
                    {plan.orderBtnTitle}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

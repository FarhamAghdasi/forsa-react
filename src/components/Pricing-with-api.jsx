import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [plans, setPricing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_IMAGE_URL = "https://bk.acoachgroup.com"; // آدرس پایه برای تصاویر

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const response = await axios.get('https://bk.acoachgroup.com/pricePlan-get', {
          headers: {
            domain: 'acoachgroup.com', // دامنه بدون پروتکل
          },
        });

        const result = response.data;
        setPricing(result.data); // ذخیره داده‌های تمام پلن‌ها
      } catch (err) {
        setError('خطا در اتصال به سرور');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricingPlans();
  }, []);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // ویژگی‌های مشترک برای هر پلن
  const features = [
    "سئو تکنیکال",
    "ریسپانسیو",
    "لایه امنیتی SSL",
    "پشتیبان گیری روزانه",
    "اتصال به درگاه پرداخت",
    "دسته بندی محصولات",
    "تعریف مدیر با سطح دسترسی متفاوت",
    "تغییر وضعیت نمایش کالا",
    "قابلیت انبارداری",
    "افزودن نامحدود کالا به سایت",
    "طراحی UI/UX اختصاصی",
    "طراحی کاتالوگ دیجیتال"
  ];

  return (
    <section className="pricing-2 mega-section section-bg-shade" id="pricing">
      <div className="container">
        <div className="section-heading center-heading">
          <h2 className="section-title">قیمت گذاری وبسایت</h2>
          <p className="section-subtitle">قیمت انواع خدمات سایت را در زیر ببینید</p>
        </div>
        <div className="row">
          {plans.map((plan) => (
            <div key={plan.id} className="col-12 col-md-9 col-lg-4 mx-auto price-plan">
              <div className="plan">
                <div className="plan-cost">
                  <div className="pricing-img icon">
                    <img
                      src={`${BASE_IMAGE_URL}${plan.pic}`}
                      alt={plan.title}
                      className="img-fluid"
                    />
                  </div>
                  <h2 className="plan-name">{plan.title}</h2>

                  {plan.position === '2' && <div className="ribbon">محبوب‌ترین</div>}
                  <p className="plan-price">
                    {plan.discount > 0 && (
                      <span className="original-price">{plan.price} تومان</span>
                    )}
                    <br />
                    <div className="size2rem">
                      {plan.price - plan.discount} تومان
                    </div>
                  </p>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-details">
                  <ul>
                    {features.map((feature, index) => (
                      <li key={index}>
                        {plan.features.includes(feature) ? '✔️' : '❌'} {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="plan-cta">
                    <a className="ma-btn-rounded ma-btn-primary" href={plan.moreBtnUrl}>
                      {plan.moreBtnTitle}
                    </a>
                  </div>
                  <div className="plan-cta">
                    <a className="ma-btn-rounded ma-btn-primary" href={plan.orderBtnUrl}>
                      {plan.orderBtnTitle}
                    </a>
                  </div>
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

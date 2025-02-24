import React, { useEffect, useState } from 'react';
import IFaq from '../assets/images/faq/faq_illustration.png';
import axios from 'axios';

const Faq = () => {
  const [faq, setFaq] = useState([]); // داده‌های بخش FAQ
  const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطا

  // تابع بارگذاری داده‌ها
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.get('https://bk.acoachgroup.com/faq-get', {
          headers: {
            domain: 'acoachgroup.com', // ارسال هدر دامنه بدون پروتکل
          },
        });

        const result = response.data;

        if (result.code === '1' && result.data.length > 0) {
          // فقط 4 داده اول را انتخاب کنید
          setFaq(result.data.slice(0, 6)); // ذخیره 4 آیتم اول
        } else {
          setError('داده‌ای یافت نشد.');
        }
      } catch (err) {
        setError('خطا در اتصال به سرور'); // مدیریت خطا
      } finally {
        setIsLoading(false); // پایان بارگذاری
      }
    };

    fetchFaq();
  }, []);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>; // نمایش وضعیت بارگذاری
  }

  if (error) {
    return <div>{error}</div>; // نمایش پیام خطا
  }

  return (
    <section className="faq mega-section section-bg-shade" id="faq">
      <div className="shape-top-left"></div>
      <div className="shape-bottom-right"></div>
      <div className="pattern-top-end-dir"></div>
      <div className="pattern-bottom-start-dir"></div>
      <div className="container">
        <div className="section-heading center-heading">
          <h2 className="section-title wow">بیشترین سوالات پرسیده شده</h2>
          <p className="section-subtitle wow fadeInUp" data-wow-delay=".5s">
            برخی سوالات متداول در زیر آمده است.
          </p>
          <div className="line line-solid-main-color wow fadeIn" data-wow-delay="1s"></div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-5">
            <div className="faq-img wow fadeInUp" data-wow-delay="0.2s">
              <img className="img-fluid" src={IFaq} alt="FAQ Illustration" />
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="faq-accordion wow fadeInUp" id="accordion" data-wow-delay="0.4s">
              {faq.map((item, index) => (
                <div className="card mb-2" key={item.id}>
                  <div className="card-header" id={`heading-${index + 1}`}>
                    <h5 className="mb-0 faq-title">
                      <button
                        className={`btn btn-link faq-btn ${index + 1}`}
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${index + 1}`}
                        aria-expanded={index === 0 ? 'true' : 'false'}
                        aria-controls={`collapse-${index + 1}`}
                      >
                        {item.title}
                      </button>
                    </h5>
                  </div>
                  <div
                    className={`collapse ${index === 0 ? 'show' : ''}`}
                    id={`collapse-${index + 1}`}
                    aria-labelledby={`heading-${index + 1}`}
                    data-bs-parent="#accordion"
                  >
                    <div className="card-body">
                      <p className="faq-answer">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;

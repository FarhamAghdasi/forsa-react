import React, { useEffect, useState } from 'react';
import AboutImage1 from '../assets/images/about/about-1_photo.png';

const About = () => {
  const [aboutData, setAboutData] = useState(null); // داده‌های بخش درباره ما
  const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطا

  // تابع بارگذاری داده‌ها
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/about-get', {
          method: 'GET',
          headers: {
            domain: 'acoachgroup.com', // دامنه بدون پروتکل
          },
        });

        const result = await response.json();

        if (result.code === '1' && result.data.length > 0) {
          setAboutData(result.data[0]); // ذخیره اولین آیتم موجود
        } else {
          setError('داده‌ای یافت نشد.');
        }
      } catch (err) {
        setError('خطا در اتصال به سرور'); // مدیریت خطا
      } finally {
        setIsLoading(false); // پایان بارگذاری
      }
    };

    fetchAbout();
  }, []);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>; // نمایش وضعیت بارگذاری
  }

  if (error) {
    return <div>{error}</div>; // نمایش پیام خطا
  }

  return (
    <section className="about mega-section" id="about">
      <div className="container">
        <div className="content-block">
          <div className="row">
            {/* تصویر و توضیحات کوتاه */}
            <div
              className="col-12 col-lg-6 d-flex align-items-center about-col wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="img-area">
                <div className="photo-banner-end">
                  <i className="fas fa-pen-nib icon"></i>
                  <p className="banner-text">
                    {aboutData?.shortDesc || 'توضیحی در مورد بخش درباره ما'}
                  </p>
                </div>
                <img
                  className="about-img img-fluid"
                  src={`https://bk.acoachgroup.com/${aboutData?.pic}` || AboutImage1} // تصویر اصلی
                  alt={aboutData?.title || 'Our vision'}
                />
              </div>
            </div>

            {/* عنوان و توضیحات کامل */}
            <div
              className="col-12 col-lg-6 d-flex align-items-center about-col wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="text-area">
                <h2 className="about-title">
                  {aboutData?.title || 'درباره ما'}
                </h2>
                <p className="about-text">
                  {aboutData?.Description || 'توضیحات بیشتری در دسترس نیست.'}
                </p>
                <a className="ma-btn-primary" href="#0">
                  بیشتر بدانید
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

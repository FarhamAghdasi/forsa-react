import React, { useEffect, useState } from 'react';
import AboutImage1 from '../assets/images/about/about-1_photo.png';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // افزودن وضعیت خطا

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const domain = 'acoachgroup.com'; // دامنه سایت بدون پروتکل

        const response = await fetch(`https://bk.acoachgroup.com/about-get?domain=${domain}`, {  
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.code === "1") {
          if (data.data && data.data.length > 0) {
            setAboutData(data.data[0]); // ذخیره داده‌ها در وضعیت (فرض می‌کنیم داده‌ها یک شیء هستند)
          } else {
            throw new Error(data.msg || 'No about data available');  // در صورت عدم وجود داده، پیغام msg را نمایش می‌دهیم
          }
        } else {
          throw new Error(`Error fetching about data: ${data.msg}`);
        }
      } catch (error) {
        setError(error.message);  // ذخیره پیام خطا
        console.error('Error:', error);
      } finally {
        setLoading(false);  // پایان بارگذاری
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // وضعیت بارگذاری
  }

  if (error) {
    return <div>Error: {error}</div>;  // نمایش خطا در صورت وجود
  }

  return (
    <section className="about mega-section" id="about">
      <div className="container">
        <div className="content-block">
          <div className="row">
            <div className="col-12 col-lg-6 d-flex align-items-center about-col wow fadeInUp" data-wow-delay="0.2s">
              <div className="img-area">
                <div className="photo-banner-end">
                  <i className="fas fa-pen-nib icon"></i>
                  <p className="banner-text">
                    {aboutData?.shortDesc}
                  </p>
                </div>
                <img className="about-img img-fluid" src={aboutData?.pic || AboutImage1} alt="Our vision" />
              </div>
            </div>
            <div className="col-12 col-lg-6 d-flex align-items-center about-col wow fadeInUp" data-wow-delay="0.4s">
              <div className="text-area">
                <span className="tag-line">صاحبان کسب و کارهای نوپا !</span>
                <h2 className="about-title">
                  {aboutData?.title || 'درباره ما'}
                </h2>
                <p className="about-text">
                  {aboutData?.description || 'توضیحات بیشتری در دسترس نیست.'}
                </p>
                <a className="ma-btn-primary" href="#0">بیشتر بدانید</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

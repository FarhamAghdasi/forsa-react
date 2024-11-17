import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]); // ذخیره داده‌های خدمات
  const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // ارسال درخواست GET به API
        const response = await fetch('https://bk.acoachgroup.com/service-get?pageNo=1&pageSize=6', {
          method: 'GET',
          headers: {
            'domain': 'acoachgroup.com', // دامنه API
          },
        });
        const result = await response.json();

        if (result.code === 1) {
          setServices(result.data); // ذخیره داده‌های خدمات
        } else {
          console.error('خطا در دریافت خدمات:', result.msg);
        }
      } catch (error) {
        console.error('خطا در اتصال به سرور:', error);
      } finally {
        setIsLoading(false); // پایان بارگذاری
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>; // وضعیت بارگذاری
  }

  return (
    <section className="services text-center mega-section section-bg-shade" id="services">
      <div className="container">
        <div className="section-heading center-heading">
          <h2 className="section-title wow">خدمات ما</h2>
          <p className="section-subtitle wow fadeInUp" data-wow-delay=".5s">
            خدمات کلی ما را در زیر مشاهده می نمایید.
          </p>
          <div className="line line-solid-main-color wow fadeIn" data-wow-delay="1s"></div>
        </div>

        <div className="row services-row">
          {services.map((service) => (
            <div className="col-12 col-md-6 col-lg-4 mx-auto" key={service.id}>
              <div className="service-box wow fadeInUp" data-wow-delay="0.2s">
                <div className="service-icon">
                  <img className="img-icon" src={service.pic} alt={service.title} draggable="false" />
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-text">{service.description}</p>
                  {service.btnTitle && service.btnUrl && (
                    <a className="ma-btn-primary" href={service.btnUrl}>{service.btnTitle}</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="see-more-area wow fadeInUp" data-wow-delay="0.8s">
          <a className="ma-btn-primary" href="#0">مشاهده تمام خدمات</a>
        </div>
      </div>
    </section>
  );
}

export default Services;

import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]); // ذخیره داده‌های خدمات
  const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطا

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/service-get?pageNo=1&pageSize=6', {
          method: 'GET',
          headers: {
            'domain': 'acoachgroup.com', // دامنه API
          },
        });

        const result = await response.json();

        if (result.code === "1") {
          // فیلتر کردن خدماتی که ID آنها یکی از مقادیر مشخص شده است
          const allowedIds = [23, 24, 25, 26, 27, 28]; // شناسه‌های مجاز
          const filteredServices = result.data.filter(service =>
            allowedIds.includes(service.id) // بررسی اینکه id در لیست allowedIds باشد
          );

          // انتخاب 4 سرویس اول از فیلتر شده‌ها
          setServices(filteredServices); 
        } else {
          setError("خطا در دریافت اطلاعات");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("خطا در دریافت اطلاعات");
      } finally {
        setIsLoading(false); // وضعیت بارگذاری را به false تغییر می‌دهیم
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>; // وضعیت بارگذاری
  }

  if (error) {
    return <div>{error}</div>; // نمایش پیام خطا
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

                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-text">{service.description}</p>
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
};

export default Services;

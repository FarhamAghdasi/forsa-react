import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';

const Hero = () => {
  const [banners, setBanners] = useState([]); // برای ذخیره بنرها
  const [isLoading, setIsLoading] = useState(true); // برای نمایش وضعیت بارگذاری

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // ارسال درخواست GET به API
        const response = await fetch('https://bk.acoachgroup.com/banner-get?Position=hero', {
          method: 'GET',
          headers: {
            'domain': 'acoachgroup.com', // دامنه API
          },
        });
        const result = await response.json();

        if (result.code === "1") {
          setBanners(result.data); // ذخیره داده‌های بنر
        } else {
          console.error('خطا در دریافت بنرها:', result.msg);
        }
      } catch (error) {
        console.error('خطا در اتصال به سرور:', error);
      } finally {
        setIsLoading(false); // پایان بارگذاری
      }
    };

    fetchBanners();
  }, []);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>; // وضعیت بارگذاری
  }

  return (
    <section className="page-hero hero-swiper-slider d-flex align-items-center" id="page-hero">
      <div className="social-icons">
        <div className="sc-wraper dir-row sc-flat">
          <ul className="sc-list">
            <li className="sc-item" title="واتساپ">
              <a className="sc-link" href="#0"><i className="fab fa-whatsapp sc-icon"></i></a>
            </li>
            <li className="sc-item" title="تلگرام">
              <a className="sc-link" href="#0"><i className="fab fa-telegram sc-icon"></i></a>
            </li>
            <li className="sc-item" title="ایسنتاگرام">
              <a className="sc-link" href="#0"><i className="fab fa-instagram sc-icon"></i></a>
            </li>
            <li className="sc-item" title="تماس">
              <a className="sc-link" href="#0"><i className="fa fa-phone sc-icon"></i></a>
            </li>
          </ul>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        className="slider"
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.domainId}>
            <div className="slide-content">
              <div className="slider-bg">
                <div className="overlay-color"></div>
                <img
                  className="slider-bg-img"
                  src={`https://bk.acoachgroup.com${banner.pic}`} // استفاده از URL کامل برای تصویر
                  alt={banner.title}
                />
              </div>
              <div className="container">
                <div className="hero-text-area">
                  <div className="row justify-content-center">
                    <div className="col-12 col-lg-8 mx-auto">
                      <h1 className="slide-title" data-splitting="words">
                        {banner.title}
                      </h1>
                    </div>
                    <div className="col-9 col-md-10 col-lg-8 mx-auto">
                      <p className="slide-subtitle narrow-centerd-text" data-splitting="words">
                        {banner.description}
                      </p>
                    </div>
                    <div className="col-12">
                      <div className="cta-links-area">
                        <a className="ma-btn-primary cta-link cta-link-primary" href={banner.btnUrl}>
                          {banner.btnTitle}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev">
        <div className="left-arrow"><i className="fas fa-arrow-right icon"></i></div>
      </div>
      <div className="swiper-button-next">
        <div className="right-arrow"><i className="fas fa-arrow-left icon"></i></div>
      </div>
    </section>
  );
};

export default Hero;

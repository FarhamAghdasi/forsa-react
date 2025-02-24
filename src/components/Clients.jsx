import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";

const Clients = () => {
  const [clients, setclient] = useState([]); // لیست مطالب
  const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطا
  // تابع بارگذاری داده‌ها
  useEffect(() => {
    const fetchclient = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/client-get', {
          method: 'GET',
          headers: {
            domain: 'acoachgroup.com', // دامنه بدون پروتکل
          },
        });

        const result = await response.json();

        if (result.code === '1' && result.data.length > 0) {
          setclient(result.data);
        } else {
          setError('داده‌ای یافت نشد.');
        }
      } catch (err) {
        setError('خطا در اتصال به سرور'); // مدیریت خطا
      } finally {
        setIsLoading(false); // پایان بارگذاری
      }
    };

    fetchclient();
  }, []);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>; // نمایش وضعیت بارگذاری
  }

  if (error) {
    return <div>{error}</div>; // نمایش پیام خطا
  }

  return (
    <section className="our-clients elf-section" id="our-clients">
      <div className="container">
        <div className="section-heading d-none">
          <h4 className="section-title">مشتریان بزرگ ما</h4>
          <p className="section-subtitle">نظرات کاربران ما را مشاهده کنید</p>
          <div className="line-gradient-color"></div>
        </div>
        <div className="clients-logos d-flex align-items-center justify-content-around flex-wrap">
        <Swiper
  loop={true}
  slidesPerView={5} // Default value
  spaceBetween={20}  // فاصله بین اسلایدها
  breakpoints={{
    768: { // For screens larger than 768px
      slidesPerView: 5,
    },
    0: { // For smaller screens
      slidesPerView: 1,
    },
  }}
>

            {clients.map((client) => (
              <SwiperSlide key={client.id}>
                <div className="client-logo wow fadeInUp" data-wow-delay=".2s">
                  <a href={client.url ? client.url : "#0"}>
                    <img
                      className="img-fluid logo"
                      src={`https://bk.acoachgroup.com${client.pic}`}
                      alt={client.title}
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Clients;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://bk.acoachgroup.com/client-get', {
          headers: { domain: 'acoachgroup.com' },
        });
        if (response.data.code === 1) {
          setClients(response.data.data); // Assuming `data` contains the array of client objects
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

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
                      src={client.pic}
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

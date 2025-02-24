import React, { useEffect, useState } from 'react';
import Image from '../assets/images/about/about-1_photo.png';

const Bootcamp = () => {
  const [bootcamp, setBootcamp] = useState(null); // داده‌های بخش درباره ما
  const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطا

  // تابع بارگذاری داده‌ها
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/section-get', {
          method: 'GET',
          headers: {
            domain: 'acoachgroup.com', // دامنه بدون پروتکل
          },
        });

        const result = await response.json();
        console.log(result);

        if (result.code === '1' && result.data.length > 0) {
          setBootcamp(result.data[2]); // ذخیره آیتم سوم
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

  // استخراج مزایا به صورت لیست
  const advantages = bootcamp.description
    .split('مزایای شرکت در بوت کمپ:')[1] // متن بعد از عنوان "مزایا"
    ?.split('شرایط شرکت در بوت کمپ:')[0] // متن قبل از "شرایط"
    ?.trim()
    ?.split('\n') // جدا کردن خطوط
    ?.filter(line => line.trim().startsWith('1-') || line.trim().startsWith('2-') || line.trim().startsWith('3-') || line.trim().startsWith('4-')) // فیلتر موارد لیست

  return (
    <section className="about" id="bootcamp">
      <div className="container">
        <div className="content-block">
          <div className="row">
            <div className="col-12 col-lg-6 d-flex align-items-center">
              <div className="text-area">
                <span className="tag-line">{bootcamp.title || 'عنوان بوت کمپ'}</span>
                <h2 className="about-title">{bootcamp.shortDesc || 'توضیح کوتاه'}</h2>
                <p className="about-text">
                  {bootcamp.description?.split('مزایای شرکت در بوت کمپ:')[0].trim() || 'توضیحات کلی'}
                </p>
                <h2 className="advantages-title">مزایای شرکت در بوت کمپ</h2>
                <ul className="advantages-list">
                  {advantages?.map((adv, index) => (
                    <li key={index}>{adv.trim().substring(2)}</li>
                  ))}
                </ul>
                <a className="ma-btn-primary" href={bootcamp.btnurl || 'https://www.farhamaghdasi.ir/'}>
                  {bootcamp.btntitle || 'عنوان دکمه'}
                </a>
              </div>
            </div>
            <div className="col-12 col-lg-6 d-flex align-items-center">
              <div className="img-area">
                <img
                  className="img-fluid about-img"
                  src={`https://bk.acoachgroup.com/${bootcamp.pic}` || Image}
                  alt={bootcamp.title || 'عنوان'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bootcamp;

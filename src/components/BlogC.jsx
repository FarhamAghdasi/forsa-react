import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from '../assets/images/blog/blog-img20.png';
import SContact from '../assets/images/icons/contact1.svg';
import SCalender from '../assets/images/icons/calender1.svg';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const BlogC = () => {
  const [posts, setPosts] = useState([]); // لیست مطالب
  const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطا
  const location = useLocation();

  // تابع بارگذاری داده‌ها
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/blog-get', {
          method: 'GET',
          headers: {
            domain: 'acoachgroup.com', // دامنه بدون پروتکل
          },
        });

        const result = await response.json();

        if (result.code === '1' && result.data.length > 0) {
          setPosts(result.data.slice(0, 3)); // ذخیره 3 مطلب اول
        } else {
          setError('داده‌ای یافت نشد.');
        }
      } catch (err) {
        setError('خطا در اتصال به سرور'); // مدیریت خطا
      } finally {
        setIsLoading(false); // پایان بارگذاری
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>; // نمایش وضعیت بارگذاری
  }

  if (error) {
    return <div>{error}</div>; // نمایش پیام خطا
  }

  return (
    <section className="testimonials testimonials-3-col mhmd mega-section section-bg-shade" id="blog">
      <div className="container">
        <div className="section-heading center-heading">
          <h2 className="section-title wow">وبلاگ</h2>
          <p className="section-subtitle wow fadeInUp" data-wow-delay=".5s">
            بخشی از بهترین مطالب وبسایت ما را مشاهده کنید !
          </p>
          <div className="line line-solid-main-color wow fadeIn" data-wow-delay="1s"></div>
        </div>
        <div className="blog1-scetion-area sp1">
          <div className="container">
            <div className="row">
              {posts.map((post) => (
                <div className="col-lg-4 col-md-6" key={post.id}>
                  <div className="blog-author-boxarea">
                    <div className="img1">
                      <img src={`https://bk.acoachgroup.com${post.pic}` || Image} alt={post.title} />
                    </div>
                    <div className="content-area">
                      <div className="tags-area">
                        <ul>
                          <li><a href="#"><img src={SContact} alt="" />{post.auther}</a></li>
                          <li><a href="#"><img src={SCalender} alt="" />{post.publishDate}</a></li>
                        </ul>
                      </div>
                      <a href={post.url}>{post.title}</a>
                      <p>{post.shortDescription}</p>
                      <a href={post.url} className="readmore">
                        ادامه مطلب <i className="fas fa-arrow-left icon"></i>
                      </a>
                    </div>
                  </div>
                  <div className="space30"></div>
                </div>
              ))}
              {location.pathname !== '/blog' && (
                <a className="underline-none d-flex justify-content-center align-items-center" href='/blog'>
                  <a className="ma-btn-primary">مشاهده سایر مقالات</a>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogC;

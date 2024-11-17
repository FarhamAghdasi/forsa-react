import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SContact from '../assets/images/icons/contact1.svg';
import SCalender from '../assets/images/icons/calender1.svg';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const BlogC = ({ slice }) => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Fetch data from Blog API using GET method
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bk.acoachgroup.com/blog-get', {
          params: {
            domain: 'acoachgroup.com', // Replace with the actual domain
            // No need to send token as per your requirement
          }
        });

        if (response.data.code === 1) {
          setPosts(response.data.data);
          console.log(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
              {posts.slice(0, Number(slice)).map((post) => (
                <div className="col-lg-4 col-md-6" key={post.id}>
                  <div className="blog-author-boxarea">
                    <div className="img1">
                      <img src={post.pic} alt={post.title} /> {/* Use API image if available */}
                    </div>
                    <div className="content-area">
                      <div className="tags-area">
                        <ul>
                          <li><a href="#"><img src={SContact} alt="" />{post.auther}</a></li>
                          <li><a href="#"><img src={SCalender} alt="" />{post.publishDate}</a></li>
                        </ul>
                      </div>
                      <a href={`blog/${post.id}`}>{post.title}</a>
                      <p>{post.shortDescription}</p>
                      <a href={`blog/${post.id}`} className="readmore">
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

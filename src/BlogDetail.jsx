// BlogDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ApiStatus from './ApiStatus';

import contactIcon from './assets/images/icons/contact1.svg';
import calendarIcon from './assets/images/icons/calender1.svg';
import checkIcon from './assets/images/icons/check4.svg';
import instagramIcon from './assets/images/icons/instagram.svg';
import facebookIcon from './assets/images/icons/facebook.svg';
import linkedinIcon from './assets/images/icons/linkedin.svg';
import commentImg1 from './assets/images/blog/comments-img1.png';
import commentImg2 from './assets/images/blog/comments-img2.png';

import {
  Footer,
  Breadcrumb,
  BlogContent,
  Header,
} from "./components";

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // آدرس پایه API را تنظیم کنید
  const API_BASE_URL = 'https://your-api-domain.com/api';

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        // دریافت اطلاعات پست
        const postResponse = await axios.get(`${API_BASE_URL}/posts/${id}`);
        setPost(postResponse.data);

        // دریافت نظرات مربوط به پست
        const commentsResponse = await axios.get(`${API_BASE_URL}/posts/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (err) {
        setError('خطا در دریافت اطلاعات پست.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'نام کوچک الزامی است';
    if (!formData.lastName) newErrors.lastName = 'نام خانوادگی الزامی است';
    if (!formData.email) newErrors.email = 'ایمیل الزامی است';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'ایمیل معتبر نیست';
    if (!formData.phone) newErrors.phone = 'تلفن الزامی است';
    if (!formData.subject) newErrors.subject = 'موضوع الزامی است';
    if (!formData.message) newErrors.message = 'پیام الزامی است';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // ارسال فرم به API
      const response = await axios.post(`${API_BASE_URL}/posts/${id}/comments`, formData);
      console.log('Response:', response.data);
      
      // اضافه کردن نظر جدید به لیست نظرات
      setComments([...comments, response.data]);

      // پاک کردن فرم پس از ارسال موفق
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('خطا در ارسال فرم.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <ApiStatus message="در حال بارگزاری"/>
  }

  if (error) {
    return <ApiStatus message={error}/>
  }

  if (!post) {
    return <ApiStatus message="پستی وجود ندارد"/>
  }

  return (
    <>
      <Header />
      <Breadcrumb title={post.title} />
      <div className="blog-author-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="blog-author-sidebar-area heading2">
                <div className="tags-area">
                  <ul>
                    <li>
                      <a href="#"><img src={contactIcon} alt="" /> {post.author.name}</a>
                    </li>
                    <li>
                      <a href="#"><img src={calendarIcon} alt="" /> {new Date(post.created_at).toLocaleDateString('fa-IR')}</a>
                    </li>
                  </ul>
                </div>
                <h2>{post.title}</h2>
                <div className="space34"></div>
                {post.image && (
                  <div className="img1">
                    <img src={post.image} alt="blog" />
                  </div>
                )}
                <div className="space24"></div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className="space50"></div>
                
                {/* اجزای کلیدی کمپین PPC - فرض بر این است که این اطلاعات از API دریافت می‌شوند */}
                {post.key_components && (
                  <>
                    <h3>اجزای کلیدی کمپین موفق PPC</h3>
                    <div className="space24"></div>
                    {post.key_components.map((component, index) => (
                      <div className="right-area" key={index}>
                        <div className="check1">
                          <img src={checkIcon} alt="check icon" />
                        </div>
                        <div className="content">
                          <p>
                            <span>{component.title}:</span> {component.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                <div className="space50"></div>
                {post.additional_image && (
                  <div className="img1">
                    <img src={post.additional_image} alt="blog" />
                  </div>
                )}
                <div className="space50"></div>
                
                {/* استراتژی‌ها */}
                {post.strategies && (
                  <>
                    <h3>استراتژی هایی برای به حداکثر رساندن بازگشت سرمایه PPC</h3>
                    {post.strategies.map((strategy, index) => (
                      <div className="right-area" key={index}>
                        <div className="check1">
                          <img src={checkIcon} alt="check icon" />
                        </div>
                        <div className="content">
                          <p>
                            <span>{strategy.title}:</span> {strategy.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                <div className="space50"></div>

                {post.quote && (
                  <div className="pera-box">
                    <p>"{post.quote.text}"</p>
                    <div className="space16"></div>
                    {post.quote.instagram && <a href={post.quote.instagram}><img src={instagramIcon} alt="instagram" /></a>}
                  </div>
                )}

                <div className="space50"></div>

                {post.conclusion && (
                  <>
                    <h3>{post.conclusion.title}</h3>
                    <p>{post.conclusion.text}</p>
                  </>
                )}

                <div className="social-tags">
                  <div className="tags">
                    <h4>برچسب ها:</h4>
                    <ul>
                      {post.tags.map((tag, index) => (
                        <li key={index}><a href={`/tags/${tag}`}>{tag}</a></li>
                      ))}
                    </ul>
                  </div>
                  <div className="social">
                    <h4>اجتماعی:</h4>
                    <ul>
                      <li><a href={post.social.facebook}><img src={facebookIcon} alt="facebook" /></a></li>
                      <li><a href={post.social.instagram}><img src={instagramIcon} alt="instagram" /></a></li>
                      <li><a href={post.social.linkedin}><img src={linkedinIcon} alt="linkedin" /></a></li>
                    </ul>
                  </div>
                </div>

                <div className="space50"></div>

                <h3>نظرات وبلاگ ({comments.length})</h3>
                <div className="space32"></div>
                {comments.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div className={`comments-boxarea ${index === comments.length - 1 ? 'box2' : ''}`}>
                      <div className="comments-boxes">
                        <div className="comments-author-box">
                          <div className="img3">
                            <img src={item.author.avatar || (index === 0 ? commentImg1 : commentImg2)} alt="comment"/>
                          </div>
                          <div className="content">
                            <a href="#" className="name">{item.author.name}</a>
                            <a href="#" className="date">{new Date(item.created_at).toLocaleDateString('fa-IR')}</a>
                          </div>
                        </div>
                        <a href="#" className="reply">بازخورد</a>
                      </div>
                      <div className="space16"></div>
                      <p>"{item.comment}"</p>
                    </div>
                    <div className="space30"></div>
                  </React.Fragment>
                ))}

                <div className="space50"></div>

                <div className="contact-form-area">
                  <h4>پاسخ دهید</h4>
                  <div className="space16"></div>
                  <p>اطلاعات تماس واضح از جمله شماره تلفن...</p>
                  <div className="space12"></div>

                  <div className="row">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        {["نام کوچک", "نام خانوادگی", "ایمیل", "تلفن", "موضوع", "پیام"].map((placeholder, index) => (
                          <div className={`col-lg-${index < 4 ? "6" : "12"}`} key={index}>
                            <div className="input-area">
                              {index < 5 ? (
                                <input
                                  type={index === 2 ? "email" : (index === 3 ? "number" : "text")}
                                  name={
                                    index === 0 ? "firstName" :
                                    index === 1 ? "lastName" :
                                    index === 2 ? "email" :
                                    index === 3 ? "phone" :
                                    "subject"
                                  }
                                  placeholder={placeholder}
                                  value={
                                    index === 0 ? formData.firstName :
                                    index === 1 ? formData.lastName :
                                    index === 2 ? formData.email :
                                    index === 3 ? formData.phone :
                                    formData.subject
                                  }
                                  onChange={handleChange}
                                />
                              ) : (
                                <textarea
                                  name="message"
                                  placeholder={placeholder}
                                  value={formData.message}
                                  onChange={handleChange}
                                ></textarea>
                              )}
                              {errors[
                                index === 0 ? "firstName" :
                                index === 1 ? "lastName" :
                                index === 2 ? "email" :
                                index === 3 ? "phone" :
                                index === 4 ? "subject" :
                                "message"
                              ] && (
                                <p className="red">
                                  {errors[
                                    index === 0 ? "firstName" :
                                    index === 1 ? "lastName" :
                                    index === 2 ? "email" :
                                    index === 3 ? "phone" :
                                    index === 4 ? "subject" :
                                    "message"
                                  ]}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="col-lg-12">
                        <div className="space24"></div>
                        <div className="input-area">
                          <button type="submit" className="header-btn1" disabled={isSubmitting}>
                            {isSubmitting ? 'در حال ارسال...' : 'ارسال'}<span><i className="fas fa-arrow-left icon"></i></span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BlogDetail;

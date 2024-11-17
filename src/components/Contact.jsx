import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    UserName: '',
    UserEmail: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [contactInfo, setContactInfo] = useState({ title: '', description: '', pic: '' });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get('https://bk.acoachgroup.com/contactUs-get', {
          headers: { domain: 'acoachgroup.com' },
        });

        if (response.data.code === 1) {
          const { title, description, pic } = response.data.data;
          setContactInfo({ title, description, pic });
        }
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.UserName) newErrors.UserName = 'نام الزامی است';
    if (!formData.UserEmail) {
      newErrors.UserEmail = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.UserEmail)) {
      newErrors.UserEmail = 'ایمیل نامعتبر است';
    }
    if (!formData.phone) {
      newErrors.phone = 'شماره تماس الزامی است';
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'شماره تماس نامعتبر است';
    }
    if (!formData.subject) newErrors.subject = 'عنوان الزامی است';
    if (!formData.message) newErrors.message = 'پیام الزامی است';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('backend/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setSuccessMessage('پیام شما با موفقیت ارسال شد');
          setFormData({ UserName: '', UserEmail: '', phone: '', subject: '', message: '' });
          setErrors({});
        } else {
          setErrors(result.errors);
        }
      } else {
        setErrors({ form: 'خطایی در ارسال پیام پیش آمده است' });
      }
    } catch (error) {
      setErrors({ form: 'خطایی در ارسال پیام پیش آمده است' });
    }
  };

  return (
    <section className="contact-us mega-section" id="contact-us">
      <div className="container">
        <div className="section-heading center-heading">
          <h2 className="section-title wow">{contactInfo.title}</h2>
          <p className="section-subtitle wow fadeInUp" data-wow-delay=".5s">
            {contactInfo.description}
          </p>
          {contactInfo.pic && <img src={contactInfo.pic} alt="Contact us" />}
          <div className="line line-solid-main-color wow fadeIn" data-wow-delay="1s"></div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-9 mx-auto wow fadeInUp" data-wow-delay="0.4s">
            <div className="main-form-wraper">
              <form className="main-form" id="contact-us-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="input-wraper">
                      <input
                        className="text-input"
                        id="user-name"
                        name="UserName"
                        type="text"
                        value={formData.UserName}
                        onChange={handleChange}
                      />
                      <label htmlFor="user-name">نام<span className="req">*</span></label>
                      <span className={`b-border ${errors.UserName ? 'active' : ''}`}></span>
                      <i></i>
                      <span className={`error-msg ${errors.UserName ? 'active' : ''}`}>{errors.UserName}</span>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="input-wraper">
                      <input
                        className="text-input"
                        id="user-email"
                        name="UserEmail"
                        type="email"
                        value={formData.UserEmail}
                        onChange={handleChange}
                      />
                      <label htmlFor="user-email">ایمیل<span className="req">*</span></label>
                      <span className={`b-border ${errors.UserEmail ? 'active' : ''}`}></span>
                      <i></i>
                      <span className={`error-msg ${errors.UserEmail ? 'active' : ''}`}>{errors.UserEmail}</span>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="input-wraper">
                      <input
                        className="text-input"
                        id="user-phone"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <label htmlFor="user-phone">شماره تماس<span className="req">*</span></label>
                      <span className={`b-border ${errors.phone ? 'active' : ''}`}></span>
                      <i></i>
                      <span className={`error-msg ${errors.phone ? 'active' : ''}`}>{errors.phone}</span>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="input-wraper">
                      <input
                        className="text-input"
                        id="msg-subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      <label htmlFor="msg-subject">عنوان<span className="req">*</span></label>
                      <span className={`b-border ${errors.subject ? 'active' : ''}`}></span>
                      <i></i>
                      <span className={`error-msg ${errors.subject ? 'active' : ''}`}>{errors.subject}</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-wraper">
                      <textarea
                        className="text-input"
                        id="msg-text"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      <label htmlFor="msg-text">پیام شما<span className="req">*</span></label>
                      <span className={`b-border ${errors.message ? 'active' : ''}`}></span>
                      <i></i>
                      <span className={`error-msg ${errors.message ? 'active' : ''}`}>{errors.message}</span>
                    </div>
                  </div>
                  <div className="submit-wraper">
                    <button className="ma-btn-primary" id="submit-btn" type="submit" name="UserSubmit">ارسال پیام شما</button>
                  </div>
                  <div className="col-6">
                    <p className="done-msg">{successMessage}</p>
                    <p className={`error-msg ${errors.form ? 'active' : ''}`}>{errors.form}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

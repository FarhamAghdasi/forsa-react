import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mob: '',
    subject: '',
    msg: '',
    extraData: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const [contact, setContact] = useState(null); // لیست مطالب
  const [isLoading, setIsLoading] = useState(true); // وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطا

  // تابع بارگذاری داده‌ها
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/contactUs-get', {
          method: 'GET',
          headers: {
            domain: 'acoachgroup.com', // دامنه بدون پروتکل
          },
        });

        const result = await response.json();

        if (result.code === '1' && result.data.length > 0) {
          setContact(result.data[0]); // استفاده از داده‌های اولین آیتم
        } else {
          setError('داده‌ای یافت نشد.');
        }
      } catch (err) {
        setError('خطا در اتصال به سرور');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, []);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'نام الزامی است';
    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
    }
    if (!formData.mob) {
      newErrors.mob = 'شماره تماس الزامی است';
    } else if (!/^09\d{9}$/.test(formData.mob)) {
      newErrors.mob = 'شماره تماس نامعتبر است';
    }
    if (!formData.subject) newErrors.subject = 'عنوان الزامی است';
    if (!formData.msg) newErrors.msg = 'پیام الزامی است';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const ipAddress = await fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => data.ip)
      .catch(() => 'N/A');

    try {
      const response = await axios.post(
        'https://bk.acoachgroup.com/msg-insert',
        {
          name: formData.name,
          email: formData.email,
          mob: formData.mob,
          subject: formData.subject,
          msg: formData.msg,
          extraData: formData.extraData,
          status: 'new',
          ip: ipAddress,
        },
        {
          headers: {
            domain: 'acoachgroup.com',
          },
        }
      );

      if (response.data.code === 1) {
        setSuccessMessage('پیام شما با موفقیت ارسال شد');
        setFormData({ name: '', email: '', mob: '', subject: '', msg: '', extraData: '' });
        setErrors({});
      } else {
        setErrors({ form: response.data.msg || 'خطایی در ارسال پیام پیش آمده است' });
      }
    } catch (error) {
      setErrors({ form: 'خطایی در ارسال پیام پیش آمده است' });
    }
  };

  return (
    <section className="contact-us mega-section" id="contact-us">
      <div className="container">
        {contact && (
          <div className="section-heading center-heading" key={contact.id}>
            <h2 className="section-title wow">{contact.title || 'تماس با ما'}</h2>
            <p className="section-subtitle wow fadeInUp" data-wow-delay=".5s">
              {contact.description || 'توضیحات'}
            </p>
            {contact.pic && <img src={`https://bk.acoachgroup.com${contact.pic}`} alt={contact.title} style={{display: "none"}} />}
            <div className="line line-solid-main-color wow fadeIn" data-wow-delay="1s"></div>
          </div>
        )}
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
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <label htmlFor="user-name">
                        نام<span className="req">*</span>
                      </label>
                      <span className={`b-border ${errors.name ? 'active' : ''}`}></span>
                      <i></i>
                      <span className={`error-msg ${errors.name ? 'active' : ''}`}>{errors.name}</span>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="input-wraper">
                      <input
                        className="text-input"
                        id="user-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label htmlFor="user-email">
                        ایمیل<span className="req">*</span>
                      </label>
                      <span className={`b-border ${errors.email ? 'active' : ''}`}></span>
                      <i></i>
                      <span className={`error-msg ${errors.email ? 'active' : ''}`}>{errors.email}</span>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="input-wraper">
                      <input
                        className="text-input"
                        id="user-phone"
                        name="mob"
                        type="text"
                        value={formData.mob}
                        onChange={handleChange}
                      />
                      <label htmlFor="user-phone">
                        شماره تماس<span className="req">*</span>
                      </label>
                      <span className={`b-border ${errors.mob ? 'active' : ''}`}></span>
                      <i></i>
                      <span className={`error-msg ${errors.mob ? 'active' : ''}`}>{errors.mob}</span>
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
                      <label htmlFor="msg-subject">
                        عنوان<span className="req">*</span>
                      </label>
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
                        name="msg"
                        value={formData.msg}
                        onChange={handleChange}
                      ></textarea>
                      <label htmlFor="msg-text">
                        پیام شما<span className="req">*</span>
                      </label>
                      <span className={`b-border ${errors.msg ? 'active' : ''}`}></span>
                      <i></i>
                      <span className={`error-msg ${errors.msg ? 'active' : ''}`}>{errors.msg}</span>
                    </div>
                  </div>
                  <div className="submit-wraper">
                    <button className="ma-btn-primary" id="submit-btn" type="submit" name="UserSubmit">
                      ارسال پیام شما
                    </button>
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

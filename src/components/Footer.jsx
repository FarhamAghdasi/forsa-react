import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [quickAccessLinks, setQuickAccessLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  // بارگذاری داده‌های دسترسی سریع از API
  useEffect(() => {
    const fetchQuickAccessLinks = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/quickAccess-get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'domain': 'acoachgroup.com' // یا دامنه مناسب خود را قرار دهید
          }
        });
        const data = await response.json();
        if (data.code === 1) {
          setQuickAccessLinks(data.data);
        } else {
          console.error('Error fetching quick access links:', data.msg);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // بارگذاری داده‌های شبکه‌های اجتماعی از API
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/social-get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'domain': 'acoachgroup.com' // یا دامنه مناسب خود را قرار دهید
          }
        });
        const data = await response.json();
        if (data.code === 1) {
          setSocialLinks(data.data);
        } else {
          console.error('Error fetching social links:', data.msg);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchQuickAccessLinks();
    fetchSocialLinks();
  }, []);

  return (
    <footer className="page-footer dark-color-footer" id="page-footer">
      <div className="container">
        <div className="row footer-cols">
          {/* بخش معرفی شرکت */}
          <div className="col-12 col-md-8 col-lg-4 footer-col wow fadeInUp" data-wow-delay="0.3s">
            <h6 className="footer-col-title">نام</h6>
            <div className="footer-col-content-wrapper">
              <p className="footer-text-about-us">
                شرکت برندینگ آکوچ‌ فعال در حوزه کوچینگ و آموزش دیجیتال مارکتینگ در کسب وکار می باشد.
              </p>
              {/* بخش شبکه‌های اجتماعی */}
              <div className="social-icons">
                <div className="sc-wraper dir-row sc-size-32">
                  <ul className="sc-list">
                    {socialLinks.map((link) => (
                      <li key={link.id} className="sc-item" title={link.title}>
                        <a className="sc-link" href={link.url}>
                          <i className={`fab ${link.icon} sc-icon`}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* بخش دسترسی سریع */}
          <div className="col-12 col-md-6 col-lg-2 footer-col wow fadeInUp" data-wow-delay=".7s">
            <h6 className="footer-col-title">دسترسی سریع</h6>
            <div className="footer-col-content-wrapper">
              <ul className="footer-menu">
                {quickAccessLinks.map((link) => (
                  <li key={link.id} className="footer-menu-item">
                    <a className="footer-menu-link" href={link.url}>
                      <i className={`fab ${link.icon} sc-icon`}></i> {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* بخش اطلاعات تماس */}
          <div className="col-12 col-md-8 col-lg-6 footer-col wow fadeInUp" data-wow-delay=".9s">
            <h6 className="footer-col-title">اطلاعات تماس</h6>
            <div className="footer-col-content-wrapper">
              <div className="contact-info-card">
                <i className="fas fa-envelope icon"></i><a className="text-lowercase info" href="mailto:example@support.com">example@support.com</a>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-globe-africa icon"></i><a className="text-lowercase info" href="#0">www.yoursite.com</a>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt icon"></i><span className="text-lowercase info">اسکندریه، Abc، خیابان Xyz، 5 مصر.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* بخش کپی رایت */}
      <div className="copyrights">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="creadits text-center">
                &copy; تمامی حقوق محفوظ است
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

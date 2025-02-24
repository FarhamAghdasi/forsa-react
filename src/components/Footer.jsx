import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [quickAccessLinks, setQuickAccessLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    website: '',
    address: '',
    tel: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    const fetchQuickAccessLinks = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/quickAccess-get', {
          method: 'GET',
          headers: {
            'domain': 'acoachgroup.com'
          }
        });
        const data = await response.json();
        if (data.code === "1") {
          setQuickAccessLinks(data.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchSocialLinks = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/social-get', {
          method: 'GET',
          headers: {
            'domain': 'acoachgroup.com'
          }
        });
        const data = await response.json();
        if (data.code === "1") {
          setSocialLinks(data.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchContactInfo = async () => {
      try {
        const response = await fetch('https://bk.acoachgroup.com/generalInfo-get', {
          method: 'GET',
          headers: {
            'domain': 'acoachgroup.com'
          }
        });
        const data = await response.json();
        if (data.code === "1" && data.data.length > 0) {
          const info = data.data[0];
          setContactInfo({
            email: info.email,
            website: info.website,
            address: info.address,
            tel: info.tel,
            title: info.title,
            description: info.Description // استفاده از 'Description' از پاسخ API
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchQuickAccessLinks();
    fetchSocialLinks();
    fetchContactInfo();
  }, []);

  return (
    <footer className="page-footer dark-color-footer" id="page-footer">
      <div className="container">
        <div className="row footer-cols">
          {/* بخش معرفی شرکت */}
          <div className="col-12 col-md-8 col-lg-4 footer-col wow fadeInUp" data-wow-delay="0.3s">
            <h6 className="footer-col-title">{contactInfo.title}</h6>
            <div className="footer-col-content-wrapper">
              <p className="footer-text-about-us">{contactInfo.description}</p>
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
                      <i className={`fa ${link.icon} sc-icon`}></i> {link.title}
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
                <i className="fas fa-envelope icon"></i>
                <a className="text-lowercase info" href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-globe-africa icon"></i>
                <a className="text-lowercase info" href={contactInfo.website}>
                  {contactInfo.website}
                </a>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt icon"></i>
                <span className="text-lowercase info">{contactInfo.address}</span>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-phone icon"></i>
                <span className="text-lowercase info">{contactInfo.tel}</span>
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

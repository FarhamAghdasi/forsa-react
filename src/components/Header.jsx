import React, { useEffect, useState } from "react";
// import WhiteLogo from '../assets/images/logo/logo-light.png';
// import DarkLogo from '../assets/images/logo/logo-dark.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isHeaderStandOut, setIsHeaderStandOut] = useState(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const loadingScreen = document.getElementById("loading-screen");

    const fetchMenu = async () => {
      try {
        const response = await fetch("https://bk.acoachgroup.com/menu-get", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "domain": "acoachgroup.com"
          },
        });
        const result = await response.json();
        if (result.code === "1") {
          setMenuItems(result.data);
        }
      } catch (error) {
        console.error("خطا در دریافت منو:", error);
      }
    };
    fetchMenu();
    
    
    // حذف صفحه بارگذاری پس از بارگذاری
    if (loadingScreen) {
      loadingScreen.style.transition = "opacity 0.5s";
      loadingScreen.style.opacity = 0;

      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const innerWidth = window.innerWidth;

      // مدیریت نمایش دکمه Back to Top
      setIsBackToTopVisible(scrollTop > 50);

      // مدیریت برجسته بودن هدر
      setIsHeaderStandOut(innerWidth > 991 ? scrollTop > 50 : true);
    };

    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar-menu-wraper') && !e.target.closest('.menu-toggler-btn')) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
    setIsHeaderStandOut(true); // اطمینان حاصل می‌کند که کلاس header-stand-out اضافه می‌شود
  };

  const handleBackToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavLinkClick = (e, hash) => {
    if (isHomePage) {
      if (hash.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) {
          const navMainHeight = document.querySelector('nav.main-navbar').offsetHeight;
          window.scrollTo({
            top: target.offsetTop - navMainHeight + 1,
            behavior: 'smooth',
          });
        }
      }
    } else {
      e.preventDefault(); // از رفتار پیش‌فرض لینک جلوگیری کنید
      navigate('/'); // به صفحه اصلی بروید
    }
  };

  return (
    <>
      <header className={isHeaderStandOut ? 'page-header menu-on-end header-stand-out' : 'page-header menu-on-end'} id="page-header">
        <div className="container" id="home">
          <nav className="main-navbar" id="main-nav">
            <Link className="navbar-brand" to="/">
              {/* <img className="brand-logo light-logo img-fluid" src={WhiteLogo} alt="لوگو روشن" />
              <img className="brand-logo dark-logo img-fluid" src={DarkLogo} alt="لوگو تیره" /> */}
            </Link>
            <div className={`menu-toggler-btn ${isMenuOpen ? 'close-menu-btn' : ''}`} onClick={handleMenuToggle}>
              <span></span><span></span><span></span>
            </div>
            <div className={`navbar-menu-wraper ${isMenuOpen ? 'show-menu' : ''}`} id="navbar-menu-wraper">
              <ul className="navbar-nav mobile-menu">
              {menuItems.map((item) => (
                  <li className="nav-item" key={item.id}>
                    <Link
                      className="nav-link"
                      to={isHomePage ? `#${item.title}` : `/#${item.title}`}
                      onClick={(e) => handleNavLinkClick(e, `#${item.title}`)}
                    >
                      <i className={`fas ${item.icon || 'fa-home'} icon`}></i>
                      {item.title}
                    </Link>
                  </li>
                ))}

              </ul>
            </div>
            <a className="header-cta ma-btn-primary" href="#0">ورود و ثبت نام</a>
          </nav>
        </div>
      </header>
      <div className="loading-screen" id="loading-screen">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
      <div className={`back-to-top ${isBackToTopVisible ? 'show' : ''}`} onClick={handleBackToTopClick} id="back-to-top">
        <i className="fas fa-arrow-up icon"></i>
      </div>
    </>
  );
}

export default Header;

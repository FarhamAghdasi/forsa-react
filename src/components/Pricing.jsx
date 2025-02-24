import React, { useState } from 'react';

const Pricing = () => {
  const [plans] = useState([
    {
      id: 1,
      title: "سایت ویژه کسب و کار نوپا",
      description: "سایت ویژه برای کسب و کارهای نوپا با امکانات ویژه.",
      price: 1000000,
      discount: 0,
      position: '1',
      moreBtnTitle: "بیشتر بدانید",
      moreBtnUrl: "http://example.com",
      orderBtnTitle: "سفارش",
      orderBtnUrl: "http://example.com/order",
      features: [
        "زبان برنامه نویسی ASP.NET",
        "پیاده سازی سئو تکنیکال",
        "طراحی با استانداردهای گوگل برای سئو پذیری",
        "بهینه سازی کدهای فرانت اند و بک اند",
        "امنیت و Backup  روزانه",
        "سرعت بالای بارگذاری صفحات",
        "لایه امنیتی SSL",
        "قالب ریسپانسیو",
        "عضویت و ورود با شماره موبایل",
        "بخش وبلاگ و مقالات",
        "آموزش تولیدمحتوای بهینه",
        "پشتیبانی فنی",
        "ایمیل اختصاصی",
        "آموزش پنل کاربری",
        "پشتیبان آموزشی برای کمک در درج محتوای اولیه"
      ]
    },
    {
      id: 2,
      title: "سایت فروشگاهی",
      description: "سایت فروشگاهی با ویژگی‌های فروشگاهی خاص.",
      price: 2000000,
      discount: 200000,
      position: '2',
      moreBtnTitle: "بیشتر بدانید",
      moreBtnUrl: "http://example.com",
      orderBtnTitle: "سفارش",
      orderBtnUrl: "http://example.com/order",
      features: [
        "زبان برنامه نویسی ASP.NET",
        "پیاده سازی سئو تکنیکال",
        "طراحی با استانداردهای گوگل برای سئو پذیری",
        "بهینه سازی کدهای فرانت اند و بک اند",
        "امنیت و Backup  روزانه",
        "سرعت بالای بارگذاری صفحات",
        "لایه امنیتی SSL",
        "قالب ریسپانسیو",
        "عضویت و ورود با شماره موبایل",
        "بخش وبلاگ و مقالات",
        "آموزش تولیدمحتوای بهینه",
        "پشتیبانی فنی",
        "ایمیل اختصاصی",
        "آموزش پنل کاربری",
        "پشتیبان آموزشی برای کمک در درج محتوای اولیه",
        "اتصال به درگاه پرداخت",
        "دسته بندی محصولات",
        "تعریف مدیر با سطح دسترسی متفاوت",
        "امکان تغییر وضعیت نمایش کالا",
        "قابلیت انبارداری و گزارش گیری",
        "افزودن نامحدود کالا به سایت"
      ]
    },
    {
      id: 3,
      title: "سایت اختصاصی",
      description: "سایت اختصاصی با ویژگی‌های ویژه برای کسب و کارهای خاص.",
      price: 3000000,
      discount: 500000,
      position: '3',
      moreBtnTitle: "بیشتر بدانید",
      moreBtnUrl: "http://example.com",
      orderBtnTitle: "سفارش",
      orderBtnUrl: "http://example.com/order",
      features: [
        "زبان برنامه نویسی ASP.NET",
        "پیاده سازی سئو تکنیکال",
        "طراحی با استانداردهای گوگل برای سئو پذیری",
        "بهینه سازی کدهای فرانت اند و بک اند",
        "امنیت و Backup  روزانه",
        "سرعت بالای بارگذاری صفحات",
        "لایه امنیتی SSL",
        "قالب ریسپانسیو",
        "عضویت و ورود با شماره موبایل",
        "بخش وبلاگ و مقالات",
        "آموزش تولیدمحتوای بهینه",
        "پشتیبانی فنی",
        "ایمیل اختصاصی",
        "آموزش پنل کاربری",
        "پشتیبان آموزشی برای کمک در درج محتوای اولیه",
        "اتصال به درگاه پرداخت",
        "دسته بندی محصولات",
        "تعریف مدیر با سطح دسترسی متفاوت",
        "امکان تغییر وضعیت نمایش کالا",
        "قابلیت انبارداری و گزارش گیری",
        "افزودن نامحدود کالا به سایت",
        "طراحی UI/UX قالب اختصاصی",
        "طراحی کاتالوگ دیجیتال"
      ]
    }
  ]);

  const allFeatures = [
    "زبان برنامه نویسی ASP.NET",
    "پیاده سازی سئو تکنیکال",
    "طراحی با استانداردهای گوگل برای سئو پذیری",
    "بهینه سازی کدهای فرانت اند و بک اند",
    "امنیت و Backup  روزانه",
    "سرعت بالای بارگذاری صفحات",
    "لایه امنیتی SSL",
    "قالب ریسپانسیو ( بهینه برای موبایل، تبلت و دسکتاپ)",
    "عضویت و ورود با شماره موبایل و بدون نیاز به نام کاربری و کلمه عبور ( و خرید خط اختصاصی پیامکی)",
    "بخش وبلاگ و مقالات",
    "آموزش تولیدمحتوای بهینه",
    "پشتیبانی فنی",
    "ایمیل اختصاصی",
    "آموزش پنل کاربری",
    "پشتیبان آموزشی برای کمک در درج محتوای اولیه",
    "اتصال به درگاه پرداخت",
    "دسته بندی محصولات ",
    "تعریف مدیر با سطح دسترسی متفاوت",
    "امکان تغییر وضعیت نمایش کالا ( عادی، اتمام موجودی، عدم نمایش، شگف¬ت انگیز )",
    "قابلیت انبارداری و گزارش گیری",
    "افزودن نامحدود کالا به سایت",
    "امکان انتخاب قالب های متنوع  از بین چندین قالب کدنویسی شده",
    "افزودن نامحدود صفحه به سایت",
    "طراحی UI/UX  قالب اختصاصی طبق سلیقه شما",
    "آموزش 4 جلسه ای سئو و بهینه سازی",
    "طراحی کاتالوگ دیجیتال"
  ];

  const renderFeatures = (plan) => {
    const includedFeatures = [];
    const excludedFeatures = [];

    // اگر پلان "سایت اختصاصی" باشد، همه ویژگی‌ها را تیک‌دار می‌کنیم
    if (plan.title === "سایت اختصاصی") {
      return allFeatures.map((feature, index) => (
        <li key={index} style={{ color: "green" }}>
          ✔️ {feature}
        </li>
      ));
    }

    // جدا کردن ویژگی‌های موجود و غایب برای دیگر پلان‌ها
    allFeatures.forEach((feature) => {
      if (plan.features.includes(feature)) {
        includedFeatures.push(feature);
      } else {
        excludedFeatures.push(feature);
      }
    });

    return (
      <>
        {includedFeatures.map((feature, index) => (
          <li key={index} style={{ color: "green" }}>
            ✔️ {feature}
          </li>
        ))}
        {excludedFeatures.map((feature, index) => (
          <li key={index} style={{ color: "red" }}>
            ❌ {feature}
          </li>
        ))}
      </>
    );
  };

  return (
    <section className="pricing-2 mega-section section-bg-shade" id="pricing">
      <div className="container">
        <div className="section-heading center-heading">
          <h2 className="section-title">قیمت گذاری وبسایت</h2>
          <p className="section-subtitle">قیمت انواع خدمات سایت را در زیر ببینید</p>
        </div>
        <div className="row">
          {plans.map((plan) => (
            <div key={plan.id} className="col-12 col-md-9 col-lg-4 mx-auto price-plan">
              <div className="plan">
                <div className="plan-cost">
                  <h2 className="plan-name">{plan.title}</h2>
                  {plan.position === '2' && <div className="ribbon">محبوب‌ترین</div>}
                  <p className="plan-price">
                    {plan.discount > 0 && (
                      <span className="original-price">{plan.price} تومان</span>
                    )}
                    <div className="size2rem">
                      {plan.price - plan.discount} تومان
                    </div>
                  </p>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-details">
                  <ul>
                    {renderFeatures(plan)}
                  </ul>
                  <div className="plan-cta">
                    <a className="ma-btn-rounded ma-btn-primary" href={plan.moreBtnUrl}>
                      {plan.moreBtnTitle}
                    </a>
                  </div>
                  <div className="plan-cta">
                    <a className="ma-btn-rounded ma-btn-primary" href={plan.orderBtnUrl}>
                      {plan.orderBtnTitle}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

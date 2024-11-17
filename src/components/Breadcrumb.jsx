import React from 'react'
import elements1 from '../assets/images/blog/elements1.png'
import star2 from '../assets/images/blog/star2.png'
import InnerHeader from '../assets/images/blog/inner-header.png'

const Breadcrumb = () => {
  return (
    <div 
      className="about-header-area" 
      style={{
        backgroundImage: `url(${InnerHeader})`, 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >

        
      <img src={elements1} alt="" className="elements1 animation-key-1" />
      <img src={star2} alt="" className="star2 keyframe5" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="about-inner-header heading9 text-center">
              <h1>وبلاگ ما</h1>
              <a href="index.html">صفحه اصلی <i className="fas fa-chevron-left icon"></i> <span>وبلاگ ما</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb

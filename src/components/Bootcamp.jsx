import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Bootcamp = () => {
  const [bootcampData, setBootcampData] = useState(null)

  useEffect(() => {
    const fetchBootcampData = async () => {
      try {
        const response = await axios.get('https://bk.acoachgroup.com/section-get', {
          headers: {
            domain: 'acoachgroup.com'
          }
        })
        if (response.data.code === 1) {
          setBootcampData(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching bootcamp data:', error)
      }
    }
    fetchBootcampData()
  }, [])

  if (!bootcampData) {
    return <p>Loading...</p>
  }

  return (
    <section className="about" id="bootcamp">
      <div className="container">
        <div className="content-block" id="bootcamp">
          <div className="row">
            <div className="col-12 col-lg-6 d-flex align-items-center order-2 order-lg-0 about-col wow fadeInUp"
              data-wow-delay="0.2s">
              <div className="text-area">
                <span className="tag-line">{bootcampData.title}</span>
                <h2 className="about-title">{bootcampData.shortDesc}</h2>
                <div className="info-items">
                  <div className="row g-0">
                    <div className="col-12">
                      <p className="about-text">{bootcampData.description}</p>
                    </div>
                    <div className="col-12">
                      <ul className="menu-items">
                        {/* Dynamically render each item from the API */}
                        {bootcampData.items?.map((item, index) => (
                          <li key={index} className="info-item">
                            <img className="info-img-icon" src={item.icon} alt="icon" draggable="false" />
                            <div className="info-content">
                              <h5 className="info-title">{item.title}</h5>
                              <p className="info-text">{item.text}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <a className="ma-btn-primary" href={bootcampData.btnurl}>{bootcampData.btntitle}</a>
              </div>
            </div>
            <div className="col-12 col-lg-6 d-flex align-items-center about-col order-0 order-lg-2 wow fadeInUp"
              data-wow-delay="0.4s">
              <div className="img-area">
                <div className="photo-banner-start">
                  <i className="fas fa-code icon"></i>
                  <p className="banner-text">{bootcampData.bannerText}</p>
                </div>
                <img className="img-fluid about-img" src={bootcampData.pic} alt="Bootcamp section" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bootcamp

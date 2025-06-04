import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    

  };
  return (
    <Slider {...settings}>

     <div  className="" >
       <img style={{ height: '500px' }}  className="w-100" src={require('../../images/slider-image-2.jpeg')} alt="Slider 1" />
     </div>


      <div >
       <img  style={{ height: '500px' }} className="w-100"   src={require('../../images/slider-image-1.jpeg')} alt="Slider 1" />
      </div>
      
      <div  className="">
       <img  style={{ height: '500px' }} className="w-100 " src={require('../../images/slider-image-3.jpeg')} alt="Slider 1" />
      </div>

      <div  className="">
       <img  style={{ height: '500px' }} className="w-100 "  src={require('../../images/slider-2.jpeg')} alt="Slider 1" />
      </div>
      
      

    </Slider>
  );
}
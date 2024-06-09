import React from 'react';
import Slider from 'react-slick';
import './Slider.css';

const ImageSlider = ({ photos }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <Slider {...sliderSettings}>
      {photos.map((photo, index) => (
        <div key={index}>
          <img src={photo.photo} alt={`Slide ${index}`} />
        </div>
      ))}
    </Slider>
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa fa-chevron-left"></i>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa fa-chevron-right"></i>
    </div>
  );
};

export default ImageSlider;

import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const imageStyle = {
  width: '90%',
  height: '300px', // Adjust the height as needed
  objectFit: 'cover',
  borderRadius: '10px' // Adjust the border radius as needed
};

const Carousel = () => (
  <ResponsiveCarousel autoPlay infiniteLoop showThumbs={false} className="mt-4">
    <div>
      <img src="https://t4.ftcdn.net/jpg/02/01/32/09/360_F_201320952_VLp2UMPocw9aipDLv0FlW7mJNUAho6H9.jpg" alt="Product 1" style={imageStyle} />
    </div>
    <div>
      <img src="https://img.freepik.com/free-photo/pile-textiles-background_53876-88751.jpg?semt=ais_hybrid" alt="Product 2" style={imageStyle} />
    </div>
    <div>
      <img src="https://static5.depositphotos.com/1005951/487/i/450/depositphotos_4871428-stock-photo-colorful-textile-fabric-material-rolls.jpg" alt="Product 3" style={imageStyle} />
    </div>
  </ResponsiveCarousel>
);

export default Carousel;
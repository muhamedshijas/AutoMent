import React from 'react';
import Slider from 'react-slick';
import { Avatar, Rating, setRef, TextField } from "@mui/material"
const Carousel = ({ reviews }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>

            {
                reviews &&
                reviews.map((review) => (
                    <div key={review.id}>
                        <h3>{review.serviceCenter}</h3>
                        <p>Rating: {review.rating}</p>
                        <p>Review: {review.review}</p>
                    </div>
                ))
            
            }
                

        </Slider>
    );
};

export default Carousel;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./CarouselStyles.css";

import { Autoplay, Pagination } from "swiper";
import CommentItem from "../../shared/components/Comments/CommentItem";

const Carousel = (props) => {
  return (
    <Swiper
      slidesPerView={1.3}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {props.data.map((comment) => (
        <SwiperSlide key={comment.id}>
          <CommentItem
            courseName={comment.courseName}
            recommend={comment.recommend}
            difficulty={comment.difficulty}
            content={comment.content}
            type={props.type}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

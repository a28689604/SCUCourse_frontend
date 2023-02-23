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
      breakpoints={{
        // when window width is >= 640px
        640: {
          // width: 640,
          slidesPerView: 1.3,
          spaceBetween: 0,
        },
        // when window width is >= 768px
        768: {
          // width: 768,
          slidesPerView: 1.4,
          spaceBetween: 0,
        },
      }}
      slidesPerView={1}
      spaceBetween={50}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
    >
      {props.data.map((comment) => (
        <SwiperSlide key={comment.id}>
          <CommentItem
            homePage
            substringReview={props.substringReview}
            courseName={comment.course.courseName}
            recommend={comment.recommend}
            difficulty={comment.difficulty}
            content={comment.review}
            createAt={comment.createAt}
            type={props.type}
            onCommentClick={props.onCommentClick}
            teacherName={comment.teacher.teacherName}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

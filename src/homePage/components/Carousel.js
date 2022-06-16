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
        disableOnInteraction: true,
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
            homePage={props.homePage}
            courseName={comment.course.courseName}
            recommend={comment.recommend}
            difficulty={comment.difficulty}
            content={comment.review}
            createAt={comment.createAt}
            type={props.type}
            onClick={props.onClick}
            teacherName={comment.teacher.teacherName}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

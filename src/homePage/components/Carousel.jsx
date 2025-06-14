import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./CarouselStyles.css";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CommentItem from "../../shared/components/Comments/CommentItem";

const Carousel = props => {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      {/* Enhanced Swiper with better styling */}
      <Swiper
        breakpoints={{
          // Mobile
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // Tablet
          768: {
            slidesPerView: 1.2,
            spaceBetween: 30,
          },
          // Desktop
          1024: {
            slidesPerView: 1.5,
            spaceBetween: 40,
          },
          // Large Desktop
          1280: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
        slidesPerView={1}
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        modules={[Autoplay, Pagination]}
        className="!pb-16"
      >
        {props.data.map(comment => (
          <SwiperSlide key={comment.id} className="!h-auto">
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

      {/* Navigation Instructions */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          滑動查看更多評論 • 點擊卡片查看詳細資訊
        </p>
      </div>
    </div>
  );
};

export default Carousel;

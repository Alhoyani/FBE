import { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { ImageView } from './ImageView';
import cv1 from '@/assets/images/cv1.png';
import cv2 from '@/assets/images/cv2.png';
import cv3 from '@/assets/images/cv1.png';
import cv4 from '@/assets/images/cv2.png';
import { Navigation } from 'swiper/modules';
import { useMediaQuery, useTheme } from '@mui/material';

const CenteredSwiper = forwardRef((_, ref) => {
  const swiperRef = useRef<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useImperativeHandle(ref, () => ({
    slideNext: () => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    },
    slidePrev: () => {
      if (swiperRef.current) {
        swiperRef.current.slidePrev();
      }
    },
  }));

  useEffect(() => {
    swiperRef.current.slideTo(3);

    return () => {};
  }, []);

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      slidesPerView={isMobile ? 2 : 5}
      spaceBetween={0}
      centeredSlides={true}
      //   navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <ImageView image={cv1} />
      </SwiperSlide>
      <SwiperSlide>
        <ImageView image={cv2} />
      </SwiperSlide>
      <SwiperSlide>
        <ImageView image={cv3} />
      </SwiperSlide>
      <SwiperSlide>
        <ImageView image={cv4} />
      </SwiperSlide>
      <SwiperSlide>
        <ImageView image={cv1} />
      </SwiperSlide>
      <SwiperSlide>
        <ImageView image={cv2} />
      </SwiperSlide>
      <SwiperSlide>
        <ImageView image={cv2} />
      </SwiperSlide>
      <SwiperSlide>
        <ImageView image={cv2} />
      </SwiperSlide>
    </Swiper>
  );
});

export default CenteredSwiper;

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import './index.sass'


import { SpinePage } from './componets/SpinePage';
import { FormPage } from './componets/FormPage';
import { WordCloudpage } from './componets/WordCloudpage';
import { SkillPage } from './componets/SkillPage';
import { PageBox } from './componets/pageBox';
import img1 from 'assets/img/bg/bg1.png'
// import gifUrl1 from 'assets/img/bg/gif1.gif'
import img2 from 'assets/img/bg/bg2.png'
// import gifUrl2 from 'assets/img/bg/gif2.gif'
import img3 from 'assets/img/bg/bg3.png'
// import gifUrl3 from 'assets/img/bg/gif3.gif'
import img4 from 'assets/img/bg/bg4.png'
// import gifUrl4 from 'assets/img/bg/gif4.gif'




import animation1 from 'assets/rive/animation1.riv'
import animation2 from 'assets/rive/animation2.riv'
import animation3 from 'assets/rive/animation3.riv'
import animation4 from 'assets/rive/animation4.riv'

// const animation1=   require('assets/rive/animation1.riv')
// const animation2= require('assets/rive/animation2.riv')
// const animation3= require('assets/rive/animation3.riv')
// const animation4= require('assets/rive/animation4.riv')


function CreateRole() {
  // console.log(animation1,'animation1')



  return (
    <div className="App">
      <Swiper className="swiper swiper-no-swiping"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        noSwiping={true}
        direction='vertical'
      >
        <SwiperSlide className="swiper-slide">
          <PageBox url={img1} gifUrl={animation1} onepice={true}>
            <FormPage />
          </PageBox>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <PageBox url={img2} gifUrl={animation2} index={1}>
            <WordCloudpage />
          </PageBox>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <PageBox url={img3} gifUrl={animation3} index={2}>
            <SkillPage />
          </PageBox>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <PageBox url={img4} gifUrl={animation4} index={3}>
            <SpinePage />
          </PageBox>
        </SwiperSlide>
      </Swiper>
    </div>

  );
}

export default CreateRole

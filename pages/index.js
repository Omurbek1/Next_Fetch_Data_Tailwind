
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import Image from 'next/image';
function Home({ posts }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (

    <main className="main p-1 min-h-screen class flex flex-col justify-center items-center">
      <div className="flex justify-around w-full">
        <div className="w-6/12   ml-72">
          <h1 className='font-serif font-black text-4xl leading-32 tracking-widest mt-4' >МУЗЕЙ КЫРГЫЗСТАНА</h1>
          <p className="mt-16 w-9/12 h-28 not-italic font-normal text-2xl ">Dynamic color plays a key role in Material You, creating individualized and expressive experiences for your users and opening up new possibilities for the role of color in your app</p>
          <button className="w-2/5 h-16 text-white bg-sky-700 rounded-3xl mt-44 whitespace-pre">Подробнее     &#8250;</button>
        </div>
        <div className=' w-9/12'>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            spaceBetween={20}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={false}
            navigation={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 1000,
              modifier: 1,
              slideShadows: false
            }}
            autoplay={{
              delay: 500,
              disableOnInteraction: false
            }}
            modules={[EffectCoverflow, Navigation]}
            className='w-4/5 h-90 rounded-3xl'
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {posts.map((post) => {
              return (
                <SwiperSlide className='' key={post}>
                  <img
                    layout="fill"
                    className='bg-center bg-cover w-9/12 h-150 ml-32 mt-2'
                    src={post.photo}
                    alt='image'
                  />
                </SwiperSlide>
              )
            }
            )
            }
            <div style={{ position: '', zIndex: "999px", marginLeft: '42%', marginTop: '-90px', }} className='btn w-44 absolute  z-[999] flex justify-around text-3xl  text-white' >
              <button ref={prevRef} className="custom_next  "> &#10094;</button>
              <button ref={nextRef} className="custom_prev"> 	&#10095;</button>
            </div>
          </Swiper>
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps() {

  const res = await fetch('https://mocki.io/v1/59b08a16-32fc-42f3-9492-a52ed4ee4a8b')
  const posts = await res.json()
  return {
    props: {
      posts,
    },
  }
}


export default Home
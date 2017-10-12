<template>
    <div id="swiper">
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- 这部分放你要渲染的那些内容 -->
            <swiper-slide v-for="(item, k) in items" :key="k">
                <!-- 在这里遍历所有轮播图片 -->
                <img :src="item" alt="">
            </swiper-slide>
            <!-- 这是轮播的小圆点 -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>  
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
    created() {
        window.scrollTo(0, 0);
    },
    components: {
        swiper,
        swiperSlide,
    },
    data() {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                slidesPerView: 'auto',
                // centeredSlides: true,
                paginationClickable: true,
                autoplay: 3000,
                loop: true,
            },
            swiperSlides: [1, 2, 3, 4, 5],
            items: [
                "static/images/timg.jpg",
                "static/images/timg (1).jpg",
                "static/images/timg (2).jpg",
                "static/images/timg (3).jpg",
                
            ]
        }
    },
    //定义这个sweiper对象  
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        //这边就可以使用swiper这个对象去使用swiper官网中的那些方法  
        // this.swiper.slideTo(0, 0, false);
    },
    methods: {

    }
}  
</script>  

<style>
#swiper {
    width: 1200px;
    height: 401px;
    margin: 0 auto;
    /* background-color: #000; */
}

.swiper-container-horizontal {
    width: 100%;
    height: 100%;
}

.swiper-container.swiper-container-horizontal img {
    width: 100%;
    height: 401px;
}

@media screen and (max-width:1200px) {
    #swiper {
        width: 100%;
        height: 401px;
    }
    .swiper-container.swiper-container-horizontal img {
        width: 100%;
        height: 401px;
    }
}

@media screen and (max-width: 767px) {
    #swiper {
        width: 100%;
        height: 1.5rem;
    }
    .swiper-container.swiper-container-horizontal img {
        width: 100%;
        height: 100%;
    }
}
</style>
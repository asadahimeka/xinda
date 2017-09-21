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
import axios from 'axios';
import qs from 'qs';


export default {
    created() {
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        var canshu = qs.stringify({

        });
        axios.post('http://115.182.107.203:8088/xinda/xinda-api/recommend/list', canshu, {}).then(function(data) {
            // console.log('axios data', data);
            // 这里写回调函数


        }).catch(function(error) {
            console.log('axios error', error);
        });
    },
    components: {
        swiper,
        swiperSlide
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
                "../../static/images/timg.jpg",
                "../../static/images/timg (1).jpg",
                "../../static/images/timg (2).jpg",
                "../../static/images/timg (3).jpg",
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
    background-color: #000;
}

.swiper-container-horizontal {
    width: 100%;
    height: 100%;
}

.swiper-container.swiper-container-horizontal img {
    width: 100%;
    height: 401px;
}

.allNavigation {
    z-index: 2;
}
</style>
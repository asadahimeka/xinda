<template>
    <div class="waibu" :style="'height:'+innerHeight+'px'">
        <div class="navleft">
            <div class="mainnav" v-for="nav1 in firstlist" :key="nav1.id">
                {{nav1.name}}
            </div>
        </div>
        <div class="navright">
            <div class="catalog" v-for="nav2 in secondlist" :key="nav2.id">
                <div class="title">
                    {{nav2.name}}
                </div>
                <div class="alllog" v-for="nav3 in nav2.itemList" :key="nav3.id" @click="gonewpage(id,nav2.code,nav3.id)">
                    {{nav3.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getcatalog();
    },
    data() {
        return {
            firstlist: '',
            secondlist: '',
            innerHeight: window.innerHeight,
            id: '2e110f0df53243c197fede52fba8e5d0',
        }
    },
    methods: {
        getcatalog: function() {
            this.ajax.post('/xinda-api/product/style/list').then((da) => {
                console.log(da.data.data);
                this.firstlist = da.data.data;
                this.secondlist = this.firstlist[this.id].itemList;
            }).catch((error) => {
                console.error(error);
            });
        },
        gonewpage:function(id,code,pid){
            this.$router.push({path:'/slist',query:{id,code,pid}})
        }
    }
}
</script>

<style lang="less">
.waibu {
    width: 100%;
    padding-bottom: .5rem;
    box-sizing: border-box;
    background-color: #f2f2f2;
    display: flex;
    .navleft {
        background-color: #f2f2f2;
        width: 25%;
        .mainnav {
            width: 100%;
            height: .5rem;
            font-size: .2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
        }
    }
    .navright {
        width: 75%;
        font-size: .2rem;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        .title {
            width: 100%;
            height: .3rem;
            line-height: .3rem;
            border-bottom: .01rem solid #ddd;
        }
        .alllog{
            margin-left: .3rem;
            box-sizing: border-box;
            line-height: .3rem;
            border-bottom: .01rem solid #ddd;
        }
    }
}
</style>

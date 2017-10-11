<template>
    <div class="waibu" :style="'height:'+innerHeight+'px'">
        <div class="navleft">
            <div class="mainnav" :class="{sele:nav1[1].id==id}" v-for="nav1 in firstlist" :key="nav1[1].id" @click="changecatalog(nav1[1].id)">
                {{nav1[1].name}}
            </div>
        </div>
        <div class="navright">
            <div class="catalog" v-for="nav2 in secondlist" :key="nav2.id">
                <div class="title">
                    {{nav2.name}}
                </div>
                <div class="alllog" v-for="nav3 in nav2.itemList" :key="nav3.id" @click="gonewpage(id,nav2.code,nav3.id)">
                    {{nav3.name}}
                    <div class="dayuhao">
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        if (this.isPC) {
            this.$router.push('/');
        } else {
            this.$indicator.open();
            if (this.$route.query.id) {
                this.id = this.$route.query.id;
            }
            this.getcatalog();
        }
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
                this.firstlist = da.data.data;
                this.secondlist = this.firstlist[this.id].itemList;
                var ob = Object.entries(this.firstlist).sort(function(a, b) {
                    return a[1].showOrder - b[1].showOrder;
                });
                this.firstlist = ob;
                this.$indicator.close();
            }).catch((error) => {
                console.error(error);
            });
        },
        gonewpage: function(id, code, pid) {
            this.$router.push({ path: '/slist', query: { id, code, pid } })
        },
        changecatalog: function(newId) {
            this.$indicator.open('加载中...');
            this.id = newId;
            this.getcatalog();
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
    border-radius: 5px;
    display: flex;
    .navleft {
        background-color: #f2f2f2;
        width: 25%;
        .mainnav {
            width: 100%;
            height: .5rem;
            font-size: .16rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
        }
    }
    .navright {
        width: 75%;
        margin-bottom: 0.2rem;
        font-size: .16rem;
        overflow-y: auto;
        .title {
            width: 100%;
            height: .5rem;
            line-height: .5rem;
            border-bottom: .01rem solid #ddd;
            padding-left: .1rem;
            box-sizing: border-box;
        }
        .alllog {
            margin-left: .4rem;
            box-sizing: border-box;
            line-height: .4rem;
            width: 75%;
            border-bottom: .01rem solid #ddd;
            display: flex;
            justify-content: space-between;
        }
    }
}

.sele {
    background-color: #f2f2f2 !important;
}

.mint-indicator-wrapper {
    width: 1rem;
    height: 1rem;
    z-index: 1;
    position: absolute;
}

.mint-spinner-snake {
    position: absolute;
    top: 30%;
    left: 30%;
}
</style>

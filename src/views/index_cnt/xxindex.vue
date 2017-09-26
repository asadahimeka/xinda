<template>
  <div class="xxindex">
    <div class="star">
      <p>明星产品推荐</p>
      <div class="starmenu">
        <el-alert v-if="err" title="Get data failed." type="error" show-icon></el-alert>
        <div class="starmenu_list" v-for="(item,i) in starlist" :key="i">
          <a :href='"#/shdetail?sid="+item.id'>
            <div class="smlistbg">
              <div class="mnico"><img :src="starimg[i]" alt=""></div>
              <b :title="item.serviceName">{{dealName(item.serviceName)}}</b>
              <p :title="item.serviceInfo">{{dealInfo(item.serviceInfo)}}</p>
              <p>
                <span>{{fmtPrice(item.price)}}</span>{{item.unit}}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="startx">
      <p>初创企业必备</p>
      <div class="startxmenu">
        <el-alert v-if="err" title="Get data failed." type="error" show-icon></el-alert>
        <a v-for="(item,i) in relist" :href='"#/shdetail?sid="+item.id' :key="i">
          <div  class="startxx">
            <img :src="relistimg+item.providerImg" alt="">
            <b>{{item.serviceName}}</b>
            <p class="intro" :title="item.serviceInfo">{{dealInfo(item.serviceInfo)}}</p>
            <p>
              <span>{{fmtPrice(item.price)}}</span>元</p>
            <button class="startb">查看详情</button>
          </div>
        </a>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'xxindex',
  data() {
    return {
      relist: [],
      relistimg: 'http://115.182.107.203:8088/xinda/pic',
      starlist: [],
      starimg: [
        "../../../static/images/qianbao.svg",
        "../../../static/images/zhuce.svg",
        "../../../static/images/zhuce1.svg",
        "../../../static/images/zhuce1.svg",
      ],
      err: 0,
    }
  },
  methods: {
    fmtPrice(p) {
      return (parseFloat(p) * 0.01).toFixed(2);
    },
    dealName(name) {
      return name.substring(0, name.search(/[(（]/));
    },
    dealInfo(info) {
      return info.length > 33 ? info.substring(0, 32) + '...' : info;
    },
    getRecom() {
      this.ajax.post('/xinda-api/recommend/list').then((res) => {
        if (res.data.status == 1) {
          this.starlist = res.data.data.product;
          this.relist = res.data.data.hq;
        } else {
          this.err = 1;
          this.$message({ type: 'warning', message: res.data.msg });
        }
      })
    }
  },
  created() {
    this.getRecom();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

@mcolor: #2693d4;

a{
  color: #000;
}
.star {
  margin-top: 53px;
  width: 1200px;
  height: 472px; // border: 1px solid red;
  margin-left: auto;
  margin-right: auto;
  .starmenu {
    height: auto;
    margin-top: 10px;
    border-top: 2px solid @mcolor;
    display: flex;
    justify-content: space-between;
    .starmenu_list {
      margin-top: 49px;
      padding: 10px;
      border: 1px solid #e8e8e8;
      text-align: center;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 0px 5px @mcolor;
        transition: .4s ease-in-out;
      }
      .smlistbg {
        width: 250px;
        height: 378px;
        background-color: #fafafa;
      }
      .mnico {
        display: inline-block;
        width: 125px;
        height: 125px;
        margin-top: 50px;
        border: 1px solid @mcolor;
        border-radius: 100%;
        img {
          margin-top: 24px;
        }
      }
      b {
        display: block;
        text-align: center;
        margin-top: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        text-align: center;
        font-size: 14px;
        color: #7d7d7d;
        margin-top: 24px;
        span {
          font-size: 23px;
          color: #5badde;
        }
      }
      .starimg {
        width: 270px;
        height: 398px;
      }
    }
  }
}

.startx {
  margin-top: 53px;
  width: 1200px;
  height: 472px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  .startxmenu {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    border-top: 2px solid @mcolor;
    .startxx {
      width: 252px;
      height: 378px;
      margin-top: 50px;
      padding: 10px;
      border: 1px solid #e8e8e8;
      text-align: center;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 0px 5px @mcolor;
        transition: .4s ease-in-out;
      }
      img {
        height: 41px;
        margin-top: 50px;
      }
      b {
        display: block;
        margin-top: 50px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .intro {
        font-size: 14px;
        margin-top: 16px;
        text-align: center;
        height: 65px;
        span {
          font-size: 23px;
          color: #5caedf;
        }
      }
      p {
        font-size: 14px;
        margin-top: 16px;
        text-align: center;
        span {
          font-size: 23px;
          color: #5caedf;
        }
      }
      .startb {
        width: 157px;
        height: 45px;
        color: @mcolor;
        background-color: white;
        border: 2px solid @mcolor;
        border-radius: 5px;
        margin-top: 10px;
      }
    }
  }
}

.el-alert {
  width: 300px;
  margin: 50px auto;
}
</style>

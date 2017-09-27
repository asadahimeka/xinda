<template>
  <div class="hello">
    <input type="text" class="form-control" placeholder="请输入想要搜索关键字" v-model="searchKey" @input="search" @keydown.down.prevent="selectDown"
    @keydown.up.prevent="selectUp">
    <div v-for="(item,index) in result" :class="{sel:index==now}">{{item.serviceName}}</div>
  </div>
</template>

<script>
  import _ from 'lodash'; //引入lodash
  import axios from 'axios' //引入axios

  //请求canceltoken列表
  let sources = [];

  export default {
    name: 'hello',
    data () {
      return {
        searchKey: '', //查询条件
        result: [] ,//查询结果
        now:-1
      }
    },
    methods: {
        selectDown:function () {
                this.now++;
                console.log('this.now: ', this.now);
                if(this.now==this.result.length)this.now=-1;
                if(this.now>-1){
                    this.searchKey=this.result[this.now].serviceName;
                }
        },
        selectUp:function () {
                this.now--;
                console.log('this.now: ', this.now);
                if(this.now==-2)this.now=this.result.length-1;
                if(this.now>-1){
                    this.searchKey=this.result[this.now].serviceName;
                }
        },
      //使用_.debounce控制搜索的触发频率
      //准备搜索
      search: _.debounce(
        function () {
          let that = this;
          //删除已经结束的请求
          _.remove(sources, function (n) {
            return n.source === null;
          });
          //取消还未结束的请求
          sources.forEach(function (item) {
            if (item !== null && item.source !== null && item.status === 1) {
              item.status = 0;
              item.source.cancel('取消上一个')
            }
          });

          //创建新的请求cancelToken,并设置状态请求中
          var sc = {
            source: axios.CancelToken.source(),
            status: 1 //状态1：请求中，0:取消中
          };
          //这个对象加入数组中
          sources.push(sc);

            if(!this.searchKey){
                this.searchKey = ' ';
            }
　　　　　　//开始搜索数据，yourhttp替换成你自己的请求路径
          axios.post(
              'xinda-api/product/package/search-grid', {
                start: 0,
                limit: 8,
                searchName: this.searchKey,
                sort: ''
            },{
            cancelToken: sc.source.token
          }).then(function (res) {
            //请求成功
            sc.source = null; //置空请求canceltoken

            //TODO这里处理搜索结果
            console.log(res.data.data);
            that.result = res.data.data;
            // console.log('this.result: ', this.result);

          }).catch(function (thrown) {
            //请求失败
            sc.source = null; //置空请求canceltoken

            //下面的逻辑其实测试用
            if (axios.isCancel(thrown)) {
              console.log('Request canceled', thrown.message);
            } else {
              //handle error
            }

          });
        },
        500 //空闲时间间隔设置500ms
      )
    }
  }
</script>

<style scoped>

.sel{
    background-color: #dff0d8;
}
</style>
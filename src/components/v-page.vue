<template lang="html">
  <div class="page-bar" v-if="pageSize">
    <ul>
      <li><button @click="btnClick(1)" v-if="curInx!=1">首页</button></li>
      <li><button @click="btnClick(curInx-1)" :disabled="curInx==1">上一页</button></li>
      <li v-for="index in indexs"  :class="{ active: curInx == index}">
          <button v-on:click="btnClick(index)">{{ index }}</button>
      </li>
      <li><button @click="btnClick(curInx+1)" :disabled="curInx==pageSize">下一页</button></li>
      <li><button @click="btnClick(pageSize)" v-if="pageSize&&curInx!=pageSize">尾页</button></li>
      <li v-if="totalShow"><button class="total" disabled>共<i>{{pageSize}}</i>页</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    curInx: {
      type: [String, Number],
      required: true
    },
    pageSize: {
      type: [String, Number],
      required: true
    },
    totalShow: {
      type: [Boolean],
      required: true
    },
    pageChange: {
      default() {
        return function pageChange() {
          // TODO
        }
      }
    }
  },
  computed: {
    indexs() {
      var left = 1
      var right = this.pageSize
      var ar = []
      if (this.pageSize >= 11) {
        if (this.curInx > 5 && this.curInx < this.pageSize - 4) {
          left = this.curInx - 5
          right = this.curInx + 4
        } else {
          if (this.curInx <= 5) {
            left = 1
            right = 10
          } else {
            right = this.pageSize
            left = this.pageSize - 9
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    btnClick(page) {
      if (page != this.curInx) {
        this.pageChange(page)
      }
    }
  }
}
</script>

<style lang="less">
ul,
li {
  margin: 0px;
  padding: 0px;
}

.page-bar li {
  list-style: none;
  display: inline-block;
}

.page-bar li:first-child>button {
  margin-left: 0px
}

.page-bar button {
  margin: 5px;
  border: 1px solid #ddd;
  background: #fff;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #2595d0;
  cursor: pointer;
}

.page-bar button:hover {
  background-color: #eee;
}

.page-bar button[disabled] {
  cursor: not-allowed;
  &:hover {
    background-color: #fff;
  }
}

.page-bar .active button {
  color: #fff;
  cursor: default;
  background-color: #2595d0;
  border-color: #2595d0;
}

.page-bar i {
  font-style: normal;
  color: #2595d0;
  margin: 0px 4px;
  font-size: 12px;
}

.total {
  cursor: default !important;
  &:hover {
    background-color: #fff !important;
  }
}

button {
  outline: none;
}
</style>

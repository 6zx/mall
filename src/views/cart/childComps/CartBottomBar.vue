<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectedAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{ totalPrice }}
    </div>

    <div class="calculate">
        去计算: ({{ checkedLength }})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomVar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
            return item.checked;
        }).reduce((preValue, item) => {
            return preValue + item.price * item.count;
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => {
            return item.checked;
        }).reduce((preValue, item) => {
            return preValue + item.count;
        }, 0)
      },
      isSelectedAll() {
        if (this.cartList.length === 0) return false

        //   return !(this.cartList.filter(item => !item.checked).length)
        return !(this.cartList.find(item => !item.checked))
      }
    },
    methods: {
        checkClick() {
            if (this.isSelectedAll) { // 全部选中
                this.cartList.forEach(item => item.checked = false);
            } else {// 不是全部选中
                this.cartList.forEach(item => item.checked = true);
            }
        }
    }
  }
</script>

<style scoped>
  .bottom-bar {
      height: 40px;
      background-color: #eee;
      position: relative;
      line-height: 40px;
      display: flex;
  }

  .check-content {
      display: flex;
      align-items: center;
      width: 80px;
  }
  .check-button {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-left: 10px;
      margin-right: 5px;
  }

  .price {
      margin-left: 20px;
      flex: 1;
  }
  .calculate {
      width: 90px;
      background-color: tomato;
      color: #fff;
      text-align: center;
  }
</style>
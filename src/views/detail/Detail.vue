<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'

  import {getDetail, Goods, Shop} from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      }
    },
    created() {
      // 1. 保存传入的iid
      this.iid = this.$route.params.iid;

      // // 2. 根据iid请求数据
      // getDetail(this.iid).then(res => {
      //   console.log(res);

      //   // 2.1 获取顶部轮播图图片
      //   this.topImages = res.result.itemInfo.topImages;

      //   // 2.2 获取商品信息
      //   this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services);

      //   // 2.3 获取店铺信息
      //   this.shop = new Shop(res.result.shopInfo);
      // })

      let imgs = [
        [
          'https://images.pexels.com/photos/5849003/pexels-photo-5849003.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/6077783/pexels-photo-6077783.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        ],
        [
          'https://images.pexels.com/photos/3402908/pexels-photo-3402908.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/4889486/pexels-photo-4889486.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        ],
        [
          'https://images.pexels.com/photos/4786952/pexels-photo-4786952.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/5478104/pexels-photo-5478104.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          'https://images.pexels.com/photos/2401400/pexels-photo-2401400.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        ]
        ]
      function makeFakeData() {
        let ret = {};
        ret.result = {};
        ret.result.itemInfo = {};
        ret.result.itemInfo.topImages = imgs[Math.round(Math.random() * 2)];

        ret.result.itemInfo.title = '【周国平-爱与孤独】家里养的❀自杀了，遗书写到：一生不愁吃穿，唯独缺少阳光爱';
        ret.result.itemInfo.desc = '新款上市';
        ret.result.itemInfo.price = 109;
        ret.result.itemInfo.oldPrice = 129;
        ret.result.itemInfo.discountDesc = '活动价';
        ret.result.itemInfo.lowNowPrice = 109;
        ret.result.columns = ['销量 3876', '收藏 533', '默认快递'];
        ret.result.shopInfo = {};
        ret.result.shopInfo.services = [
          {name: '退货补运费', icon: '#'}, {name: '全国包邮', icon: '#'}, {name: '7天无理由退换货', icon: '#'}, {name: '72小时包邮', icon: '#'}
          ];
        ret.result.shopInfo.shopLogo = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F08%2F20200308002234_jsoqx.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611841768&t=d24bb628b80103967b6ec4e4792f8caf';
        ret.result.shopInfo.name = '来时';
        ret.result.shopInfo.cFans = 10090;
        ret.result.shopInfo.Goods = 99;
        ret.result.shopInfo.cSells = 57876;
        ret.result.shopInfo.scroe = [
          {isBetter: false, name: '描述相符', scroe: 4.64},
          {isBetter: true, name: '价格合理', scroe: 5},
          {isBetter: false, name: '质量满意', scroe: 4.62}
        ]

        return ret
      }
      let res = makeFakeData();

      // 2.1 获取顶部轮播图图片
      this.topImages = res.result.itemInfo.topImages;

      // 2.2 获取商品信息
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services);

      // 2.3 获取店铺信息
      this.shop = new Shop(res.result.shopInfo);
    }
  }
</script>

<style scoped>
  
</style>
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {itemListenerMinin} from 'common/mixin'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMinin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null
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

      //   // 2.4 保存商品的详情数据
      //   this.detailInfo = res.result.detailInfo;

      //   // 2.5 保存参数信息
      //   this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule);

      //   // 2.6 保存评价信息
      //   if (res.result.rate.cRate !== 0) {
      //     this.commentInfo = res.result.rate.list[0];
      //   } 
      // })

      // // 3. 请求推荐数据
      // getRecommend().then(res => {
      //   this.recommends = res.data.list;
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

        ret.result.itemInfo.title = '【周国平-爱与孤独】家里养的❀自杀了，遗书写到：一生不愁吃穿，唯独缺少阳光和爱';
        ret.result.itemInfo.desc = '新款上市';
        ret.result.itemInfo.price = 109;
        ret.result.itemInfo.oldPrice = 129;
        ret.result.itemInfo.discountDesc = '活动价';
        ret.result.itemInfo.lowNowPrice = 109;
        ret.result.columns = ['销量 3876', '收藏 533', '默认快递'];
        ret.result.shopInfo = {};
        ret.result.shopInfo.services = [
          {name: '退货补运费', icon: '#'}, {name: '全国包邮', icon: '#'}, {name: '7天无理由退换货', icon: '#'}, {name: '72小时发货', icon: '#'}
          ];
        ret.result.shopInfo.shopLogo = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F08%2F20200308002234_jsoqx.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611841768&t=d24bb628b80103967b6ec4e4792f8caf';
        ret.result.shopInfo.name = '来时';
        ret.result.shopInfo.cFans = 10090;
        ret.result.shopInfo.cGoods = 99;
        ret.result.shopInfo.cSells = 57876;
        ret.result.shopInfo.score = [
          {isBetter: false, name: '描述相符', score: 4.64},
          {isBetter: true, name: '价格合理', score: 5},
          {isBetter: false, name: '质量满意', score: 4.62}
        ];
        ret.result.detailInfo = {
          desc: "我漂泊了许多年，时间长得，让我忘记了我还有灵魂——荣格【红书】",
          detailImage: [{
            anchor: "model_img",
            desc: "",
            key: "穿着效果",
            list: [
              'https://images.pexels.com/photos/3030506/pexels-photo-3030506.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              'https://images.pexels.com/photos/5715253/pexels-photo-5715253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              'https://images.pexels.com/photos/5850442/pexels-photo-5850442.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              'https://images.pexels.com/photos/4627741/pexels-photo-4627741.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              'https://images.pexels.com/photos/5799683/pexels-photo-5799683.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            ]
          }]
        }

        ret.result.itemParams =  {
          info: {
            set: [
              {key: "图案", value: "宫廷复古图/字母/文字"},
              {key: "颜色", value: "月白"},
              {key: "袖形", value: "常规袖"},
              {key: "尺码", value: "M, L, XL, XXL"},
              {key: "衣长", value: "常规款 51-59cm"},
              {key: "版型", value: "宽松"},
              {key: "季节", value: "春秋"},
              {key: "厂址", value: "广东省揭阳市"},
              {key: "材质", value: "棉"},
              {key: "风格", value: "原宿"},
            ]
          },
          rule: {
            tables: [[
              ["尺码", "M", "L", "XL", "XXL"],
              ["衣长", "61.5", "63", "64.5", "66"],
              ["胸围", "98", "104", "110", "116"],
              ["袖长", "63", "66", "68.5", "70.5"]
            ]]
          }
        }

        ret.result.rate = {
          cRate: 125,
          list: [{
            canExplain: false,
            content: "生活不可能像你想象得那么好\n但也不会像想象得那么糟\n我觉得人的脆弱和坚强\n都超乎自己的想象\n\n有时，我可能脆弱得\n一句话就泪流满面\n有时，也发现自己\n咬着牙走了很长的路\n——莫泊桑【一生】",
            created: 13340336942,
            extraInfo: ["是否合身:合身"],
            images: [
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-2a5e64d4a5f6c5ba8da6e0e0ad359956_hd.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612701655&t=0f31df203a90839e5f3e91232a5b393f",
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612701690&t=104e6ce6b43cdef322536b1ec980a8d9"
            ],
            isAnonymous: 1,
            isEmpty: 0,
            level: "",
            rateId: "354565767",
            style: "颜色: 上衣+裤子 尺码：M",
            user: {
              avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F0071ogI5gy1gj7s0sfweoj30u00u0jt1.jpg&refer=http%3A%2F%2Fwx1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612701628&t=857f3ff2e953fbb1e89a3d42cf9da424",
              uname: "六只熊"
            }
          }]
        }

        return ret
      }
      let res = makeFakeData();

      // 2.1 获取顶部轮播图图片
      this.topImages = res.result.itemInfo.topImages;

      // 2.2 获取商品信息
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services);

      // 2.3 获取店铺信息
      this.shop = new Shop(res.result.shopInfo);

      // 2.4 保存商品的详情数据
      this.detailInfo = res.result.detailInfo;

      // 2.5 保存参数信息
      this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule);

      // 2.6 保存评价信息
      if (res.result.rate.cRate !== 0) {
        this.commentInfo = res.result.rate.list[0];
      } 

      function makeFakeData2() {
        let ret = {}
        ret.data = {}

        ret.data.list = [
          {
            acm: 'abc', cfav: 1080, discount: 700, discountPrice: 59.0,
            image: "https://images.pexels.com/photos/5499131/pexels-photo-5499131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            isShelf: 0, itemLikes: 1080, itemSale: 660, price: 84.29, title: "一天，我看见过四十三次日落"
          },
          {
            acm: 'abc', cfav: 980, discount: 700, discountPrice: 99.0,
            image: "https://images.pexels.com/photos/5199154/pexels-photo-5199154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            isShelf: 0, itemLikes: 980, itemSale: 660, price: 90, title: "你知道，当人们感到非常苦闷时"
          },
          {
            acm: 'abc', cfav: 107, discount: 700, discountPrice: 56.0,
            image: "https://images.pexels.com/photos/6226124/pexels-photo-6226124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            isShelf: 0, itemLikes: 107, itemSale: 660, price: 50, title: "总是喜欢日落的"
          },
          {
            acm: 'abc', cfav: 130, discount: 700, discountPrice: 87.0,
            image: "https://images.pexels.com/photos/5665475/pexels-photo-5665475.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            isShelf: 0, itemLikes: 130, itemSale: 660, price: 85, title: "一天，我看见过四十四次日落"
          },
          {
            acm: 'abc', cfav: 216, discount: 700, discountPrice: 86.0,
            image: "https://images.pexels.com/photos/5273001/pexels-photo-5273001.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            isShelf: 0, itemLikes: 216, itemSale: 660, price: 79, title: "你知道吗"
          },
          {
            acm: 'abc', cfav: 1080, discount: 700, discountPrice: 36.0,
            image: "https://images.pexels.com/photos/5326946/pexels-photo-5326946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            isShelf: 0, itemLikes: 1080, itemSale: 660, price: 33, title: "人在难过的时候就会爱上日落"
          }
        ]

        return ret
      }
      let res2 = makeFakeData2();
      this.recommends = res2.data.list;
    },
    mounted(){
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
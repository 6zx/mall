<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" v-show="isFixed"></tab-control>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBack"></back-top>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'

    import {getHomeMultidata, getHomeGoods} from 'network/home'
    import {itemListenerMinin, backTopMixin} from 'common/mixin'

    export default {
        name: 'Home',
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll
        },
        mixins: [itemListenerMinin, backTopMixin],
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                currentType: 'pop',
                tabOffsetTop: 0,
                isFixed: false,
                scrollY: 0,
                itemImgListener: null
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created() {
            // 请求多个数据
            this.getHomeMultidata();
            
            // 请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
        },
        mounted() {
        },
        activated() {
            // console.log('activated');
            this.$refs.scroll.scrollTo(0, this.scrollY, 0);
            this.$refs.scroll.refresh();
        },
        deactivated() {
            // 保存离开时的位置
            this.scrollY = this.$refs.scroll.getScrollY();

            // 取消监听的某个全局事件
            this.$bus.$off('itemImageLoad', this.itemImgListener)
        },
        destroyed() {
            console.log('destroyed');
        },
        methods: {
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                // getHomeGoods(type, page).then(res => {
                //     this.goods[type].list.push(...res.data.list);
                //     this.goods[type].page += 1;
                // })

                let count = 0;
                let imgs = {
                    'pop': ['https://images.pexels.com/photos/2660212/pexels-photo-2660212.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                            'https://images.pexels.com/photos/3629537/pexels-photo-3629537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                            'https://images.pexels.com/photos/3014941/pexels-photo-3014941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                            ],
                    'new': ['https://images.pexels.com/photos/5878857/pexels-photo-5878857.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                            'https://images.pexels.com/photos/1856142/pexels-photo-1856142.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                            'https://images.pexels.com/photos/1029807/pexels-photo-1029807.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                            ],
                    'sell': ['https://images.pexels.com/photos/2071731/pexels-photo-2071731.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                             'https://images.pexels.com/photos/5864079/pexels-photo-5864079.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                             'https://images.pexels.com/photos/5623821/pexels-photo-5623821.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                             ]
                }
                function makeFakeData(n) {
                    let ret = [];
                    for(let i=0; i<n; i++) {
                        let item = {};
                        item.show= {img: imgs[type][count%3]};
                        item.title = '商品' + type + '  ' + page + '-' + count;
                        item.price = Math.round(Math.random() * 100);
                        item.cfav = Math.floor(Math.random()*15);
                        item.iid = type + '_' + page + '_' + count;
                        ret.push(item);
                        count += 1;
                    }
                    return ret
                }
                let fakedata = makeFakeData(10)
                this.goods[type].list.push(...fakedata);
                this.goods[type].page += 1;

                if (this.$refs.scroll) {
                    this.$refs.scroll.finishPullUp()
                }
            },
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            contentScroll(position) {
                // 判断是否显示backTop组件
                this.isShowBack = (-position.y) > 1000;

                // 判断是够展示吸顶效果
                this.isFixed = (-position.y) > this.tabOffsetTop;
            },
            loadMore() {
                this.getHomeGoods(this.currentType);
            },
            swiperImageLoad() {
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            }
        }
    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    #home {
        padding-top: 44px;
        height: 100vh;
        position: relative;
    }

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }
</style>
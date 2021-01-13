import {debounce} from 'common/utils'

import BackTop from 'components/content/backTop/BackTop'


export const itemListenerMinin = {
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 500);

        this.itemImgListener = () => {
            refresh();
        }

        this.$bus.$on('itemImageLoad', this.itemImgListener);
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBack: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        }
    }
}
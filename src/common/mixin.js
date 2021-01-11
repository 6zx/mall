import {debounce} from 'common/utils'

export const itemListenerMinin = {
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 500);

        this.itemImgListener = () => {
            refresh();
        }

        this.$bus.$on('itemImageLoad', this.itemImgListener);
    }
}
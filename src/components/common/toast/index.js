import Toast from './Toast.vue'
const obj = {};

obj.install = function(Vue) {
    // 创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    // 创建组件对象
    const toast = new toastConstructor()

    // 将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));

    // toast.$el对应div
    document.body.appendChild(toast.$el);

    Vue.prototype.$toast = toast;
}

export default obj
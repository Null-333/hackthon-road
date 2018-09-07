// require('babel-polyfill');
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 使用element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from './util/interceptor.js'

Vue.use(Element);

const Web3 = require('web3');
const ABI = require('./const/logisticABI');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const Address = '0x1d38b7293db671353b53e5fc796650e94132d78d';
const Contract = web3.eth.contract(ABI);
window.contractInstance = Contract.at(Address);

Vue.prototype.$http = axios;

import store from './store/index.js'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: {
        App
    }
})
<template>
    <div class="sign-box">
        <div class="loading-box" v-if="loading">Uploading to chain...</div>
        <template v-else>
            <p>
                请点击签约合约
            </p>
            <el-button @click="sign" type="primary">签约</el-button>
        </template>
    </div>
</template>
<script>
    let events = null;
    export default {
        data() {
            return {
                loading: false,
            }
        },
        mounted () {
            window.contractInstance.events.onSign()
                .on('data', (event) => {
                    console.log('event', event);
                });
        },
        methods: {
            sign() {
                this.loading = true;
                const name = window.localStorage.getItem('userName');
                const idCard = window.localStorage.getItem('userid');
                const userType = window.localStorage.getItem('userType');
                // 首先签约合约，然后更新数据库
                // 物流合约

                let signEvent = window.contractInstance.methods.sign(name, idCard, userType).send({
                    from: web3.eth.defaultAccount
                })

                signEvent.then((res) => {
                    const id = res.events.onSign.returnValues.idCard;
                    const formData = { id };
                    this.$http.post('/api/updateSign', formData)
                        .then((res) => {
                            if (res.data.message === '保存成功') {
                                this.loading = false;
                                if (userType == 1) {
                                    this.$router.push({name: 'truck'});
                                } else {
                                    this.$router.push({name: 'signsucces'});
                                }
                            }
                        })
                });
            }
        }
    }
</script>
<style>
    .sign-box {
        padding: 50px;
        border: 1px solid #999;
    }
    /* .loading-box {
        margin
    } */
</style>


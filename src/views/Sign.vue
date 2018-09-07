<template>
    <div class="sign-box">
        <p>
            请点击签约合约
        </p>
        <el-button @click="sign" type="primary">签约</el-button>
    </div>
</template>
<script>
    export default {
        methods: {
            sign() {
                const name = window.localStorage.getItem('userName');
                const idCard = window.localStorage.getItem('userid');
                const userType = 1;
                window.contractInstance.methods.sign(name, idCard, userType).send({
                    from: web3.eth.defaultAccount
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
</style>


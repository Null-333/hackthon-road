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
                // contractInstance.
                console.log('1111')
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


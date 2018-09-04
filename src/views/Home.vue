<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><router-link to="/">主页</router-link></el-menu-item>
      <el-menu-item index="2" :style="{float: 'right'}">
        <a @click="loginOut" href="javascript:;" v-show="!user.id">退出登录</a>
      </el-menu-item>
    </el-menu>
    <el-card class="box-card">
      <p>Hello {{user.name}}</p>
    </el-card>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        activeIndex:'1',
        user:{
          name:''
        }
      }
    },
    beforeCreate(){
      // 当主页刷新时，如果服务端设置的cookie（包含sessionId）
      // 的时效到了的话，便会提示未登录
      this.$http.get('/api')
        .then(res => {
          console.dir(res.data)
          if (res.data.error) {
            this.$message.error(res.data.error);
            this.user.id = null;
            return false;
          }else{
            let user = localStorage.getItem('user');
            if (user) {
              this.user.name = user;
            }
          }
        })
        .catch(err => {
            this.$message.error(`${err.message}`)
        })

    },
    methods: {
      ...mapActions(['userLoginOut']),
      // 登出loginOut
      loginOut(){
        this.userLoginOut();
        this.user.id = null;
        this.$http.get('/api/logout')
          .then(res => {
            if (res.data.message) {
              this.$message.success(res.data.message);
              return false;
            }
          })
          .catch(err => {
              this.$message.error(`${err.message}`)
          })
      }
    }
  }
</script>

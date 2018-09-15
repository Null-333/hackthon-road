<template>
  <div class="login-box">
    <el-row class="form-box" type="flex" justify="center">
      <el-col :span="12">
        <el-form
          label-position="left"
          label-width="80px"
          :model="formLogin"
          :rules="rules"
          ref="formLogin">
          <h1>Block Logistic</h1>
          <!-- $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。 -->
          <el-form-item prop="name">
            <el-input placeholder="用户名" v-model="formLogin.name"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="formLogin.password"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="resetForm">取消</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/register">
              <el-button type="">没有账号，立即注册<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 动画图片 -->
    <div class="bg-center"></div>
    <div class="hill-left"></div>
    <div class="hill-right"></div>
    <div class="hill-center"></div>
    <div class="birds"></div>
    <div class="poem">
      <h4>江上琴兴</h4>
      <p v-html="poem"></p>
    </div>
  </div>
</template>

<script type="text/javascript">
  // 引入vuex /src/helper.js中的辅助函数，
  // 将actions中的方法直接转为组件中的方法
  import {mapActions} from 'vuex'

  export default {
    data(){
      let checkUserName = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('身份证号不能为空!'))
        }else{
          cb(); // 将判断传递给后面
        }

      }
      let checkPassword = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('密码不能为空!'))
         }else{
          cb();
         }
      }
      return{
        poem: '',
        formLogin: {
          name: '',
          password: '',
        },
        rules:{
          id:[
            {validator:checkUserName,trigger: 'blur'}
          ],
          password:[
            {validator:checkPassword,trigger: 'blur'}
          ],
        }
      }
    },
    mounted () {
      const self = this;
      const yuanwen = '江上调玉琴，一弦清一心。泠泠七弦遍，万木澄幽阴。能使江月白，又令江水深。始知梧桐枝，可以徽黄金。';
      const showstr= yuanwen.split('');
      let i=0;
      const timer = setInterval(show, 120)
      function show(){
        if ( i >= showstr.length) {
          clearInterval(timer);
        } else {
          if (self.poem.length === 12 || self.poem.length === 30 || self.poem.length === 48) {
            self.poem = self.poem + '<br />'
          }
          self.poem = self.poem + showstr[i];
          i++;
        }
      }
    },
    methods:{
      ...mapActions(['userLogin']),
      // 向登录接口发起请求
      login(){
        let user = this.formLogin;
        let formData = {
          name: user.name,
          password: user.password
        };
        // 表单验证
        this.$refs['formLogin'].validate((valid) => {
          if (valid) {
            // 通过验证之后才请求登录接口
            this.$http.post('/api/login',formData)
                .then(res => {
                    if (res.data.success) {
                      this.userLogin(res.data);
                      this.$message.success(`${res.data.message}`)
                      // 用户id存于localstorage中
                      window.localStorage.setItem('userid', res.data.id);
                      window.localStorage.setItem('userName', res.data.name);
                      window.localStorage.setItem('userType', res.data.userType);
                      // 登录成功 跳转至首页
                      this.$router.push('/home');
                    }else{
                      this.$message.error(`${res.data.error}`);
                      return false;
                    }
                })
                .catch(err => {
                    this.$message.error(`${err.message}`, 'ERROR!')
                })
          } else {
            this.$message.error('表单验证失败!')
            return false;
          }
        });
      },
      // 表单重置
      resetForm(){
        console.log('session')
        this.$refs['formLogin'].resetFields();
      }
    }
  }
</script>
<style>
  .login-box {
    position: relative;
    height: 100%;
    overflow: hidden;
    background: url(../assets/images/login/8.png) center center no-repeat;
  }
  .form-box .el-form-item__content {
    margin-left: 0 !important;
  }
  .form-box h1 {
    text-align: center;
    margin-bottom: 40px;
  }
  .form-box {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
  }
  .bg-center {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    background: url(../assets/images/login/bg-center.png) center center no-repeat;
    -webkit-animation: show 8s linear forwards;
    animation: show 8s linear forwards;
  }
  .hill-left {
    position: absolute;
    left: -400px;
    top: -320px;
    width: 820px;
    height: 1080px;
    background: url(../assets/images/login/2.png) center center no-repeat;
    animation: moveToLeft 8s linear forwards;
  }
  .hill-right {
    position: absolute;
    right: -550px;
    bottom: 0;
    width: 901px;
    height: 913px;
    background: url(../assets/images/login/5.png) center center no-repeat;
    animation: moveToRight 8s linear forwards;
  }
  .hill-center {
    position: absolute;
    left: 200px;
    bottom: -750px;
    zoom:0.7;
    width: 612px;
    height: 1080px;
    background: url(../assets/images/login/6.png) center center no-repeat;
    animation: showCenter 8s linear forwards;
  }
  .birds {
    position: absolute;
    /* left: 200px; */
    bottom: 0;
    width: 1920px;
    height: 507px;
    background: url(../assets/images/login/7.png) center center no-repeat;
    animation: birdsMove 16s 8s linear forwards;
  }
  .poem {
    width: 536px;
    position: absolute;
    right: 50%;
    top: 50px;
    line-height: 30px;
    transform: translateX(100%);
  }
  @keyframes show {
    from {
      transform: scale(0.9, 0.9) translate(-50%, -20%);
    }
    to {
      transform: scale(1, 1) translate(-50%, -20%);
    }
  }
  @keyframes showCenter {
    from {
      transform: scale(0.8, 0.8);
    }
    to {
      transform: scale(1, 1);
    }
  }
  @keyframes moveToLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100px);
    }
  }
  @keyframes moveToRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100px);
    }
  }
  @keyframes birdsMove {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-800px);
    }
  }
</style>

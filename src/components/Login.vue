<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/HomeImg/DMICROpic.png" alt="">
            </div>
            <!-- 登陆表单区 -->
            <el-form :model="loginForm" label-width="0px" :rules="loginFormRules" ref="loginFormRef" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.usrPhone" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.usrPassword" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" :plain=true @click="login">登录</el-button>
                    <el-button type="waring" @click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //这是登陆表单的数据绑定对象
            loginForm:{
                usrPhone: '13712345678',
                usrPassword: '123456789'
            },
            loginFormRules:{
                //验证用户名是否合法,trigger blur在失去焦点时进行验证
                usrPhone: [
                    { required: true, message: "请输入登录名称", trigger: "blur"},
                    { min: 3, max: 10,message: "长度在3到10个字符", trigger: "blur" }
                ],
                //验证密码是否合法
                usrPassword: [
                    { required: true, message: "请输入登录密码", trigger: "blur"},
                    { min: 6, max: 15,message: "长度在6到15个字符", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
         login(){
           this.$refs.loginFormRef.validate(async valid => {
               if(!valid) return;
               //由于返回的是一个promise请求,里面有些数据不是服务器返回的数据,而只有data才是服务器返回的,所以我们把data解构复制出来,重命名为res
               const res = await this.axios.post("user/login",this.loginForm);
               console.log(res)
               //判断登录状态码
               if(res.data.code != 200 ) return this.$message.error(res.data.msg);
               else this.$message.success(res.data.msg);
               //1. 将登录成功之后的token保存到客户端的sessionStorage中
               //  1.1 项目中除了登陆之外的其他接口都必须在登录之后才能访问
               //  1.2 token只应在当前网站打开期间生效,所以要保存在sessionStorage
               window.sessionStorage.setItem("token",res.data.oneData);
               //2. 通过导航跳转到主页,路由地址是/home  
               this.$router.push("/home");
           }
);   
        },
        register(){
            this.$router.push("/register")
        }
    }
};
</script>

// scoped是vue指令控制组件样式生效区间----加上就在当前组件生效, 去掉则全局生效
<style scoped>
.login_container{
    background-color: grey;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: aliceblue;
    border-radius: 3px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

.login_box .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
}

.login_box .avatar_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}

.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns{
    display: flex;
    /* 横轴上尾部对齐 */
    justify-content: flex-end;  
}


</style>
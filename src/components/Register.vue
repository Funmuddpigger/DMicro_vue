<template>
    <div class="outside-div">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="电话号码" prop="phoneNum">
                <el-input  v-model="ruleForm.phoneNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
 export default {
    data() {
      var checkphoneNum = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('电话号码不能为空'));
        }
        if(value.length !=11){
            return callback(new Error('电话号码格式不对'));
        }
        callback()
      };
      var checkNickname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'));
        }
        callback()
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        url: 'localhost:5050/user/',
        ruleForm: {
          pass: '',
          checkPass: '',
          nickname: '',
          phoneNum:''
        },
        rules: {
          phoneNum:[
            { validator: checkphoneNum, trigger: 'blur' }
          ],  
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          nickname: [
            { validator: checkNickname, trigger: 'blur' }
          ]
        }
      };
    },

    methods: {
      submitForm(formName) {
            var insertJson = {
                    "usrNickname": this.ruleForm.nickname,
                    "usrPhone": this.ruleForm.phoneNum,
                    "usrPassword": this.ruleForm.pass,
            }
            this.$refs[formName].validate(async valid => {
            if(!valid) return;
               //由于返回的是一个promise请求,里面有些数据不是服务器返回的数据,而只有data才是服务器返回的,所以我们把data解构复制出来,重命名为res
               const res = await this.axios.post('http://localhost:5050/user/insert',insertJson);
               console.log(res)
               //判断登录状态码
               if(res.data.code != 200 ) return this.$message.error("register fail");
               else this.$message.success("register success");
               //2. 通过导航跳转到主页,路由地址是/login  
               this.$router.push("/login");
            });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.outside-div{
    width: 60%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 500px;
}
</style>

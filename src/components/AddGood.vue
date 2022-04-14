<template>
<search-header>
    <!-- 添加 -->
    <div style="width:60%;margin-left:15%;margin-top:1%;">
        <div style="margin-bottom:1%;">
            <el-input v-model="input" placeholder="请输入内容" maxlength="50"></el-input>
        </div>
        <div style="display:flex;">
            <el-upload class="avatar-uploader" action="http://8.130.16.197:5050/user/upload" name="image" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div style="width:60%;margin-left:5%;">
                <el-input placeholder="请输入价格" v-model="input1">
                    <template slot="prepend">Price: </template>
                    <template slot="append"> RMB </template>
                </el-input>
                <el-input style="margin-top:5%;" placeholder="请输入备注" v-model="input2">
                    <template slot="prepend">备注: </template>
                </el-input>
                <el-button style="margin-top:5%;" @click="post()">post</el-button>
            </div>
        </div>
    </div>
</search-header>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: '',
            trueUrl: '',
            urlGood: this.GLOBAL.urlGood,
            input: '',
            input1: '',
            input2: '',

        }
    },
    methods: {
        post() {
            var json = {
                "goodName": this.input,
                "goodPrice": this.input1,
                "goodText": this.input2,
                "goodImg": this.trueUrl,
            }
            this.axios({
                    url: this.urlGood + 'add-good',
                    method: 'post',
                    data: json, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        "token": this.token,
                    }
                })
                .then(res => {
                    window.sessionStorage.setItem("token", this.token);
                    this.$router.push("/good");
                    this.$message('发布成功')

                })
                .catch(err => {
                    console.log(err)
                })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.trueUrl = res.oneData
            console.log(this.trueUrl)
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
    },
}
</script>

<style>
.avatar-uploader {
    margin-left: 10%;
}

.avatar-uploader .el-upload {
    border: 1px dashed #585656;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF solid 1px;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: #dadada solid 1px
}

.avatar {

    width: 178px;
    height: 178px;
    display: block;
}
</style>

<template>
<el-container>
    <!-- 头部标题区域 -->
    <el-header style="display:flex;margin-top:10px;border-bottom:1px solid grey;">
        <div style="margin-top:6px;font-size:20px;width:6%;">
            <span>文章创作:</span>
        </div>
        <div style="width:75%;">
            <el-input type="text" placeholder="请输入文章标题" v-model="artTitle" maxlength="32" clearable show-word-limit>
            </el-input>
        </div>
        <div style="margin-left:10px;">
            <el-button type="info" @click="save">草稿</el-button>
            <el-button style="margin-left:10px;" @click="post" v-loading.fullscreen.lock ="routerLoading">发布</el-button>
        </div>
        <div>
            <a href="">
                <img class="thumb-ph" :src="usrInfo.usrText" alt="">
            </a>
        </div>
    </el-header>
    <el-main>
        <!-- 主题编辑区域 -->
        <div>
            <el-input type="textarea" :rows="50" autocomplete="true" minlength="100" show-word-limit maxlength="2000" placeholder="请输入内容" v-model="artText">

            </el-input>
        </div>
        <div style="margin-top:1%;display:flex;width:100%;">
            <el-upload drag name="image" action="http://8.130.16.197:21000/article/upload" :before-upload="beforeUpload" :on-success="upSuccess" :on-error="upError" :on-remove="upRemve" :on-change="upChange" enctype="multipart/form-data" :multiple="false">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                    将图片拖到此处，或<em>点击上传</em>
                </div>
            </el-upload>

            <!-- 类型区域 -->
            <div style="width:15%;margin-left:2%;margin-top:4%;">
                <el-select v-model="artType" placeholder="请选择类型标签">
                    <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </div>
        </div>
        <!-- 类型,梗概区域 -->
        <div style="display:flex;margin-top:20px;width:100%;">

            <!-- 简要区域 -->
            <div style="width:100%;">
                <el-input type="text" placeholder="请输入简要" v-model="artSummary" maxlength="100" show-word-limit>
                </el-input>
            </div>
        </div>
    </el-main>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            routerLoading:false,
            usrInfo: '',
            artTitle: '',
            artText: '',
            artType: '',
            artSummary: '',
            backArtUrl: '',
            artInfo: '',
            token: window.sessionStorage.getItem('token'),
            usrId: '1',
            // url: "http://8.130.16.197:21000/article/",
            urlArt: this.GLOBAL.urlArt,
            urlUsr: this.GLOBAL.urlUsr,
            options: [{
                label: '日常',
                options: [{
                    value: '资讯',
                    label: '资讯'
                }, {
                    value: '测评',
                    label: '测评'
                }]
            }, {
                label: '主机',
                options: [{
                    value: '显卡',
                    label: '显卡'
                }, {
                    value: '中央处理器',
                    label: '中央处理器'
                }, {
                    value: '内存',
                    label: '内存'
                }, {
                    value: '硬盘',
                    label: '硬盘'
                }, {
                    value: '电源',
                    label: '电源'
                }, {
                    value: '散热',
                    label: '散热'
                }]
            }, {
                label: '笔记本',
                options: [{
                    value: '游戏本',
                    label: '游戏本'
                }, {
                    value: '商务本',
                    label: '商务本'
                }, {
                    value: '平板',
                    label: '平板'
                }]
            }, {
                label: '外设',
                options: [{
                    value: '键鼠',
                    label: '键鼠'
                }, {
                    value: '显示器',
                    label: '显示器'
                }, {
                    value: '耳机',
                    label: '耳机'
                }]
            }]
        }
    },
    methods: {
        post() {
            console.log(this.activeIndex)
            this.routerLoading= true
            var insertJson = {
                "artTitle": this.artTitle,
                "artText": this.artText,
                "artType": this.artType,
                "artSummary": this.artSummary,
                "artUrl": this.backArtUrl,
                "usrId": this.usrId,
            }
            let url = this.urlArt + "insert"
            if (this.$route.params.row != undefined && this.$route.params.row.artId) {
                insertJson.artId = this.$route.params.row.artId,
                    insertJson.artRead = this.$route.params.row.artRead,
                    insertJson.artLike = this.$route.params.row.artLike,
                    url = this.urlArt + "update"
            }
            this.axios({
                    url: url,
                    method: 'post',
                    data: insertJson, //这里json对象会转换成json格式字符串发送
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        'token': window.sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    this.$message('发布成功')
                    window.sessionStorage.setItem("token", this.token);
                    setTimeout(() => {
                        this.$router.push({
                            path: '/article-all',
                            query: {
                                artTitle: this.artTitle
                            }
                        });
                        //延迟时间：5秒
                    }, 5000)
                })
                .catch(err => {
                    this.$message('发布失败')
                    this.routerLoading= false
                    console.log(err)
                })
        },
        getUser() {
            this.axios({
                    url: this.urlUsr + 'if-auth',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        'token': window.sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res)
                    this.usrInfo = res.data.oneData
                })
                .catch(err => {
                    console.log(err)
                })
        },

        save() {

        },
        //上传之前
        beforeUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 10MB!');
            }
            return isLt2M;
        },

        // 上传成功
        upSuccess(res) {
            console.log(res)
            this.backArtUrl = res.oneData;
            this.$message({
                type: 'success',
                message: '上传成功',
                showClose: true,
                offset: 80,
            })
        },
        // 上传失败
        upError() {
            this.$message({
                type: 'error',
                message: '上传失败',
                showClose: true,
                offset: 80,
            });
        },
        //上传的文件改变时（覆盖原来的文件）
        upChange(file, fileList) {

        },
        // 移除列表
        upRemve(file) {
            console.log("ok")
        },
        getParams() {
            console.log(this.$route.params.row)
            if (this.$route.params) {
                this.artTitle = this.$route.params.row.artTitle;
                this.artText = this.$route.params.row.artText;
                this.artType = this.$route.params.row.artType;
                this.artSummary = this.$route.params.row.artSummary;
                this.backArtUrl = this.$route.params.row.artUrl;
                this.usrId = this.$route.params.row.usrId;
            }
        },
    },
    created() {
        this.getUser();
        this.getParams();
    },

}
</script>

<style scoped>
.thumb-ph {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: #fff solid 1px;
    margin-left: 50px;
}
</style>

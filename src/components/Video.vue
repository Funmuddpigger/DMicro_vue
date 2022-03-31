<template>
<search-header>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="10%">
            <!-- 侧边细分菜单 -->
            <el-menu background-color="#fff" text-color="#666" :default-openeds="openeds">
                <!-- 一级菜单 -->
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">资讯</span>
                </el-menu-item>
                <el-submenu index="2">
                    <!-- 一级菜单2模板区域 -->
                    <template slot="title">
                        <i class="el-icon-cpu"></i>
                        <span>DIY</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item-group>
                        <template slot="title">DIY专区</template>
                        <el-menu-item index="教学">视频教学</el-menu-item>
                        <el-menu-item index="分析">硬件分析</el-menu-item>
                        <el-menu-item index="拆解">新品拆解</el-menu-item>
                        <el-menu-item index="推荐">好物推荐</el-menu-item>
                        <el-menu-item index="配置">配置上新</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">大事件</template>
                        <el-menu-item index="组装">组装大事件</el-menu-item>
                        <el-menu-item index="电脑">电脑大事件</el-menu-item>
                        <el-menu-item index="科技">科技大事件</el-menu-item>
                        <el-menu-item index="资讯">资讯大事件</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 右侧主体 -->
        <el-main>
            <div class="top">
                <div style="display:flex;margin-left:6%;">
                    <el-upload class="upload-demo" drag action="http://8.130.16.197:21000/article/upload" name="image" :before-upload="beforeUpload" :on-success="upSuccess" :on-error="upError">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <el-upload class="avatar-uploader" action="http://8.130.16.197:21000/article/upload" name="image" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div>
                    <el-input style="width:80%;margin-top:1%;" placeholder="请输入标题" maxlength="50" v-model="input" clearable>
                    </el-input>
                </div>
                <div style="margin-left:5%;margin-top:1%;">
                    <el-select v-model="value1" placeholder="选择主要分类">
                        <el-option v-for="item in optionsType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select style="margin-left:5%;" v-model="value2" placeholder="选择次级分类" >
                        <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                    <el-button style="margin-left:5%;" @click="postVideo">发布视频</el-button>
                </div>

            </div>
            <div class="flexContainer">
                <div style="margin-top:1%;margin-left:3%;" v-for="(item,index) in videoList" :key="index">
                    <vimg v-bind:srcUrl="item.videoImg" v-bind:text="item.videoTitle" v-bind:date="item.videoPostime" v-bind:videoUrl="item.videoUrl"></vimg>
                </div>
            </div>
        </el-main>
    </el-container>
</search-header>
</template>

<script>
export default {
    data() {
        return {
            urlArt: this.GLOBAL.urlArt,
            urlUsr: this.GLOBAL.urlUsr,
            // src: "http://8.130.16.197:7070/images/2022-03-27/f0e317b5b5d648efae70e509fd8dde84.png",
            videoList: [],
            input: "",
            value1:'',
            value2:'',
            openeds: ["2"],
            optionsType: [{
                value: 'DIY专区',
                label: 'DIY专区'
            }, {
                value: '大事件',
                label: '大事件'
            }],
            options: [{
                label: 'DIY专区',
                options: [{
                    value: '教学',
                    label: '教学'
                }, {
                    value: '分析',
                    label: '分析'
                }, {
                    value: '拆解',
                    label: '拆解'
                }, {
                    value: '推荐',
                    label: '推荐'
                }, {
                    value: '配置',
                    label: '配置'
                }]
            }, {
                label: '大事件',
                options: [{
                    value: '组装',
                    label: '组装'
                }, {
                    value: '电脑',
                    label: '电脑'
                }, {
                    value: '科技',
                    label: '科技'
                }, {
                    value: '资讯',
                    label: '资讯'
                }]
            }],
            value:'',
            trueUrl:'',
            videoUrl:'',
            imageUrl:'',
            token:window.sessionStorage.getItem('token'),
        }

    },
    methods: {
        getVideoList() {
            var searchJson = {
                "videoType": this.value1,
                "videoType2": this.value2
            }
            this.axios({
                    url: this.urlArt + 'video-select',
                    method: 'post',
                    data: searchJson, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json' //如果写成contentType会报错,如果不写这条也报错
                    }
                })
                .then(res => {
                    this.videoList = res.data.data
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.trueUrl = res.oneData
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
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
            this.videoUrl = res.oneData;
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
        postVideo() {
            console.log(this.value1)
            console.log(this.value2)
             var json = {
                "videoTitle":this.input,
                "videoImg":this.trueUrl,
                "videoUrl":this.videoUrl,
                "videoType": this.value1,
                "videoType2": this.value2
            }
            this.axios({
                    url: this.urlArt + 'video-insert',
                    method: 'post',
                    data: json, //这里json对象会转换成json格式字符串发送
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        'token':window.sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res)
                    
                    this.getVideoList()
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    created() {
        this.getVideoList()
    }
}
</script>

<style scoped>
.avatar-uploader{
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

.top {
    margin-left: 10%;
    margin-top: 1%;
}

.el-aside .el-menu {
    border-right: none;
}

::v-deep.el-menu-item {
    min-width: 3%;
}

.flexContainer {
    margin-top: 1%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}
</style>

<template>
<search-header>
    <el-main>
        <div style="display:flex;">
            <!--作者分栏 作者小卡片,推荐文章等等 -->
            <div class="art-left">
                <el-card shadow="never">
                    <img :src="usrInfo.usrText" class="image">
                    <div style="padding: 14px;display:flex;width:60%;">
                        <span>{{nickName}}</span>
                        <!-- <div class="bottom">
                            <el-button type="text" class="button" @click="more(usrId)">更多信息</el-button>
                        </div> -->
                        <el-button type="text" class="button" @click="more(usrId)">更多信息</el-button>
                    </div>
                </el-card>
            </div>
            <!-- 文章主体 -->
            <div class="art-main">
                <div style="width:90%;margin:10px 0 10px 5%;">
                    <span style="font-size:20px;">{{artTitle}}</span>
                    <div style="margin-top:20px;margin-bottom:5px;border-bottom:1px solid grey;padding-bottom:10px;">
                        <span>分类:
                            <el-tag type="warning" style="background:#fff">{{artType}}</el-tag>
                        </span>
                    </div>
                    <div style="height:100%;">
                        <p>{{artText}}
                        </p>
                    </div>
                    <div class="like-div">
                        <el-button type="text" style="color:gray;" v-if="!isLike" icon="el-icon-caret-top" @click="like(artInfo.artId)">赞 {{artLike}}</el-button>
                        <el-button type="text" style="color:red;" v-else icon="el-icon-caret-top" @click="like(artInfo.artId)">已赞 {{artLike}}</el-button>
                        <el-button icon="el-icon-view" type="text" style="margin-left:20px;color:gray;" disbaled>阅读量 {{artRead}}</el-button>
                    </div>
                </div>
                <!-- 评论区 -->
                <div class="art-com">
                    <div style="display:flex;">
                        <div style="width:80%;">
                            <el-input placeholder="请写下你的评论" v-model="comment"></el-input>
                        </div>
                        <div style="width:20%;">
                            <el-button  @click="post">评论</el-button>
                        </div>
                    </div>
                    <div style="display:flex;border-bottom: #f0f5f5 solid 1px;" v-for="(item,index) in commentList" :key=index>
                        <div style="width:7%;">
                            <a href="">
                                <img class="thumb-ph" :src="item.usr.usrText" alt="">
                            </a>
                        </div>
                        <div style="width:20%;margin-top:10px;font-size:10px;">
                            <span> {{item.usr.usrNickname}}</span>
                        </div>
                        <div>
                            <span style="font-size:10px;color:grey;">
                                {{item.comment.comText}}
                            </span>
                            <!-- <el-button type="text" icon="el-icon-caret-top" style="padding-left:5px;color:rgb(172, 172, 166);font-size:10px;">==点赞{{item.comment.comLike}}</el-button> -->
                            <el-button type="text" icon="" style="padding-left:5px;color:rgb(172, 172, 166);font-size:10px;">删除</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 文章相关列表 -->
            <div>
                <!-- 评分条 -->
                <div class="block">
                    <span class="demonstration">觉得文章满意吗?</span>
                    <el-rate v-model="score" :colors="colors">
                    </el-rate>
                </div>
            </div>
        </div>
    </el-main>
</search-header>
</template>

<script>
export default {
    data() {
        return {
            urlArt: this.GLOBAL.urlArt,
            urlUsr: this.GLOBAL.urlUsr,
            urlCom: this.GLOBAL.urlCom,
            score: null,
            colors: {
                2: '#99A9BF',
                4: {
                    value: '#F7BA2A',
                    excluded: true
                },
                5: '#FF9900'
            },
            artTitle: "",
            artType: "",
            artText: "",
            artRead: "",
            artLike: "",
            token: window.sessionStorage.getItem('token'),
            commentList: [],
            nickName: "",
            isLike: true,
            usrId: "",
            usrInfo: "",
            artInfo: "",
            artId: '',
            comment: '',
        }
    },
    methods: {
        post() {
            var json = {
                "artId": this.artInfo.artId,
                "comText": this.comment,
            }
            this.axios({
                    url: this.urlCom + 'insert',
                    method: 'post',
                    data: json, //这里json对象会转换成json格式字符串发送
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        "token":window.sessionStorage.getItem('token'),
                    }
                })
                .then(res => {
                    console.log(res)
                    this.comment = '',
                    this.getParams();
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getParams() {
            this.artTitle = this.$route.query.artTitle;
            var searchJson = {
                "title": this.artTitle,
            }
            this.axios({
                    url: this.urlArt + 'select-es',
                    method: 'post',
                    data: searchJson, //这里json对象会转换成json格式字符串发送
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        "token": window.sessionStorage.getItem('token'),
                    }
                })
                .then(res => {
                    console.log(res)
                    this.artText = res.data.oneData.artText,
                        this.artType = res.data.oneData.artType,
                        this.artRead = res.data.oneData.artRead,
                        this.artLike = res.data.oneData.artLike,
                        this.usrId = res.data.oneData.usrId,
                        this.commentList = res.data.data,
                        this.isLike = res.data.mapData.isLike,
                        this.getUsrInfo(this.usrId)
                    this.artInfo = res.data.oneData,
                        this.read(this.artInfo.artId)
                    console.log(this.isLike)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getUsrInfo(usrId) {
            //调用的后台接口
            let url = this.urlUsr + "select-by-id?id=" + usrId;
            //从后台获取到对象数组
            this.axios.get(url).then((res) => {
                //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                console.log(res.data)
                this.nickName = res.data.oneData.usrNickname
                this.usrInfo = res.data.oneData
            }).catch((error) => {
                console.log(error);
            });
        },
        read(param) {
            var json = {
                "artId": param,
            }
            this.axios({
                    url: this.urlArt + 'read',
                    method: 'post',
                    data: json, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                    }
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        like(param) {
            console.log(param)
            var json = {
                "artId": param,
                "token": this.token,
            }
            this.axios({
                    url: this.urlArt + 'like',
                    method: 'post',
                    data: json, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        'token': this.token
                    }
                })
                .then(res => {
                    console.log(res)
                    this.isLike = res.data.oneData,
                        this.artLike = res.data.total
                })
                .catch(err => {
                    console.log(err)
                })
        },
        more(param) {
            this.$router.push({
                path: '/usr',
                query: {
                    usrId: param
                }
            })
            window.sessionStorage.setItem("token", this.token);
        },

    },
    created() {
        this.getParams();
    },
}
</script>

<style scoped>
.block {
    margin-left: 10%;
    width: 100%;
    border: 1px solid #f0f5f5;
    border-radius: 5%;
    padding: 10px;
    color: rgb(172, 172, 166);
    font-size: 20px;
}

.art-main {
    width: 50%;
    margin-left: 1%;
    border: 1px solid #f0f5f5;
    border-radius: 2%;
}

.art-com {
    width: 90%;
    margin-left: 5%;

}

.like-div {

    margin-left: 10px;
}

.art-left {
    width: 20%;
    margin-left: 8%;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.thumb-ph {
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: #fff solid 1px;
}
</style>

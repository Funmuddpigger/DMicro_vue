<template>
<search-header>
        <el-main>
        <!-- 头部资料卡片 -->
        <div class="top-header">
            <!-- 头部本人主页标识 -->
            <div class="big-thumb-img">
                <img shape="square" :size="50" :src="usrData.usrText">
            </div>
            <!-- 基本人物资料 -->
            <div class="title-span-div">
                <span style="font-size:25px;">{{usrData.usrNickname}}</span>
                <span type="text" style="float:left;margin-left:10%;color:black;cursor:pointer;border-bottom:1px solid" v-if="!isFollowed" @click="follow(usrData.usrId)">关注</span>
                <span type="text" style="float:left;margin-left:10%;color:black;cursor:pointer;border-bottom:1px solid" v-if="isFollowed" @click="follow(usrData.usrId)">取消关注</span>
                <span style="float:left;margin-left:20%;">粉丝数 {{fansNum}}</span><span style="float:left;margin-left:10%;">点赞数 {{like}}</span><span style="float:left;margin-left:10%;">文章数 {{total}}</span>
            </div>
        </div>
        <!-- 下方文章导航 -->
        <div class="card-bottom">
                    <!-- 左侧导航卡片 -->
            <div style="width:25%;padding-bottom:10px;">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>用户粉丝</span>
                        <el-button style="float: right; padding: 3px 0;color:grey;" type="text">查看更多</el-button>
                    </div>
                    <div v-for="(item,index) in fansList" :key="index" class="text item" style="margin-bottom:5px;" @click="tapToUsr(item.usrId)">
                        {{item.usrNickname}}
                    </div>
                </el-card>
            </div>
            <!-- 右侧本人文章管理 -->
            <div class="article-admin">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="发布日期" width="230">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                   <el-table-column label="文章标题" width="570">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-left:20%;">
                    <el-pagination
                        :page-size="10"
                        :pager-count="11"
                        layout="prev, pager, next"
                        :total="10">
                     </el-pagination>
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
            squareUrl: "../assets/logo.png",
            tableData: [],
            page:"1",
            pageSize:"10",
            token:window.sessionStorage.getItem('token'),
            queryString:"",
            urlArt: "http://8.130.16.197:7070/article/",
            urlUsr: "http://8.130.16.197:5050/user/",
            usrData:"",
            total:"",
            like:0,
            usrId:"",
            fansList:[],
            isFollowed:false,
            fansNum:0,
        }
    },
    created() {
        this.getArticleByUsr()
    },
    methods: {
        getArticleByUsr(){
           this.usrId = this.$route.query.usrId;
           var searchJson = {
                "key":this.usrId,
                "page": this.page,
                "pageSize": this.pageSize,
            }
            this.axios({
                    url: this.urlArt + 'search-usr',
                    method: 'post',
                    data: searchJson, //这里json对象会转换成json格式字符串发送
                    headers: {
                        'Content-Type': 'application/json' ,//如果写成contentType会报错,如果不写这条也报错
                        'token': window.sessionStorage.getItem('token')
                    },
                })
                .then(res => {
                    console.log(res.data)
                    this.tableData = [],
                    this.like = 0;
                    this.usrData = res.data.oneData
                    this.total = res.data.total
                   for (let i = 0; i < res.data.data.length; i++) {
                    this.tableData.push({
                        "date": res.data.data[i].artPostime,
                        "name": res.data.data[i].artTitle,
                    });
                    this.like = res.data.data[i].artLike + this.like
                    this.fansList = res.data.mapData.fans
                    this.isFollowed = res.data.mapData.isFollowed
                    this.fansNum = res.data.mapData.fansNum 
                   }
                })
                .catch(err => {
                    console.log(err)
                })
            window.sessionStorage.setItem("token", this.token);
        },
        handleEdit(index, row) {
        console.log(index, row);
        },
        handleDelete(index, row) {
        console.log(index, row);
        },
        follow(param){
            var json = {
                "usrId":param
            }
            console.log(param)
            this.axios({
                    url: this.urlUsr + 'follow',
                    method: 'post',
                    data: json, //这里json对象会转换成json格式字符串发送
                    headers: {
                        'Content-Type': 'application/json',//如果写成contentType会报错,如果不写这条也报错
                        'token': window.sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    this.isFollowed = res.data.oneData
                    this.getArticleByUsr()
                    console.log(this.isFollowed)
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            this.$router.push({
               path:'/usr',
               query:{
                   usrId:param
               }
           })
           window.sessionStorage.setItem("token", this.token);
        },
        getParams(){
            this.usrId = this.$route.query.usrId;
            console.log(this.usrId)
        },
        tapToUsr(param){
                this.$router.push({
               path:'/usr',
               query:{
                   usrId:param
               }
           })
           window.sessionStorage.setItem("token", this.token);
        }
    },
    created(){
        this.getArticleByUsr();
    },
}
</script>

<style scoped>
.home-container {
    height: 100%;
}

.el-header {
    display: flex;
    /* 左右对齐 */
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
}

.el-header div {
    font-size: larger;
    margin-left: 1%;
}

.el-button-home {
    color: black;
}

.thumb-ph {
    width: 30%;
    height: 30%;
    border-radius: 50%;
}

.header-right-div {
    display: flex;
}

.thumb-ph {
    margin-top: 5px;
    width: 25px;
    height: 25px;
    border-radius: 10px;
    border: grey 0.1px;
    margin-right: 20px;
}

a {
    text-decoration: none;
    text-decoration: none;
    padding-left: 10px;
    color: gray;
}

.header-first-div {
    display: flex;
}

.search-div {
    margin-top: 15px;
    width: 70%;
    display: flex;

}

.search-div div {
    width: 80%;
    text-align: center;
    margin-left: 10%;
}

.el-header div {
    display: flex;
}

.left-icon {
    align-items: center;
}

.left-but {
    padding-left: 20%;
}

.left-div {
    margin-left: 2%;
    width: 16%;
    float: left;
}

.top-div {
    padding-bottom: 2%;

}

.title-bottom-div {
    height: 50%;

}

.bottom-detail-div {
    background-color: white;
    width: 85%;
    height: auto;
    margin-left: 15%;
}

.bottom-detail-div:hover {
    background-color: #ccc;
}

.right-div {
    width: 70%;
    overflow: auto;
    display: column;
}

.like-div {
    padding-left: 2%;
    display: flex;
    width: 80%;
}

.search-div {
    margin-top: 15px;
    width: 70%;
    display: flex;

}

.search-div div {
    width: 80%;
    text-align: center;
    margin-left: 10%;
}

.bottom-right-hotdiv {
    width: 18%;
    margin-left: 1%;
    margin-top: 5%;
    margin-right: 12%;
}

li {
    padding-top: 2%;
}

.top-header {
    margin-top: 100px;
    width: 80%;
}

.big-thumb-img {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
}

.big-thumb-img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
}

.title-span-div {
    position: absolute;
    top: 270px;
    left: 0;
    right: 0;
    margin: auto;
    width: 70%;
    height: 10%;
    background: #fff;
    border: 1px solid #f0f5f5;
    border-radius: 2%;
}

.title-span-div span {
    text-align: center;
    display: block;
    font-size: 20px;
    color: grey;
}

.card-bottom {
    display: flex;
    margin-left: 14%;
    margin-top: 280px;
    width: 72%;                                                                                                                                                          

}
.article-admin{
    width: 75%;
    border: 1px solid #f0f5f5;
    margin-left: 1%;
    margin-right: 0;
}
</style>

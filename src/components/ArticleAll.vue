<template>
<el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="box-shadow:0 0 10px #e0e0eb;padding-bottom:10px;">
        <div class="header-first-div">
            <div>
                <span class="left-icon">DMicro</span>
            </div>
            <div class="left-but">
                <el-button class="el-button-home" type="text" @click="home">首页</el-button>
                <el-button class="el-button-home" type="text" @shop="mine">商城</el-button>
                <el-button class="el-button-home" type="text" @community="create">社区</el-button>
            </div>
        </div>
        <!-- 搜索栏 -->
        <div class="search-div">
            <div>
                <el-autocomplete style="font-size:15px;" :trigger-on-focus="false" :fetch-suggestions="getSuggest" v-model="queryString" @select="queryString" placeholder="请输入内容">
                </el-autocomplete>
                <el-button slot="append" icon="el-icon-search" @click="searchArticle"></el-button>
            </div>
        </div>
        <div class="header-right-div">
            <img class="thumb-ph" src="../assets/logo.png" alt="">
            <el-button class="el-button-home" type="text" @click="mine">我的</el-button>
            <el-button class="el-button-home" type="text" @click="create">创作</el-button>
            <el-button class="el-button-home" type="text" @click="logout">注销</el-button>
        </div>
    </el-header>
    <el-main>
        <div style="display:flex;">
            <!--作者分栏 作者小卡片,推荐文章等等 -->
            <div class="art-left" > 
                <el-card shadow="never">
                    <img src="../assets/logo.png" class="image">
                    <div style="padding: 14px;">
                        <span >White and Tea</span>
                        <div class="bottom clearfix">
                            <el-button type="text" class="button">更多信息</el-button>
                        </div>
                    </div>
                </el-card>
            </div>
            <!-- 文章主体 -->
            <div class="art-main" >
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
                        <el-button type="text" style="color:gray;" icon="el-icon-caret-top">赞 {{artLike}}</el-button>
                        <el-button icon="el-icon-view" type="text" style="margin-left:20px;color:gray;" disbaled>阅读量 {{artRead}}</el-button>
                    </div>
                </div>
                <!-- 评论区 -->
                <div class="art-com">
                    <div>
                        <el-input placeholder="请写下你的评论"></el-input>
                    </div>
                    <div style="display:flex;border-bottom: #f0f5f5 solid 1px;" v-for="(item,index) in commentList" :key=index>
                        <div style="width:7%;">
                            <a href="">
                                <img class="thumb-ph" src="../assets/logo.png" alt="">
                            </a>
                        </div>
                        <div style="width:20%;margin-top:10px;font-size:10px;">
                             <span > {{item.usrId}}</span>
                        </div>
                        <div>
                            <span style="font-size:10px;color:grey;">
                                {{item.comText}}
                            </span>
                            <el-button type="text" icon="el-icon-caret-top"  style="padding-left:5px;color:rgb(172, 172, 166);font-size:10px;">==点赞{{item.comLike}}</el-button>
                            <el-button type="text" icon="" style="padding-left:5px;color:rgb(172, 172, 166);font-size:10px;">删除</el-button>
                        </div>
                    </div>
                </div>

                

            </div>
            <!-- 文章相关列表 -->
             <div >
                <!-- 评分条 -->
                <div class="block" >
                <span class="demonstration">觉得文章满意吗?</span>
                <el-rate
                    v-model="score"
                    :colors="colors">
                </el-rate>
                </div>
            </div>
        </div>   
    </el-main>
</el-container>
</template>

<script>
export default {
    data() {
            return {
                url: "http://localhost:7070/article/",
                score: null,
                colors: { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' },
                artTitle:"",
                queryString: "",
                artType:"",
                artText:"",
                artRead:"",
                artLike:"",
                commentList:[],
            }
        },
    methods: {
        searchArticle: function () {
            var searchJson = {
                "key": this.queryString,
                "page": this.page,
                "pageSize": this.pageSize,
            }
            this.axios({
                    url: this.url + 'search',
                    method: 'post',
                    data: searchJson, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json' //如果写成contentType会报错,如果不写这条也报错
                    }
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
            window.sessionStorage.setItem("token", "123456789");
            this.$router.push("/search-info");
        },
         handleSelect(key, keyPath) {
            this.activeIndex = key;
            this.getArticleList();
        },
        // 当需要用this指向外部函数的时候,需要用箭头函数或者用别的变量替代只想外部的this,当在then内用this,this指向HTTP request event,已经不是外部默认的vue对象了   
        getSuggest(queryString, callback) {
            var list = [];
            //调用的后台接口
            let url = this.url + "suggest?suggestKey=" + queryString;
            //从后台获取到对象数组
            this.axios.get(url).then((res) => {
                //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                console.log(res)
                for (let i = 0; i < res.data.length; i++) {
                    console.log({
                        "value": res.data[i]
                    })
                    list.push({
                        "value": res.data[i]
                    });

                }
                console.log(list)
                callback(list);
            }).catch((error) => {
                console.log(error);
            });
        },
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        mine() {
            window.sessionStorage.setItem("token", "123456789");
            this.$router.push("/mine");
        },
        create() {
            window.sessionStorage.setItem("token", "123456789");
            this.$router.push("/create");
        },
        shop() {

        },
        community() {

        },
        home() {
            window.sessionStorage.setItem("token", "123456789");
            this.$router.push("/home");
        },
        getParams(){
            this.artTitle = this.$route.query.artTitle;
            var searchJson = {
                "title": this.artTitle,
            }
            this.axios({
                    url: this.url + 'select-es',
                    method: 'post',
                    data: searchJson, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json' //如果写成contentType会报错,如果不写这条也报错
                    }
                })
                .then(res => {
                    console.log(res.data)
                    this.artText = res.data.oneData.artText,
                    this.artType = res.data.oneData.artType,
                    this.artRead = res.data.oneData.artRead,
                    this.artLike = res.data.oneData.artLike,
                    this.commentList = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    created(){
        this.getParams();
    },
}
</script>

<style scoped>
/* 头部start */
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
    display: flex;
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

.left-icon {
    align-items: center;
}

.left-but {
    padding-left: 20%;
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

.el-button-home {
    color: black;
}

/* 头部end */

.block{
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
.art-com{
    width: 90%;
    margin-left: 5%;


}
.like-div{

    margin-left: 10px;
}

.art-left{
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

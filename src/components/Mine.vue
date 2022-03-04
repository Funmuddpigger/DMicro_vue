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
        <!-- 头部资料卡片 -->
        <div class="top-header">
            <!-- 头部本人主页标识 -->
            <div class="big-thumb-img">
                <img shape="square" :size="50" src="../assets/logo.png">
            </div>
            <!-- 基本人物资料 -->
            <div class="title-span-div">
                <span style="font-size:25px;">{{usrData.usrNickname}}</span>
                <span style="float:left;margin-left:20%;">粉丝数 {{fansData.fansNum}}</span><span style="float:left;margin-left:10%;">点赞数 {{like}}</span><span style="float:left;margin-left:10%;">文章数 {{total}}</span>
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
                    <div v-for="(item,index) in fansData.fans" :key="index" class="text item" style="margin-bottom:5px;">
                        {{item.usrNickname}}
                    </div>
                </el-card>
            </div>
            <!-- 右侧本人文章管理 -->
            <div class="article-admin">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="发布日期" width="190">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                   <el-table-column label="文章标题" width="480">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="修改">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-edit" style="color:grey;" size="mini" type="text"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button icon="el-icon-delete" style="color:grey;" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
</el-container>
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
            urlArt: "http://localhost:7070/article/",
            urlUsr: "http://localhost:5050/user/",
            usrData:"",
            total:"",
            like:0,
            fansData:"",

        }
    },
    created() {
        this.getArticleByUsr()
    },
    methods: {
        searchArticle: function () {
            var searchJson = {
                "key": this.queryString,
                "page": this.page,
                "pageSize": this.pageSize,
            }
            this.axios({
                    url: this.urlArt + 'search',
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
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/search-info");
        },
        // 当需要用this指向外部函数的时候,需要用箭头函数或者用别的变量替代只想外部的this,当在then内用this,this指向HTTP request event,已经不是外部默认的vue对象了   
        getSuggest(queryString, callback) {
            var list = [];
            //调用的后台接口
            let url = this.urlArt + "suggest?suggestKey=" + queryString;
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
        getArticleByUsr(){
           var searchJson = {
                "page": this.page,
                "pageSize": this.pageSize,
            }
            console.log()
            this.axios({
                    url: this.urlArt + 'search-usr',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json' ,//如果写成contentType会报错,如果不写这条也报错
                        'Token': window.sessionStorage.getItem('token')
                    },
                    data: searchJson //这里json对象会转换成json格式字符串发送
                })
                .then(res => {
                    console.log(res.data)
                    this.usrData = res.data.oneData
                    this.total = res.data.total
                   for (let i = 0; i < res.data.data.length; i++) {
                    this.tableData.push({
                        "date": res.data.data[i].artPostime,
                        "name": res.data.data[i].artTitle,
                    });
                    this.like = res.data.data[i].artLike + this.like
                    this.fansData = res.data.mapData
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
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        mine() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/mine");
        },
        create() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/create");
        },
        shop() {

        },
        community() {

        },
        home() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/home");
        }
    }
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

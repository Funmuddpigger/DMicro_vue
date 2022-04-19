<template>
<search-header>
    <!-- 文章搜索区--左 -->
    <div style="display:flex;margin-left:6%;">
        <div style="display:block;margin-top:2%;">
            <div class="bottom-detail-div" v-for="(item,index) in articleList" :key="index">
                <a style="margin-left: 5px; color:black;font-size: 20px;">
                    <span v-html="item.artTitle"></span>
                </a>
                <div style="margin-left: 1%; margin-top: 1%; display: flex;">
                    <div class="right-div">
                        <div class="title-bottom-div">
                            <a href="javascript:void(0)" @click="tapToArticle(item.artTitle)">
                                <span v-html="item.artSummary"></span>
                            </a>
                        </div>
                        <div class="like-div">
                            <el-button type="text" style="color:gray;" icon="el-icon-caret-top">赞 {{item.artLike}}</el-button>
                            <el-button icon="el-icon-view" type="text" style="margin-left:20px;color:gray;" disbaled>阅读量 {{item.artRead}}</el-button>
                            <!-- <el-button icon="el-icon-chat-line-square" type="text" style="margin-left:20px;color:gray;" disbaled>评论 56</el-button> -->
                            <el-button type="text" icon="el-icon-user" style="margin-left:20px;color:gray;" disabled>作者编号 {{item.usrId}}</el-button>
                            <el-button type="text" style="margin-left:20px;color:gray;" disabled>{{item.artPostime}}</el-button>
                        </div>
                    </div>
                    <div class="left-div">
                        <el-image class="small-img" :src="item.artUrl"></el-image>
                    </div>
                </div>
                <el-divider></el-divider>
            </div>
            <!-- 翻页条 -->
            <div style="margin-left:30%;">
                <el-pagination @current-change="handleChange" :page-size="pageSize" :pager-count="pagerCount" :current-page="currentPage" :total="total" layout="prev, pager, next">
                </el-pagination>
            </div>
        </div>
        <!-- 右边热搜榜单区 -->
        <div class="bottom-right-hotdiv">
            <div>
                <span style="margin-left:5%;font-size: 20px; font-weight: bolder;color:#862d2d;">热搜趋势榜</span>
                <el-divider></el-divider>
            </div>
            <div>
                <ol>
                    <li>跑路</li>
                    <li>删库</li>
                    <li>走人</li>
                    <li>显卡</li>
                </ol>
            </div>

            <!-- 时间区 -->
            <div class="cal-div">
                <el-calendar v-model="value" style="width:50;font-size:5px;">
                </el-calendar>
            </div>
        </div>
    </div>
</search-header>
</template>

<script>
export default {
    data() {
        return {
            pagerCount: 5,
            count: 1,
            currentPage: 1,
            total: 1,
            pageSize: 10,
            queryString :"",
            urlArt: this.GLOBAL.urlArt,
            urlUsr: this.GLOBAL.urlUsr,
            queryString: "",
            suggestions: [],
            articleList: [],
            value: new Date(),
            key: "",
            total:1000,
            token: window.sessionStorage.getItem('token')
        }
    },
    created() {
        this.getParams();
    },
    methods: {
        getParams() {
            this.queryString = this.$route.query.res;
            console.log(this.queryString)
            this.searchArticle();
        },
        searchArticle: function () {
            var searchJson = {
                "key": this.queryString,
                "page": this.currentPage,
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
                    this.articleList = res.data.data
                    this.total = res.data.total
                })
                .catch(err => {
                    console.log(err)
                })
            this.$router.push({
                path: '/search-info',
                query: {
                    res: this.queryString
                }
            })
            .catch(()=>{})
            window.sessionStorage.setItem("token", this.token);
        },
         handleChange(val) {
            console.log(val)
            this.currentPage = val
            this.articleList = [],
            this.searchArticle()
        },
        tapToArticle(param) {
            param = param.replace("<em style='color:red;'>","");
            param = param.replace("</em>","");
            console.log(param)
            this.$router.push({
                path: '/article-all',
                query: {
                    artTitle: param
                }
            })
            window.sessionStorage.setItem("token", this.token);
        },
    },

}
</script>

<style scoped>
.cal-div {
    margin-top: 50px;
}

.cal-div /deep/ .el-calendar-table .el-calendar-day {
    font-size: 1px;
    height: 30px;
}

.thumb-ph {
    width: 30%;
    height: 30%;
    border-radius: 50%;
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

.el-header div {
    display: flex;
}

.left-div {
    margin-left: 5%;
    width: 15%;
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
</style>

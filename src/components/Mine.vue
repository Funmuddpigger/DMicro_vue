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
                    <el-table-column label="发布日期" width="190" prop="artPostime">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.artPostime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="文章标题" width="480" prop="artTitle">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.artTitle }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="修改">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-edit" style="color:grey;" size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button icon="el-icon-delete" style="color:grey;" size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="margin-left:20%;">
                    <el-pagination @current-change="handleChange" :page-size="pageSize" :pager-count="pagerCount" :current-page="currentPage" :total="total" layout="prev, pager, next" >
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
            pagerCount: 5,
            count: 1,
            currentPage: 1,
            squareUrl: "../assets/logo.png",
            tableData: [],
            pageSize: 10,
            token: window.sessionStorage.getItem('token'),
            queryString: "",
            urlArt: this.GLOBAL.urlArt,
            urlUsr: this.GLOBAL.urlUsr,
            usrData: "",
            total: 1,
            like: 0,
            fansData: "",

        }
    },
    created() {
        this.getArticleByUsr()
    },
    methods: {
        handleChange(val) {
            console.log(val)
            this.currentPage = val
            this.tableData = [],
                this.getArticleByUsr()
        },
        getArticleByUsr() {
            var searchJson = {
                "page": this.currentPage,
                "pageSize": this.pageSize,
            }
            console.log()
            this.axios({
                    url: this.urlArt + 'search-usr',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        'token': window.sessionStorage.getItem('token')
                    },
                    data: searchJson //这里json对象会转换成json格式字符串发送
                })
                .then(res => {
                    console.log(res.data)
                    this.usrData = res.data.oneData
                    this.total = res.data.total
                    this.tableData=res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
            window.sessionStorage.setItem("token", this.token);
        },
        handleEdit(index, row) {
            console.log(row)
            this.$router.push({
                name: 'create',
                params: {row}

            })
            window.sessionStorage.setItem("token", this.token);
        },
        handleDelete(index, row) {
            let url = this.urlArt + "del?artId=" + row.artId;
            this.axios.get(url).then((res) => {
                console.log(res)
                setTimeout(() => {
                    this. getArticleByUsr();
                //延迟时间：5秒
            }, 3000)

            }).catch((error) => {
                console.log(error);
            });
            
        },
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

.article-admin {
    width: 75%;
    border: 1px solid #f0f5f5;
    margin-left: 1%;
    margin-right: 0;
}
</style>

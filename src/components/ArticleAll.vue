<template>
    <el-cotainer class="home-container">
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
        <div>
                <!--作者分栏 作者小卡片,推荐文章等等 -->
            <div>

            </div>
                <!-- 文章主体 -->
            <div>

            </div>
        </div>
        <div>
            <!-- 文章相关列表 -->
            <div>
                
            </div>
        </div>
    </el-main>
    </el-cotainer>
</template>

<script>
export default {
    methods: {
        data() {
        return {
            
        }
    },
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
    }
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
</style>
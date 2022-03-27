<template>
    <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="box-shadow:0 0 10px #e0e0eb;padding-bottom:10px;">
        <div class="header-first-div"  >
            <div>
                <span class="left-icon">DMicro</span>
            </div>
            <div class="left-but">
                <el-button class="el-button-home" type="text" @click="home">首页</el-button>
                <el-button class="el-button-home" type="text" @click="video">DIY视频专区</el-button>
                <el-button class="el-button-home" type="text" @click="community">DIY电脑圈</el-button>
            </div>
        </div>
        <!-- 搜索栏 -->
        <div class="search-div">
            <div>
                <el-autocomplete style="font-size:15px;width:100%;" :trigger-on-focus="false" :fetch-suggestions="getSuggest" v-model="queryString" @select="queryString" placeholder="请输入内容">
                </el-autocomplete>
                <el-button style="float:left;margin-left:0;" slot="append" icon="el-icon-search" @click="searchArticle"></el-button>
            </div>
        </div>
        <div class="header-right-div">
            <img class="thumb-ph" :src="userInfo.usrText" alt="">
            <el-button class="el-button-home" type="text" @click="mine">我的</el-button>
            <el-button class="el-button-home" type="text" @click="create">创作</el-button>
            <el-button class="el-button-home" type="text" @click="logout">注销</el-button>
        </div>
    </el-header>
    <!-- 插入主体 -->
        <slot></slot>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            urlArt: "http://8.130.16.197:21000/article/",
            urlUsr: "http://8.130.16.197:21000/user/",
            queryString: "",
            page: 1,
            pageSize: 5,
            suggestions: [],
            token:window.sessionStorage.getItem('token'),
            userInfo:"",
        };
    },
    created(){
        this.getUser()
    },
    methods: {
        getUser(){
            this.axios({
                    url: this.urlUsr + 'if-auth',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        'token':window.sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res)
                    this.userInfo = res.data.oneData
                })
                .catch(err => {
                    console.log(err)
                })
        },
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
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
                this.$router.push({
                    path:'/search-info',
                    query:{
                        res:this.queryString
                    }
                })
           window.sessionStorage.setItem("token", this.token);
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
        mine() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/mine");
        },
        create() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/create");
        },
        video() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/video");
        },
        community() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/commity");
        },
        home() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/home");
        }
    },
    
};
</script>

<style>
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
    width: 50%;
    display: flex;
}

.search-div div {
    width: 100%;
    text-align: center;
    margin-left: 5%;
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


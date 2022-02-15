<template >
<el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="box-shadow:0 0 10px #e0e0eb;padding-bottom:10px;">
        <div class="header-first-div"  >
            <div>
                <span class="left-icon">DMicro</span>
            </div>
            <div class="left-but">
                <el-button class="el-button-home" type="text" @click="home">首页</el-button>
                <el-button class="el-button-home" type="text" @click="shop">商城</el-button>
                <el-button class="el-button-home" type="text" @click="community">社区</el-button>
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
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="7%" >
            <!-- 侧边细分菜单 -->
            <div class="nav-rail">....</div>
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
                        <template slot="title">主机</template>
                        <el-menu-item index="1-1">CPU</el-menu-item>
                        <el-menu-item index="1-2">显卡</el-menu-item>
                        <el-menu-item index="1-3">内存</el-menu-item>
                        <el-menu-item index="1-4">硬盘</el-menu-item>
                        <el-menu-item index="1-5">电源</el-menu-item>
                        <el-menu-item index="1-6">散热</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">笔记本</template>
                        <el-menu-item index="2-1">游戏本</el-menu-item>
                        <el-menu-item index="2-2">商务本</el-menu-item>
                        <el-menu-item index="2-3">平板</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">外设</template>
                        <el-menu-item index="3-1">键/鼠</el-menu-item>
                        <el-menu-item index="3-2">显示器</el-menu-item>
                        <el-menu-item index="3-3">耳机</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 右侧主体 -->
        <el-main>
            <div>
                <!-- 第一块广告大横幅区域 -->
                <div style="display: flex; justify-content: center; padding-top: 1%;">
                    <el-image class="main-img" :src="require('../assets/HomeImg/DMICROpic2.png')"></el-image>
                </div>
                <!-- 第二块热点区域 -->
                <div class="title-div"   >
                    <div style="
                width: 25%;
                margin-left: px;
                display: flex;
                justify-content: center;
              ">
                        <el-image class="small-img" :src="require('../assets/HomeImg/DSmallPic.png')"></el-image>
                    </div>
                    <div style="width: 30%; margin-left: 4%">
                        <span style="font-size: 20px; font-weight: bolder">热点资讯</span>
                        <div>
                            <div class="hot-art-div">
                                <a href="" style="color: black">凯世通已经具备了正式量产的技术</a>
                            </div>
                            <div class="hot-art-div">
                                <a href="" style="color: black">Arm 的 CEO 西蒙已经辞职</a>
                            </div>
                        </div>
                    </div>
                    <div style="width: 30%; margin-left: 4%">
                        <span style="font-size: 20px; font-weight: bolder">热点文章</span>
                        <div>
                            <div class="hot-art-div">
                                <a href="" style="color: black">镁光12英寸再生晶圆出货量突破10万片</a>
                            </div>
                            <div class="hot-art-div">
                                <a href="" style="color: black">谷歌发布Android 12L最后一个Beta更新</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 第三块文章部分 (detail)-->
                <div class="title-div" style="display: block">
                    <div style="width: 93%">
                        <el-menu :default-active="activeIndex" class="el-select-low" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="手机">手机通讯</el-menu-item>
                            <el-menu-item index="资讯">电脑资讯</el-menu-item>
                            <el-menu-item index="测评">专人看法</el-menu-item>
                            <el-menu-item index="外设">强力辅助</el-menu-item>
                        </el-menu>
                    </div>
                    <div class="bottom-detail-div" v-for="(item,index) in articleList" :key="index">
                        <a style="margin-left: 5px; margin-top: 5px;color:black;">
                            <span>{{item.artTitle}}</span>
                        </a>
                        <div style="margin-left: 1px; margin-top: 1%; display: flex;">
                            <div class="left-div">
                                <el-image class="small-img" :src="require('../assets/HomeImg/eg_thumb.jpg')"></el-image>
                            </div>
                            <div class="right-div" >
                                <div class="title-bottom-div">
                                    <a href="">
                                        <span>{{item.artSummary}}</span>
                                    </a>
                                </div>
                                <div class="like-div">
                                    <el-button type="text" style="color:gray;" icon="el-icon-caret-top">赞 {{item.artRead}}</el-button>
                                    <el-button icon="el-icon-view" type="text" style="margin-left:20px;color:gray;" disbaled>阅读量 {{item.artRead}}</el-button>
                                    <span style="margin-left:20px;color:gray;">作者 is</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            url: "http://localhost:7070/article/",
            openeds: ["2"],
            uniqueOpened: false,
            activeIndex: "手机",
            queryString: "",
            page: 1,
            pageSize: 5,
            suggestions: [],
            articleList:[]
        };
    },
    
    created(){
        this.getArticleList();
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        handleSelect(key, keyPath) {
            this.activeIndex = key;
            this.getArticleList();
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
        //获取文章列表
        getArticleList:function(){
            console.log(this.activeIndex)
            var searchJson = {
                "artType": this.activeIndex,
                "page": this.page,
                "pageSize": this.pageSize,
            }

            this.axios({
                    url: this.url + 'select',
                    method: 'post',
                    data: searchJson, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json' //如果写成contentType会报错,如果不写这条也报错
                    }
                })
                .then(res => {
                    this.articleList = res.data.data
                    console.log(this.articleList[0].artSummary)
                })
                .catch(err => {
                    console.log(err)
                })

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
        }
    },
    
};
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
    margin-top: 5px;
    width: 25px;
    height:25px;
    border-radius: 10px ;
    border: grey  0.1px;
    margin-right: 20px;
}

.header-right-div {
    display: flex;
}

.el-aside .el-menu {
    border-right: none;
}

.nav-rail {
    background-color: #f7f7f7;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.3em;
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

.main-img {
    width: 90%;
    height: 200px;
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #fff;
}

.bg-purple {
    background: #fff;
}

.bg-purple-light {
    background: #fff;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.small-img {
    width: 80%;
}

.hot-art-div {
    padding-top: 20px;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 10px;
}

a {
    text-decoration: none;
    text-decoration: none;
    padding-left: 10px;
    color: gray;
}

.title-div {
    display: flex;
    padding-top: 3%;
    margin-left: 8%;
    width: 90%;
}

.left-div {
    margin-left: 2%;
    width: 16%;
    float: left;
}

.top-div {
    padding-bottom: 2%;

}

.bottom-detail-div {
    margin-top: 1%;
    background-color: #ffffff;
    height: 10%;
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

}

.title-bottom-div {
    height: 56%;
}

#building{
    background:url("../assets/background.jpg");
    width:100%;
    height:100%;
    position:fixed;
    background-size:100% 100%;
}
</style>

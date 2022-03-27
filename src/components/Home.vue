<template>
<search-header>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="7%">
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
                <div class="title-div">
                    <div style="
                width: 25%;
                margin-left: px;
                display: flex;
                justify-content: center;
              ">
                        <el-image class="small-img" :src="require('../assets/HomeImg/DSmallPic.png')"></el-image>
                    </div>
                    <div style="width: 30%; margin-left: 4%">
                        <span style="font-size: 20px; font-weight: bolder">热点DIY资讯</span>
                        <div v-for="(item,index) in hotArticleList" :key="index">
                            <div class="hot-art-div">
                                <a href="javascript:void(0)" @click="tapToArticle(item)" style="color: black">{{item}}</a>
                            </div>
                        </div>
                    </div>
                    <div style="width: 30%; margin-left: 4%">
                        <span style="font-size: 20px; font-weight: bolder">新发DIY文章</span>
                        <div v-for="(item,index) in newArticleList" :key="index">
                            <div class="hot-art-div">
                                <a href="javascript:void(0)" @click="tapToArticle(item)" style="color: black">{{item}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 第三块文章部分 (detail)-->
                <div class="title-div" style="display: block">
                    <div style="width: 93%">
                        <el-menu :default-active="activeIndex" class="el-select-low" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="手机">DIY电脑资讯</el-menu-item>
                            <el-menu-item index="资讯">DIY配件测评</el-menu-item>
                            <el-menu-item index="测评">DIY方案介绍</el-menu-item>
                            <el-menu-item index="科技">DIY大事件</el-menu-item>
                        </el-menu>
                    </div>
                    <div class="bottom-detail-div" v-for="(item,index) in articleList" :key="index">
                        <a href="javascript:void(0)" @click="tapToArticle(item.artTitle)" style="margin-left: 5px; margin-top: 5px;color:black;">
                            <span>{{item.artTitle}}</span>
                        </a>
                        <div style="margin-left: 1px; margin-top: 1%; display: flex;">
                            <div class="left-div">
                                <el-image class="small-img" :src="item.artUrl"></el-image>
                            </div>
                            <div class="right-div">
                                <div class="title-bottom-div">
                                    <a href="javascript:void(0)" @click="tapToArticle(item.artTitle)">
                                        <span>{{item.artTitle}}</span>
                                    </a>
                                </div>
                                <div class="like-div">
                                    <el-button type="text" style="color:gray;" icon="el-icon-caret-top">赞 {{item.artLike}}</el-button>
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
</search-header>
</template>

<script>
export default {
    data() {
        return {
            urlArt: "http://8.130.16.197:7070/article/",
            openeds: ["2"],
            uniqueOpened: false,
            activeIndex: "手机",
            queryString :"",
            page: 1,
            pageSize: 5,
            articleList: [],
            hotArticleList: [],
            newArticleList: [],
            token: window.sessionStorage.getItem('token')
        };
    },

    created() {
        this.getArticleList();
        this.getNewArticleList();
        this.getHotArticleList();
    },
    methods: {
        handleSelect(key, keyPath) {
            this.activeIndex = key;
            this.getArticleList();
        },
        //获取文章列表
        getArticleList: function () {
            var getArtListJson = {
                "type": this.activeIndex,
                "page": this.page,
                "pageSize": this.pageSize,
            }

            this.axios({
                    url: this.urlArt + 'select-es',
                    method: 'post',
                    data: getArtListJson, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json' //如果写成contentType会报错,如果不写这条也报错
                    }
                })
                .then(res => {
                    this.articleList = res.data.data
                    // console.log(this.articleList)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        //获取最新文章
        getNewArticleList() {
            //调用的后台接口
            let url = this.urlArt + "new-article";
            //从后台获取到对象数组
            this.axios.get(url).then((res) => {
                // console.log(res.data)
                this.newArticleList = res.data.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        //获取Hot Top5
        getHotArticleList() {
            //调用的后台接口
            let url = this.urlArt
            
             + "hot-article";
            //从后台获取到对象数组
            this.axios.get(url).then((res) => {
                // console.log(res.data.data)
                this.hotArticleList = res.data.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        tapToArticle(param) {
            this.$router.push({
                path: '/article-all',
                query: {
                    artTitle: param
                }
            })
            window.sessionStorage.setItem("token", this.token);
        },
    },

};
</script>

<style scoped>
.thumb-ph {
    margin-top: 5px;
    width: 25px;
    height: 25px;
    border-radius: 10px;
    border: grey 0.1px;
    margin-right: 20px;
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

.hot-art-div:hover {
    background-color: #ccc;
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

::v-deep.el-menu-item {
    min-width:3%;
}

</style>

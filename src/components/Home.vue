<template>
<el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
        <div class="header-first-div">
            <div>
                <span class="left-icon">DMicro</span>
            </div>
            <div class="left-but">
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
                <!-- <el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete> -->
            </div>
        </div>
        <div class="header-right-div">
            <!-- <img class="thumb-ph" src="../assets/logo.png" alt=""> -->
            <el-button class="el-button-home" type="text" @click="mine">我的</el-button>
            <el-button class="el-button-home" type="text" @click="create">创作</el-button>
            <el-button class="el-button-home" type="text" @click="logout">注销</el-button>
        </div>
    </el-header>
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
                <div style="display: flex; justify-content: center; padding-top: 1%">
                    <el-image class="main-img" :src="require('../assets/HomeImg/DMICROpic2.png')"></el-image>
                </div>
                <!-- 第二块热点区域 -->
                <div class="title-div" style="display: ">
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
                                <a href="" style="color: black">文章1</a>
                            </div>
                            <div class="hot-art-div">
                                <a href="" style="color: black">文章1</a>
                            </div>
                        </div>
                    </div>
                    <div style="width: 30%; margin-left: 4%">
                        <span style="font-size: 20px; font-weight: bolder">热点文章</span>
                        <div>
                            <div class="hot-art-div">
                                <a href="" style="color: black">文章2</a>
                            </div>
                            <div class="hot-art-div">
                                <a href="" style="color: black">文章2</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 第三块文章部分 (detail)-->
                <div class="title-div" style="display: block">
                    <div style="width: 93%">
                        <el-menu :default-active="activeIndex" class="el-select-low" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1">手机通讯</el-menu-item>
                            <el-menu-item index="2">智能设备</el-menu-item>
                            <el-menu-item index="3">操作系统</el-menu-item>
                            <el-menu-item index="4">数码科技</el-menu-item>
                        </el-menu>
                    </div>
                    <div>
                        <div style="margin-left: 5px; margin-top: 5px">
                            <span>删除遭GITHUB封号,开发者欲夺回开发行权</span>
                        </div>
                        <div style="margin-left: 1px; margin-top: 5px; display: flex">
                            <el-image class="small-img" style="width: 10%" :src="require('../assets/HomeImg/DSmallPic.png')"></el-image>
                            <p>删库一时爽,后悔没商量</p>
                            <span>作者</span>
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
            activeIndex: "1",
            activeIndex2: "1",
            queryString: "",
            page: 1,
            pageSize: 4,
            suggestions: []
        };
    },
    methods: {
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
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
        },
        // 当需要用this指向外部函数的时候,需要用箭头函数或者用别的变量替代只想外部的this,当在then内用this,this指向HTTP request event,已经不是外部默认的vue对象了   
        getSuggest(queryString, callback) {
            // zheliyouwent
            var list = [];
            //调用的后台接口
            let url = this.url + "suggest?suggestKey=" +  queryString;
            //从后台获取到对象数组
            this.axios.get(url).then((res) => {
                //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                console.log(res)
                for (let i = 0;i<res.data.length;i++) {
                    console.log({"value":res.data[i]})
                    list.push({"value":res.data[i]});

                }
                console.log(list)
                callback(list);
            }).catch((error) => {
                console.log(error);
            });
        },

        mine() {

        },
        create() {

        },
        shop() {

        },
        community() {

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
    width: 30%;
    height: 30%;
    border-radius: 50%;
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
}

.title-div {
    display: flex;
    padding-top: 3%;
    margin-left: 8%;
    width: 90%;
}

.el-select-low {}
</style>

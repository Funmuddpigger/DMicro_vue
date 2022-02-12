<template>
<el-container style="">
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
            </div>
        </div>
        <div class="header-right-div">
            <!-- <img class="thumb-ph" src="../assets/logo.png" alt=""> -->
            <el-button class="el-button-home" type="text" @click="mine">我的</el-button>
            <el-button class="el-button-home" type="text" @click="create">创作</el-button>
            <el-button class="el-button-home" type="text" @click="logout">注销</el-button>
        </div>
    </el-header>
    <div style="display:flex;;">
        <div style="display:block;margin-top:2%;">
            <div class="bottom-detail-div">
                <a style="margin-left: 5px; color:black;font-size: 20px;">
                    <span>凯世通已经具备了正式量产的技术</span>
                </a>
                <div style="margin-left: 1%; margin-top: 1%; display: flex;">
                    <div class="right-div">
                        <div class="title-bottom-div">
                            <a href="">
                                <span>凯世通自主研发的低能大束流离子注入机和高能离子注入机就已相继顺利通过客户验证并完成验收</span>
                            </a>
                        </div>
                        <div class="like-div">
                            <el-button type="text" style="color:gray;" icon="el-icon-caret-top">赞 1000</el-button>
                            <el-button icon="el-icon-view" type="text" style="margin-left:20px;color:gray;" disbaled>阅读量 2396</el-button>
                            <el-button icon="el-icon-chat-line-square" type="text" style="margin-left:20px;color:gray;" disbaled>评论 56</el-button>
                            <el-button type="text" icon="el-icon-user" style="margin-left:20px;color:gray;" disabled>作者名字</el-button>
                            <el-button type="text" style="margin-left:20px;color:gray;" disabled>2022-10-30</el-button>

                        </div>
                    </div>
                    <div class="left-div">
                        <el-image class="small-img" :src="require('../assets/HomeImg/eg_thumb.jpg')"></el-image>
                    </div>
                </div>
                <el-divider></el-divider>
            </div>

            <div class="bottom-detail-div">
                <a style="margin-left: 5px;color:black;font-size: 20px;">
                    <span>Arm 的 CEO 西蒙已经辞职</span>
                </a>
                <div style="margin-left: 1%; margin-top: 1%; display: flex;">
                    <div class="right-div">
                        <div class="title-bottom-div">
                            <a href="">
                                <span>ARM高管辞职</span>
                            </a>
                        </div>
                        <div class="like-div">
                            <el-button type="text" style="color:gray;" icon="el-icon-caret-top">赞 1000</el-button>
                            <el-button icon="el-icon-view" type="text" style="margin-left:20px;color:gray;" disbaled>阅读量 2396</el-button>
                            <el-button type="text" icon="el-icon-user" style="margin-left:20px;color:gray;" disabled>作者名字</el-button>
                            <el-button type="text" style="margin-left:20px;color:gray;" disabled>2022-10-30</el-button>
                        </div>
                    </div>
                    <div class="left-div">
                        <el-image class="small-img" :src="require('../assets/HomeImg/eg_thumb.jpg')"></el-image>
                    </div>
                </div>
                <el-divider></el-divider>
            </div>

        </div>
        <div class="bottom-right-hotdiv">
            <div>
                <span style="margin-left:5%;font-size: 20px; font-weight: bolder;color:#862d2d;">热搜论坛榜</span>
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
        </div>
    </div>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            url: "http://localhost:7070/article/",
            queryString: "",
            page: 1,
            pageSize: 10,
            suggestions: []
        };
    },
    methods: {
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

        },
        create() {

        },
        shop() {

        },
        community() {

        }
    },

}
</script>

<style scoped>
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
</style>

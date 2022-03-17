<template>
<el-container>
    <el-header style="box-shadow:0 0 10px #e0e0eb;padding-bottom:10px;">
        <div class="header-first-div">
            <div>
                <span class="left-icon">DMicro</span>
            </div>
            <div class="left-but">
                <el-button class="el-button-home" type="text" @click="home">首页</el-button>
            </div>
        </div>
        <!-- 搜索栏 -->
        <div class="search-div">
            <div style="">
                <span style="font-size:15px;border-bottom:1px solid ;">
                    今日最热文章:
                    <el-button icon="el-icon-magic-stick" style="font-size:10px;color:red;margin-left:10px;" type="text">GTX 1050TI爆炸</el-button></span>
            </div>
            <div style="width:100%;">
                <el-autocomplete style="font-size:13px;" :trigger-on-focus="false" :fetch-suggestions="getSuggest" v-model="queryString" @select="searchArticle" placeholder="搜索话题">
                </el-autocomplete>
                <el-button slot="append" icon="el-icon-search" @click="searchArticle"></el-button>
            </div>
        </div>
        <div class="header-right-div">
            <img class="thumb-ph" :src="usrInfo.usrText" alt="">
            <el-button class="el-button-home" type="text" @click="mine">{{usrInfo.usrNickname}}</el-button>
        </div>
    </el-header>
    <el-main style="display:flex;">
        <div class="main">
            <div class="select">
                <span class="select-span">精选话题:</span>
                <div>
                    <ul v-for="(item,index) in topicList" :key="index">
                        <li v-if="index==0"> <span style="border-bottom:1px solid black;font-size:22px;color:#cc0000;">{{item.topicText}}</span></li>
                        <li v-else-if="index==1"> <span style="border-bottom:1px solid black;font-size:20px;color:#cc3300;">{{item.topicText}}</span></li>
                        <li v-else-if="index==2"> <span style="border-bottom:1px solid black;font-size:17px;color:#cc6600;">{{item.topicText}}</span></li>
                        <li v-else> <span style="border-bottom:1px solid black;font-size:15px;color:black;">{{item.topicText}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="post">
                <div style="width:10%;margin-left:5%;margin-top:3%;">
                    <div>
                        <img class="thumb-ph" style="width: 50px;height:50px;border-radius: 25px;" :src="usrInfo.usrText" alt="">
                    </div>
                    <div>
                        <span>{{usrInfo.usrNickname}}</span>
                    </div>
                </div>
                <div style="folat:left;width:80%;margin-top:1%;">
                    <el-input type="textarea" :rows="5" placeholder="说点什么吧" v-model="textarea">
                    </el-input>
                    <el-divider></el-divider>
                    <div style="margin-bottom:1%;display:flex;">
                        <div style="width:80%;">
                                <el-button slot="prepend" type="info" icon="el-icon-thumb" plain disbaled></el-button>
                                <el-autocomplete style="width:90%;" class="inline-input" v-model="queryTopicSuggest" :fetch-suggestions="getSuggestTop" placeholder="@要吐槽的话题" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
                        </div>
                        <div style="margin-left:10%;">
                            <el-button type="info" icon="el-icon-s-promotion" @click="post">发布</el-button>
                        </div>
                    </div>
                </div>

            </div>
            <div class="show" v-for="(item,index) in topUsrPostList " :key="index">
                <div class="show-div">
                    <div>
                        <img class="thumb-ph" style="width: 50px;height:50px;border-radius: 25px;margin-top:15%;margin-left:20%;border: 1px solid gainsboro;" :src="item.usrInfo.usrText" alt="">
                    </div>
                    <div style="margin:1% 1% 1% 1%;">
                        <div>
                            <span style="font-weight:800;">{{item.usrInfo.usrNickname}}</span>
                            <span style="color:grey;margin-left:10px;">@{{item.topic.topicText}}</span>
                        </div>
                        <div>
                            <span>
                                {{item.topicUsr.topicUsrText}}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="trend">
            <div style="margin:10% 10%;">话题趋势</div>
        </div>
    </el-main>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            loginInfo:'',
            topicList: [],
            textarea: '',
            url: "http://localhost:7070/article/",
            urlTop: "http://localhost:10010/topic/",
            urlUsr: "http://localhost:5050/user/",
            page: 1,
            pageSize: 10,
            suggestions: [],
            token: window.sessionStorage.getItem('token'),
            queryString: "",
            value: "",
            queryTopicSuggest:"",
            topUsrPostList:[],
            usrInfo:"",
        }
    },
    created() {
        this.searchTopicList();
        this.getTopUsrPost();
        this.selectUsr();
    },

    methods: {
        handleSelect(key, keyPath) {
            this.post(key)
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
            this.$router.push({
                path: '/search-info',
                query: {
                    res: this.queryString
                }
            })
            window.sessionStorage.setItem("token", this.token);
        },
        searchTopicList: function () {
            var token = this.token
            this.axios({
                    url: this.urlTop + 'get',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        'token':token
                    }
                })
                .then(res => {
                    console.log(res)
                    this.topUsrPostList = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
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
        getSuggestTop(queryTopicSuggest, callback) {
            var list = [];
            //调用的后台接口
            let url = this.urlTop + "suggest?suggestKey=" + queryTopicSuggest;
            //从后台获取到对象数组
            this.axios.get(url).then((res) => {
                callback(res.data.data);
            }).catch((error) => {
                console.log(error);
            });
        },
        getTopUsrPost(){
            let url = this.urlTop +"/get-top?last=" + 5;
            this.axios.get(url).then((res)=>{
                console.log(res.data);
                this.topicList = res.data.data
            })
        },
        mine() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/mine");
        },
        home() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/home");
        },
        post(key){
            if(key.id !=null && key.id != undefined){
               var topicId =  key.id
            }else{
                console.log(this.queryTopicSuggest)
            }
            let url = this.urlTop + "post";
            var json = {
                "topicId":topicId,
                "topicUsrText":this.textarea,
                "topicText":this.queryTopicSuggest,
            }
            this.axios({
                    url: url,
                    method: 'post',
                    data:json,
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        'token':this.token
                    }
                })
                .then(res => {
                    console.log(res)
                    
                })
                .catch(err => {
                    console.log(err)
                })
        },
        selectUsr(){
           let url = this.urlUsr + "select-by-id";
           this.axios({
                    url: url,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                        'token':this.token
                    }
                })
                .then(res => {
                    this.usrInfo = res.data.oneData
                    console.log(this.usrInfo)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

}
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
    margin-top: 1%;
}

.search-div {
    margin-left: 10%;
    margin-top: 15px;
    width: 60%;
    display: flex;
}

.search-div div {
    width: 100%;
    text-align: center;
}

.left-icon {
    align-items: center;
}

.left-but {
    padding-left: 20%;
}

.header-right-div {
    display: flex;
    margin-top: 1%;
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

.main {
    width: 65%;
    align-items: center;
    margin-left: 5%;
}

.select-span {
    color: darkgray;
    font-size: 30px;
    margin-left: 1.5%;
}

.select {
    border: 1px solid gainsboro;
    border-radius: 20px;
}

.post {
    margin-top: 1%;
    border: 1px solid gainsboro;
    display: flex;
    width: 100%;
    border-radius: 20px;
}

.trend {
    width: 25%;
    border: 1px solid gainsboro;
    margin-left: 1%;
    border-radius: 20px;
    font-weight: 100;
}

.show {
    border: 1px solid gainsboro;
    margin-top: 1%;
    border-radius: 20px;
}

.show-div {
    display: flex;
    width: 98%;
    margin: 1% 1% 1% 1%;
    border: 1px gainsboro solid;
    border-radius: 20px;
}
</style>

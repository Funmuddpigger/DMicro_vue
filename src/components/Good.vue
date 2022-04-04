<template>
<search-header>
    <!-- 上传区 -->
    <div style="margin:1% 0 1% 10%;">
        <el-button type="info" @click="add">新增DIY配件信息</el-button>
    </div>
    <!-- 商品展示区 -->
    <div style="display:flex;margin-right:5%;width:100%;flex-direction: row;flex-wrap: wrap;">
        <div class="card-box" v-for="(item,index) in goodList" :key="index">
                <el-card shadow="never" style="margin-left:1%;width:auto;">
                    <p class="demonstration" style="margin:1% 10% 2% 10%;">{{item.goodName}}</p>
                    <img :src="item.goodImg" class="image">
                    <div style="display:flex;">
                        <div style="display:block;width:70%;color:#666666;">
                            <p>市场价: {{item.goodPrice}}</p>
                            <p>备注: {{item.goodText}}</p>
                        </div>
                        <div>
                            <el-button type="text" class="button" @click="more(item.goodId)">流通信息</el-button>
                        </div>
                    </div>
                </el-card>
        </div>
    </div>
</search-header>
</template>

<script>
export default {
    data() {
        return {
            // src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            token: window.sessionStorage.getItem('token'),
            goodList: [],
            urlGood: this.GLOBAL.urlGood,
        }
    },
    methods: {
        more(params) {
            this.$router.push({
                path: '/info',
                query: {
                    goodId: params
                }
            })
            window.sessionStorage.setItem("token", this.token);
        },
        add() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/add-good");
        },
        getGoodList() {
            //调用的后台接口
            let url = this.urlGood + 'select'
            //从后台获取到对象数组
            this.axios.get(url).then((res) => {
                console.log(res)
                this.goodList = res.data.data
            }).catch((error) => {
                console.log(error);
            });
        },
    },
    created() {
        this.getGoodList();
    },

}
</script>

<style>
.card-box {
    width: 390px;
    margin-left: 3%;
    display: flex;
    margin-top:1%;
    margin-bottom: 1%;
}

.image {
    width: 350px;
    display: block;
    object-fit: cover;
}

.button {
    margin-top: 50%;
}
</style>

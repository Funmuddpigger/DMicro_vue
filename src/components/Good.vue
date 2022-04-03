<template>
<search-header>
    <!-- 上传区 -->
    <div style="margin:1% 0 1% 10%;">
        <el-button type="info" @click="add">新增DIY配件信息</el-button>
    </div>
    <!-- 商品展示区 -->
    <div>
        <div class="card-box">
            <el-card shadow="never" style="margin-left:1%;">
                <p class="demonstration" style="margin-left:30%;margin-bottom:2% ;margin-top:1%;">Inno3d GTX-960</p>
                <img :src="src" class="image">
                <div style="display:flex;">
                    <div style="display:block;width:70%;color:#666666;">
                        <p>市场价: 899</p>
                        <p>备注: 映众显卡冰龙系列</p>
                    </div>
                    <div>
                        <el-button type="text" class="button" @click="more()">流通信息</el-button>
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
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            token: window.sessionStorage.getItem('token'),
        }
    },
    methods: {
        more() {
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/info");
        },
        add(){
            window.sessionStorage.setItem("token", this.token);
            this.$router.push("/add-good");            
        }
    },
    created() {

    },

}
</script>

<style>
.card-box {

    width: 90%;
    margin-left: 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.image {
    width: 350px;
    display: block;
    object-fit: cover;
}
.button{
    margin-top: 50%;
}
</style>

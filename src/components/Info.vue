<template>
<search-header>
    <div style="display:flex;margin-top:2%;">
        <!-- 左边步骤信息条 -->
        <div style="width:50%;">
            <div style="margin:0 0 2% 5%;" class="radio">
                排序：
                <el-radio-group v-model="reverse">
                    <el-radio :label="true">倒序</el-radio>
                    <el-radio :label="false">正序</el-radio>
                </el-radio-group>
            </div>
            <div class="block">
                <el-timeline :reverse="reverse">
                    <el-timeline-item :timestamp="transformTimestamp(item.infoTime)" placement="top" v-for="(item,index) in goodInfo" :key="index">
                        <el-card @click.native="check(item.infoId)" shadow="hover">
                            <h4>{{item.infoMsg}}</h4>
                            <p>发生于 {{transformTimestamp(item.infoTime)}}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <!-- 右边数据比对区 -->
        <div style="width: 35%;margin-left:5%;margin-top:3%;">
            <!-- 信息输入 -->
            <!-- <div>
                <el-input type="text" placeholder="请输入信息" maxlength="255"></el-input>

            </div> -->
            <!-- 信息结果回显 -->
            <div style="margin-top:3%;">
                <h1>信息验证结果:</h1>
                <h3 v-if="isTrue" style="color:green;">该信息经SPV验证通过,已存在区块链中,未被更改</h3>
                <h3 v-else style="color:red;">该信息经SPV验证未通过,未存在区块链中,可能被更改</h3>
            </div>
            <!-- 信息验证路径 -->
            <div style="margin-right:1%;">
                <span>SPV验证路径</span>
                <div v-for="(item,index) in spvpath" :key="index">
                    <p>所属区块: {{item.blockIndex}} ---应属于的hash: {{item.hash}}</p>
                </div>
            </div>
        </div>
    </div>
</search-header>
</template>

<script>
export default {
    data() {    
        return {
            reverse: true,
            goodId: '',
            urlGood: this.GLOBAL.urlGood,
            urlBlockChain: this.GLOBAL.urlBlockChain,
            spvInfo: '',
            checkInfo: '',
            goodInfo: '',
            isTrue: false,
            spvpath: [],
        }
    },
    methods: {
        post() {

        },
        getSPVRoot(params) {
            let url = this.urlBlockChain + "proof?infoId=" + params;
            //从后台获取到对象数组
            this.axios.get(url).then((res) => {
                console.log(res.data)
                this.spvpath = res.data.data

            }).catch((error) => {
                console.log(error);
            });
            console.log("check")
        },
        check(params) {
            let url = this.urlBlockChain + "spvcheck?infoId=" + params;
            //从后台获取到对象数组
            this.axios.get(url).then((res) => {
                console.log(res.data)
                this.isTrue = res.data.oneData
                this.getSPVRoot(params)
            }).catch((error) => {
                console.log(error);
            });
        },
        getInfoWithGoodId() {
            var searchJson = {
                "goodId": this.goodId,
            }
            this.axios({
                    url: this.urlGood + 'search-info',
                    method: 'post',
                    data: searchJson, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json', //如果写成contentType会报错,如果不写这条也报错
                    }
                })
                .then(res => {
                    console.log(res)
                    this.goodInfo = res.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getParams() {
            this.goodId = this.$route.query.goodId;
            this.getInfoWithGoodId();
        },
        //时间转换
        transformTimestamp(timestamp) {
            let a = new Date(timestamp).getTime();
            const date = new Date(a);
            const Y = date.getFullYear() + "-";
            const M =
                (date.getMonth() + 1 < 10 ?
                    "0" + (date.getMonth() + 1) :
                    date.getMonth() + 1) + "-";
            const D =
                (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "  ";
            const h =
                (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
            const m =
                date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            const dateString = Y + M + D + h + m;
            return dateString;
        },

    },
    created() {
        this.getParams();
    }

}
</script>

<style lang="">

</style>

<template>
<el-container>
    <!-- 头部标题区域 -->
    <el-header style="display:flex;margin-top:10px;border-bottom:1px solid grey;">
        <div style="margin-top:6px;font-size:20px;width:6%;">
            <span>文章创作:</span>
        </div>
        <div style="width:75%;">
            <el-input type="text" placeholder="请输入文章标题" v-model="artTitle" maxlength="32" clearable show-word-limit>
            </el-input>
        </div>
        <div style="margin-left:10px;">
            <el-button type="info" @click="save">草稿</el-button>
            <el-button style="margin-left:10px;" @click="post">发布</el-button>
        </div>
        <div>
            <a href="">
                <img class="thumb-ph" src="../assets/logo.png" alt="">
            </a>
        </div>
    </el-header>
    <el-main>
        <!-- 主题编辑区域 -->
        <div>
            <el-input type="textarea" :rows="50" autocomplete="true" minlength="100" show-word-limit maxlength="2000" placeholder="请输入内容" v-model="artText">
            </el-input>
        </div>
        <!-- 类型,梗概区域 -->
        <div style="display:flex;margin-top:20px;width:100%;">
            <!-- 类型区域 -->
            <div style="width:15%;">
                <el-select v-model="artType" placeholder="请选择类型标签">
                    <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
            </div>
            <!-- 简要区域 -->
            <div style="margin-left:20px;width:85%;">
                <el-input type="text" placeholder="请输入简要" v-model="artSummary" maxlength="100" show-word-limit>
                </el-input>
            </div>
        </div>
    </el-main>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            artTitle: '',
            artText: '',
            artType: '',
            artSummary:'',
            usrId:'1',
            url: "http://localhost:7070/article/",
            options: [{
                label: '日常',
                options: [{
                    value: '资讯',
                    label: '资讯'
                }, {
                    value: '测评',
                    label: '测评'
                }]
            }, {
                label: '主机',
                options: [{
                    value: '显卡',
                    label: '显卡'
                }, {
                    value: '中央处理器',
                    label: '中央处理器'
                }, {
                    value: '内存',
                    label: '内存'
                }, {
                    value: '硬盘',
                    label: '硬盘'
                }, {
                    value: '主机',
                    label: '电源'
                }, {
                    value: '主机',
                    label: '散热'
                }]
            }, {
                label: '笔记本',
                options: [{
                    value: '笔记本',
                    label: '游戏本'
                }, {
                    value: '笔记本',
                    label: '商务本'
                }, {
                    value: '平板',
                    label: '平板'
                }]
            }, {
                label: '外设',
                options: [{
                    value: '外设',
                    label: '键鼠'
                }, {
                    value: '外设',
                    label: '显示器'
                }, {
                    value: '外设',
                    label: '耳机'
                }]
            }]
        }
    },
    methods: {
        post() {
            console.log(this.activeIndex)
            var insertJson = {
                "artTitle": this.artTitle,
                "artText": this.artText,
                "artType": this.artType,
                "artSummary": this.artSummary,
                "usrId": this.usrId,
            }
            this.axios({
                    url: this.url + 'insert',
                    method: 'post',
                    data: insertJson, //这里json对象会转换成json格式字符串发送
                    header: {
                        'Content-Type': 'application/json' //如果写成contentType会报错,如果不写这条也报错
                    }
                })
                .then(res => {
                    this.$message('发布成功')
                })
                .catch(err => {
                    console.log(err)
                })
        window.sessionStorage.setItem("token","123456789");
        this.$router.push("/article-all");
        }
        
    },
    save() {

    }

}
</script>

<style scoped>
.thumb-ph {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: #fff solid 1px;
    margin-left: 50px;
}
</style>

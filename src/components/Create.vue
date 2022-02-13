<template>
    <el-container>
        <!-- 头部标题区域 -->
        <el-header style="display:flex;margin-top:10px;border-bottom:1px solid grey;">
            <div style="margin-top:6px;font-size:20px;width:6%;">
                <span>文章创作:</span>
            </div>
            <div style="width:75%;">
                <el-input
                    type="text"
                    placeholder="请输入文章标题"
                    v-model="text"
                    maxlength="16"
                    clearable
                    show-word-limit
                    >
                </el-input>
            </div>
            <div style="margin-left:10px;">
                <el-button  type="info" @click="save">草稿</el-button>
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
                <el-input
                    type="textarea"
                    :rows="50"
                    autocomplete="true"
                    minlength="100"
                    show-word-limit
                    maxlength="2000"
                    placeholder="请输入内容"
                    v-model="textarea">
                </el-input>
            </div>
            <!-- 类型,梗概区域 -->
            <div style="display:flex;margin-top:20px;width:100%;">
                <!-- 类型区域 -->
                <div style="width:15%;">
                    <el-select v-model="value" placeholder="请选择类型标签">
                        <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </div>
                <!-- 简要区域 -->
                <div style="margin-left:20px;width:85%;">
                    <el-input
                    type="text"
                    placeholder="请输入简要"
                    v-model="text"
                    maxlength="50"
                    show-word-limit
                    >
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
            options: [{
          label: '日常',
          options: [{
            value: 'News',
            label: '资讯'
          }, {
            value: 'Test',
            label: '测评'
          }]
        }, {
          label: '主机',
          options: [{
            value: 'Gpu',
            label: '显卡'
          }, {
            value: 'Cpu',
            label: '中央处理器'
          }, {
            value: 'Memory',
            label: '内存'
          }, {
            value: 'HDD',
            label: '硬盘'
          },{
            value: 'Power',
            label: '电源'
          },{
            value: 'Cooling',
            label: '散热'
          }]
        },{
          label: '笔记本',
          options: [{
            value: 'GameBook',
            label: '游戏本'
          }, {
            value: 'BusinessBook',
            label: '商务本'
          }, {
            value: 'Flat',
            label: '平板'
          }]
        },{
          label: '外设',
          options: [{
            value: 'Mouse',
            label: '键/鼠'
          }, {
            value: 'Monitor',
            label: '显示器'
          }, {
            value: 'EarPhone',
            label: '耳机'
          }]
        }],
            text:'',
            textarea: '',
            value: ''
        }
  },
  methods: {
      post(){
        window.sessionStorage.setItem("token","123456789");
        this.$router.push("/article-all");
      },
      save(){

      }
  },
}
</script>

<style scoped>
.thumb-ph {
    width: 40px;
    height:40px;
    border-radius: 10px ;
    border:#fff solid  1px;
    margin-left: 50px;
}
</style>
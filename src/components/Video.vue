<template>
<search-header>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="10%">
            <!-- 侧边细分菜单 -->
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
                        <template slot="title">DIY专区</template>
                        <el-menu-item index="教学">视频教学</el-menu-item>
                        <el-menu-item index="分析">硬件分析</el-menu-item>
                        <el-menu-item index="拆解">新品拆解</el-menu-item>
                        <el-menu-item index="推荐">好物推荐</el-menu-item>
                        <el-menu-item index="配置">配置上新</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">大事件</template>
                        <el-menu-item index="组装">组装大事件</el-menu-item>
                        <el-menu-item index="电脑">电脑大事件</el-menu-item>
                        <el-menu-item index="科技">科技大事件</el-menu-item>
                        <el-menu-item index="资讯">资讯大事件</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 右侧主体 -->
        <el-main>
            <div class="top">
                <el-button>发布视频</el-button>
            </div>
            <div class="flexContainer">
                <div style="margin-top:1%;margin-left:3%;" v-for="(item,index) in 20" :key="index">
                    <vimg v-bind:srcUrl="src"></vimg>
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
            src:"http://8.130.16.197:7070/images/2022-03-27/f0e317b5b5d648efae70e509fd8dde84.png",
            openeds: ["2"],

        }
    }
}
</script>

<style scoped>
.top{
    margin-left: 20%;
    margin-top:1%;
}
.el-aside .el-menu {
    border-right: none;
}

::v-deep.el-menu-item {
    min-width: 3%;
}

.flexContainer {
    margin-top: 1%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}
</style>

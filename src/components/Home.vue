<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="header-first-div">
        <div>
          <span class="left-icon">DMicro</span>
        </div>
        <div class="left-but">
          <el-button class="el-button-home" type="text" @click="mine"
            >商城</el-button
          >
          <el-button class="el-button-home" type="text" @click="create"
            >社区</el-button
          >
        </div>
      </div>
      <!-- 搜索栏 -->
      <div class="search-div">
        <span>search</span>
      </div>

      <div class="header-right-div">
        <!-- <img class="thumb-ph" src="../assets/logo.png" alt=""> -->
        <el-button class="el-button-home" type="text" @click="mine"
          >我的</el-button
        >
        <el-button class="el-button-home" type="text" @click="create"
          >创作</el-button
        >
        <el-button class="el-button-home" type="text" @click="logout"
          >注销</el-button
        >
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="7%">
        <!-- 侧边细分菜单 -->
        <div class="nav-rail">....</div>
        <el-menu
          background-color="#fff"
          text-color="#666"
          :default-openeds="openeds"
        >
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
            <el-image
              class="main-img"
              :src="require('../assets/HomeImg/DMICROpic2.png')"
            ></el-image>
          </div>
          <!-- 第二块热点区域 -->
          <div class="title-div">
            <div
              style="
                width: 25%;
                margin-left: px;
                display: flex;
                justify-content: center;
              "
            >
              <el-image
                class="small-img"
                :src="require('../assets/HomeImg/DSmallPic.png')"
              ></el-image>
            </div>
            <div style="width: 30%; margin-left: 4%">
              <span style="font-size: 20px; font-weight: bolder">热点资讯</span>
              <div>
                <div class="hot-art-div">
                  <a href="" >文章1</a>
                </div>
                <div class="hot-art-div">
                  <a href=""  >文章1</a>
                </div>
              </div>
            </div>
            <div style="width: 30%; margin-left: 4%">
              <span style="font-size: 20px; font-weight: bolder">热点文章</span>
              <div>
                <div class="hot-art-div">
                  <a href="" >文章2</a>
                </div>
                <div class="hot-art-div">
                  <a href=""  >文章2</a>
                </div>
              </div>
            </div>
          </div>
          <!-- 第三块文章部分 (detail)-->
          <div class="title-div">
            <div>
              aaa
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
      openeds: ["2"],
      uniqueOpened: false,
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
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
  align-items: center;
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

.hot-art-div{
  padding-top: 20px;border-bottom: 1px solid #dbdbdb;padding-bottom: 10px;
}

a{
  text-decoration: none; text-decoration: none;padding-left: 10px;
}

.title-div{
  display: flex; padding-top: 3%; margin-left: 8%;
}
</style>
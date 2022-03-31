<template>
        <div class="block" style="" @click="tapToPlay(videoUrl)">
            <img class="img" :src="srcUrl" />
            <div>
              <span class="demonstration">{{text}}</span>
              <span class="demonstration">{{date}}</span>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
          token:window.sessionStorage.getItem('token'),
        }
    },
    props:{
      srcUrl:{
        type:String, //数据类型有 String、Number、Boolean、Array ...
        default: "http://8.130.16.197:7070/images/2022-03-31/e7f7c88f53b940ee90cc21d31418dee3.png"// 默认值
    },
      text:{
        type:String, //数据类型有 String、Number、Boolean、Array ...
        default: "暂时没有标题噢"// 默认值
    },
      date:{
        type:String, //数据类型有 String、Number、Boolean、Array ...
        default: "2022-10-15"// 默认值
    },
      videoUrl:{
        type: String, //数据类型有 String、Number、Boolean、Array ...
        default: ""// 默认值
    },    

    },
    methods:{
      tapToPlay(param){
          this.$router.push({
               path:'/play',
               query:{
                   videoUrl:param
               }
           })
           window.sessionStorage.setItem("token", this.token);
      },
    }
}
</script>

<style>
.block{
  margin-left:2%;
  display:flex;
  flex-direction:column;
}
.img {
    width: 280px;
    height: 160px;
    object-fit: scale-down;
    background: black;
    border-radius: 20px;
    transition: all 0.5s;
    
}

.img:hover {
    position: relative;
    transform: translate(-10px,-10px);
    box-shadow: 0px 15px 30px rgb(136, 135, 135);
    transition: all 0.5s;
}

.demonstration{
  margin-top: 2%;
  margin-left: 10%;
  color: grey;
}
</style>

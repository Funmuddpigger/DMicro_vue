<template>
        <div class="block" style="" @click="tapToPlay()">
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
            // 默认图片url
            srcUrl: "",
            text:"暂时没有标题噢",
            date:"2022-10-15",
            videoInfo:"",
        }
    },
    props:{
      srcUrl:{
        type:String, //数据类型有 String、Number、Boolean、Array ...
        default: "http://8.130.16.197:7070/images/2022-03-27/042c43c634ce45dcb2bace0284702958.png"// 默认值
    }

    },
    methods:{
      tapToPlay(){

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

<template>
    <search-header>
        <el-main style="margin-left:5%">
            <video autoplay controls width="90%" height="90%" :src="videoUrl"></video>
        </el-main>
    </search-header>
</template>


<script>
export default {
    data(){
        return{
            videoUrl:'',
        }
    },
    methods:{
        getParams(){
            this.videoUrl = this.$route.query.videoUrl;
        },
    },
     created(){
        this.getParams();
    },
}
</script>

<style>

</style>
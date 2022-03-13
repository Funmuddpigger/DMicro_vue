
export default{
      handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            return res;
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        }   
}

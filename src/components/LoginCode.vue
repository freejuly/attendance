<template>
  <div>
    <!-- <el-input v-model="code"></el-input>
    <el-button @click="c">进入</el-button> -->
  </div>
</template>

<script>
const url = "http://api.careline.ltd:8083/"
 //const url = "http://172.18.56.24:8089"
// qx = 根据员工的工号判断有没有进入的权限
export default {
    data(){
      return{
        code:""
      }
    },
    created(){
      this.code =  window.localStorage.getItem("systemWorkCode_zmy")//本地存储取工号
      // this.code = this.$route.params.code;//params接参
      // this.code = this.$route.query.code//query接参
      // this.qx = 1
      // if(this.qx!=1){
      //   alert("你没有权限")
      //   return
      // }
      this.jiekou()
    },
    methods:{
      jiekou(){ 
        if(this.code == ""){ 
          this.$router.push({ path: "/ResError",});
          return
        }
        this.axios.get(url+"api/v1/attendance/daily/auth-check?requester="+this.code).then(res=>{
          console.log(res.data.data.auth);
          if (res.data.data.auth==true) {
            this.$router.push({
              path: "/HomePage", 
              query:{
                info:this.$Base64.encode(JSON.stringify({
                  code:this.code
                }))
              }
            });
          }else{ 
            this.$router.push({ path: "/ResError",});
          }
          // console.log(this.qx); 
        })
      }, 
    }

}
</script>

<style>

</style>
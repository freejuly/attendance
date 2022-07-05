<template> 
  <div id="app" :class="{dark: darkTheme }">
    <router-view />
    <!-- <div class="about">
      <a class="bg_links social portfolio" href="#">
          <span class="icon">1</span>
      </a>
      <a class="bg_links social dribbble" href="#">
          <span class="icon">2</span>
      </a>
      <a class="bg_links social linkedin" href="#">
          <span class="icon">3</span>
      </a>
      <a class="bg_links logo"></a>
    </div> -->
  <!-- <el-switch  class="mop"
		v-model="toggleTheme"
		active-color="#3B73F0"
		inactive-color="#DDDFE4"
		active-text="暗黑模式"
		inactive-text="白天模式"
		@change="change">
	</el-switch>  -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  mounted(){
    this.$rubik.init()
  },
  data() {
    return {
		// 存放控制模式切换的Boolean值
		toggleTheme: false,
      isShowDarkTheme: "",
    };
  },
  methods:{
	// 将获取到的存放模式切换的值存储到vuex里面
	change() {
	this.$store.dispatch("chengeThemeActions", this.toggleTheme);
	},
  },
  computed: {
    ...mapState(["darkTheme"]),
  },
};
</script> 
<style   scoped>
#app{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; 
}
.dark {
  transition: all 0.5s ease;
  background-color: #000;
  color: #fff;
}
.light {
  transition: all 0.5s ease;
  background-color: #fff;
  color: #000;
}
/* .mop{ 
  float:right;
  
} */
.about {
  position: fixed;
  z-index: 10;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  transition: all 0.2s ease;
}
.about .bg_links {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 100%;
  backdrop-filter: blur(5px);
  position: absolute;
}
.about .logo {
  width: 40px;
  height: 40px;
  z-index: 9;
  background-image: url(./assets/logo_white.svg);
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 10px 7px;
  opacity: 0.9;
  transition: all 1s 0.2s ease;
  bottom: 0;
  right: 0;
}
.about .social {
  opacity: 0;
  right: 0;
  bottom: 0;
}
.about .social .icon {
  width: 100%;
  height: 100%;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  display: flex;
  transition: all 0.2s ease, background-color 0.4s ease;
  opacity: 0;
  border-radius: 100%;
}
.about .social.portfolio {
  transition: all 0.8s ease;
}
.about .social.portfolio .icon {
  background-image: url(./assets/link.svg);   
}
.about .social.dribbble {
  transition: all 0.3s ease;
}
.about .social.dribbble .icon {
  background-image: url(./assets/dribbble.svg);
}
.about .social.linkedin {
  transition: all 0.8s ease;
}
.about .social.linkedin .icon {
  background-image: url(./assets/linkedin.svg);
}
.about:hover {
  width: 105px;
  height: 105px;
  transition: all 0.6s cubic-bezier(0.64, 0.01, 0.07, 1.65);
}
.about:hover .logo {
  opacity: 1;
  transition: all 0.6s ease;
}
.about:hover .social {
  opacity: 1;
}
.about:hover .social .icon {
  opacity: 0.9;
}
.about:hover .social:hover {
  background-size: 28px;
}
.about:hover .social:hover .icon {
  background-size: 65%;
  opacity: 1;
}
.about:hover .social.portfolio {
  right: 0;
  bottom: calc(100% - 40px);
  transition: all 0.3s 0s cubic-bezier(0.64, 0.01, 0.07, 1.65);
}
.about:hover .social.portfolio .icon:hover {
  background-color: #698fb7;
}
.about:hover .social.dribbble {
  bottom: 45%;
  right: 45%;
  transition: all 0.3s 0.15s cubic-bezier(0.64, 0.01, 0.07, 1.65);
}
.about:hover .social.dribbble .icon:hover {
  background-color: #ea4c89;
}
.about:hover .social.linkedin {
  bottom: 0;
  right: calc(100% - 40px);
  transition: all 0.3s 0.25s cubic-bezier(0.64, 0.01, 0.07, 1.65);
}
.about:hover .social.linkedin .icon:hover {
  background-color: #0077b5;
}

</style>


<template>
  <div class="cover-page" :style="backgroundStyle">
    <div class="drawer" @click="toggleDrawer">
      <h1 class="drawer-title">欢迎来到 RouteMate 出行服务平台</h1>
      <div v-if="drawerOpen" class="drawer-content">
        <p>智能出行，青春同行，让您的每次出行更加轻松、便捷。</p>
        <ul>
          <li><strong>智能拼车推荐：</strong>基于轨迹分析，精准匹配拼车伙伴，减少空驶和等待时间。</li>
          <li><strong>个性化 POI 推荐：</strong>基于历史热点，发现更多有趣的地点，让探索更有意义。</li>
        </ul>
      </div>
    </div>
    <button @click="jumpToLogin" class="enter-button">进入体验</button>
    <div class="footer-links">
      <a href="https://github.com/reqwaaaaa/Maybe-its-life/blob/main/%E7%83%AD%E7%82%B9%E8%BD%A8%E8%BF%B9%E6%8C%96%E6%8E%98.md" target="_blank" class="link">挖掘算法说明</a>
      <a href="https://github.com/reqwaaaaa/RM_Vue" target="_blank" class="link">前端源码</a>
      <a href="https://github.com/reqwaaaaa/RouteMate" target="_blank" class="link">后端源码</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoverPage',
  data() {
    return {
      backgroundStyle: {
        backgroundImage: "url(src/static/img/background_img/Cover_Page.jpg)", // 替换为您的背景图路径
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'relative',
      },
      drawerOpen: false,
    };
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    jumpToLogin() {
      this.$router.push({ path: '/0' });
    },
  },
};
</script>

<style scoped>
.cover-page {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.drawer {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(173, 216, 230, 0.8);
  color: #006666;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.drawer-title {
  margin: 0;
}
.drawer-content {
  margin-top: 10px;
}
.enter-button {
  padding: 15px 30px;
  font-size: 1.2em;
  color: #003366;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: linear-gradient(45deg, #EC6C6C, #FFD479, #FFFC79, #73FA79);
  transition: transform 0.3s ease, background-color 0.3s ease;
  margin-bottom: 30px;
}
.enter-button:hover {
  transform: scale(1.1);
}
.footer-links {
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
}
.link {
  color: #007BFF;
  text-decoration: none;
  font-size: 1em;
  transition: color 0.3s ease;
}
.link:hover {
  color: #000000;
}
</style>

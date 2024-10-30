<template>
  <div class="background">
    <div class="login">
      <div class="Title"><span>身份认证</span></div>
      <div class="enter">
        <el-input v-model="email" class="input" placeholder="请输入邮箱" @input="msg=false"/>
      </div>
      <div class="enter">
        <el-input v-model="password" class="input" placeholder="请输入密码" show-password @input="msg=false"/>
      </div>
      <span v-if="msg" class="error-message">邮箱或密码错误</span>
      <el-button type="primary" @click="getManager" class="login-button">登录</el-button>
      <p style="font-size: 1vw; color: aqua; margin-left: 26vw; cursor: pointer;" @click="jumpToRegister()">没有注册？|点击注册</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useRouter } from 'vue-router';
import { sha256 } from "js-sha256";

const msg = ref(false);
const password = ref("");
const email = ref("");
const router = useRouter();

const $http = inject("$axios");

function jump() {
  router.push({ path: '/1' });
}

function jumpToRegister() {
  router.push({ path: '/1' });
}

function getManager() {
  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();
 // const encryptedPassword = sha256(password.value);
  $http.post("http://127.0.0.1:5000/auth/login", {

    email: trimmedEmail,
    password: trimmedPassword

  }).then(res => {
    if (res.data) {
      jump();
    } else {
      msg.value = true;
    }
  }).catch(error => {
    msg.value = true;
  });
}
</script>

<style scoped>

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border-radius: 10px;
  width: 40vw;
  height: 30vw;
}

.enter {
  width: 35vw;
  margin-left: 5vw;
  margin-top: 1vw;
}

.Title {
  font-family: 爱奇艺黑体;
  text-align: center;
  margin: 2vw auto; /* 调整标题上下间距 */
  font-size: 3vw;
}

.background {
  background-image: url('src/static/img/background_img/login_back.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
}

.input {
  height: 3vw;
  font-size: 1vw;
  width: 30vw; /* 使用视窗宽度的 90% */
  max-width: 35vw; /* 设置最大宽度为 25rem */
  border: aquamarine solid 0.1vw;
}

.error-message {
  font-size: 2vh;
  color: red;
  font-family: 爱奇艺黑体;
  text-align: center;
  display: block; /* 将错误信息显示为块级元素 */
  margin-top: 2vh; /* 调整上边距 */
}

.login-button {
  width: 8vw; /* 使用视窗宽度的 90% */
  height: 3vw;
  font-size: 1.5vw;
  max-width: 25vw; /* 设置最大宽度为 25rem */
  margin-top: 2vw; /* 调整上边距 */
  margin-left: 27vw;
}
</style>
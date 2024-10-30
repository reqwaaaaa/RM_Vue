<template>
  <div class="background">
    <el-button type="primary" round style="height: 2vw;width: 6vw" @click="jump()">拼车</el-button>
    <div class="login">
      <BorderBox8 :reverse="true">BorderBox8</BorderBox8>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
import {BorderBox8} from "@dataview/datav-vue3";

function jump() {
  router.push({ path: '/pinche' });
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



.background {
  background-image: url('src/static/img/background_img/POI_back.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
}

</style>
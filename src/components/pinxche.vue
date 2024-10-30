<template>
  <div class="background">
    <el-button type="primary" round style="height: 2vw;width: 6vw" @click="jump()">POI</el-button>
    <div class="login">
      <BorderBox8 :reverse="true">

      </BorderBox8>
    </div>
  </div>
</template>

<script setup lang="ts">

import {BorderBox8} from "@dataview/datav-vue3";
import {useRouter} from "vue-router";

const router = useRouter();

function jump() {
  router.push({path: '/poi'});
}

</script>

<style scoped>

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  width: 40vw;
  height: 30vw;
  background-color: transparent;
}


.background {
  background-image: url('src/static/img/background_img/pinche_back.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
}


</style>
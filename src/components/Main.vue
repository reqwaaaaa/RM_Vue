<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      style="height: 5vw;font-size: 2vw"
  >
    <el-menu-item index="0">

        <p style="font-size: 2.5vw;color: #2967aa;margin-left: 3vw" @click="jump3()">RouteMate</p>


    </el-menu-item>
    <el-menu-item index="1" style="font-size: 1.5vw" @click="drawer = true">我的</el-menu-item>
    <el-sub-menu index="2" style="margin-right: 1vw;margin-left: 1vw">
      <template #title>
        <p style="font-size: 1.5vw">
          推荐
        </p>
      </template>
      <el-menu-item index="2-1" style="font-size: 1vw;" @click="jump1()">拼车推荐</el-menu-item>
      <el-menu-item index="2-2" style="font-size: 1vw;margin-top: 0.5vw;" @click="jump2()">POI推荐</el-menu-item>
    </el-sub-menu>
  </el-menu>

  <div>
    <map1></map1>
  </div>

  <!--  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
  <!--抽屉-->
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <div aria-label="A complete example of page header">
      <el-page-header >
        <template #content>
          <div class="flex items-center">
            <div style="display: flex;">
              <BorderBox10 :reverse="true" style="height: 5vw;">
                <img src="../static/img/head/user.jpg" style="width: 4.5vw" alt="图片加载失败">
              </BorderBox10>


              <el-tag style="margin-left: 3vw;font-size: 1vw;margin-top: 3.5vw">普通用户</el-tag>
            </div>

          </div>
        </template>

        <el-table :data="tableData" height="250" style="width: 100%">
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="data" label="Date" width="360" />
        </el-table>

        <p class="mt-4 text-sm">
          Element Plus team uses <b>weekly</b> release strategy under normal
          circumstance, but critical bug fixes would require hotfix so the actual
          release number <b>could be</b> more than 1 per week.
        </p>
      </el-page-header>
    </div>
  </el-drawer>

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";
import {BorderBox1, BorderBox10, BorderBox8, BorderBox9} from "@dataview/datav-vue3";
import Map1 from "@/components/map1.vue";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


// ---------------------------------------------------------------------------------------------------------
// 抽屉
const drawer = ref(false)

// ------------------------------------------------------------------------------------------------------
//个人信息
const tableData = [
  {
    data: 'Tom',
    name: '用户名',
  },
  {
    data: '18300020011',
    name: '电话号码',
  },
  {
    data: '男',
    name: '性别',
  },
  {
    data: '2016-05-01',
    name: '日期',
  },
  {
    data: '2016660508',
    name: 'email',
  },
]

// ---------------------------------------------------------------------------------------------------
const router = useRouter();
function jump1() {
  router.push({ path: '/pinche' });
}
function jump2() {
  router.push({ path: '/poi' });
}
function jump3() {
  router.push({ path: '/todaymenu' });
}
</script>


<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
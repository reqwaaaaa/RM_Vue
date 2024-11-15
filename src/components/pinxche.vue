<template>
  <div class="background">
    <el-button type="primary" round style="height: 2vw;width: 6vw" @click="jump()">POI</el-button>
    <div class="login">
      <BorderBox8 :reverse="true" class="border-box" style="background-color: white">
        <div class="content">
          <!-- 表格部分 -->
          <el-table :data="tableData">
            <el-table-column prop="email" label="email" width="180" />
            <el-table-column prop="phone" label="phone" width="180" />
            <el-table-column prop="similarity" label="similarity" />
          </el-table>

          <!-- 相似度列表部分 -->
          <div class="similarity-list">
            <p>各用户的相似度:</p>
            <div v-for="user in userInfo" :key="user.email">
              <p>{{ user }}</p>
            </div>
          </div>
        </div>
      </BorderBox8>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BorderBox8 } from "@dataview/datav-vue3";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const router = useRouter();

function jump() {
  router.push({ path: '/poi' });
}

const tableData = ref([]);
const userInfo = ref([]);
async function getTableData() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:5000/recommendations/carpool", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`      },
      body: JSON.stringify({
        min_support: 6,
        min_length: 3,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    tableData.value = data.similar_users; // 假设后端返回的数据中包含 `similar_users` 数组
    userInfo.value = data.debug_info;
  } catch (error) {
    console.error("Error fetching table data:", error);
  }
}

onMounted(() => {
  getTableData();
});
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
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

</style>
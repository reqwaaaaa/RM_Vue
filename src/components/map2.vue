<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;

async function fetchData() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:5000/recommendations/poi", {
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
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const data = await response.json();
    console.log(data);

    // 将所有的点转换为经纬度数组格式
    const points = data.filtered_hotspots.flat().map(point => [point.longitude, point.latitude]);

    return points;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

onMounted(async () => {
  window._AMapSecurityConfig = {
    securityJsCode: "855d6879b402df55426c9ae200e89e32",
  };

  // 从接口获取点数据
  const points = await fetchData();

  // 使用第一个点作为地图中心点
  const centerPoint = points.length > 0 ? points[0] : [116.397428, 39.90923]; // 默认中心点

  // 初始化地图
  AMapLoader.load({
    key: "529afce498b7ba487683bbac2cebaeb7", // 替换为你的 API Key
    version: "2.0",
    plugins: ["AMap.Scale"], // 使用插件
  })
      .then((AMap) => {
        map = new AMap.Map("container", {
          zoom: 10,
          center: centerPoint, // 使用第一个点作为中心点
          mapStyle: "amap://styles/whitesmoke",
        });

        // 为每个点创建一个标记
        points.forEach((point) => {
          const marker = new AMap.Marker({
            position: new AMap.LngLat(point[0], point[1]), // 设置标记位置
            map: map, // 指定地图
          });
          map.add(marker); // 将标记添加到地图
        });
      })
      .catch((e) => {
        console.error(e);
      });
});

onUnmounted(() => {
  if (map) {
    map.destroy();
  }
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>

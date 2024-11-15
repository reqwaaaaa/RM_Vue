<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;

async function fetchData() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:5000/track/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // 替换为实际的 JWT
      },
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
    // 对接口返回的数据进行再处理
    const processedHotspots = data.hotspots.map((segment) => {
      // 去除重复点
      const uniquePoints = segment.filter(
          (point, index, self) =>
              index === self.findIndex((p) => p.latitude === point.latitude && p.longitude === point.longitude)
      );

      // 自定义逻辑：如果点数少于2，忽略该段
      if (uniquePoints.length < 2) {
        return null; // 不保留此段
      }

      // 转换为 [longitude, latitude] 的格式
      return uniquePoints.map((point) => [point.longitude, point.latitude]);
    });

    // 过滤掉无效的轨迹段
    return processedHotspots.filter((segment) => segment !== null);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

onMounted(async () => {
  window._AMapSecurityConfig = {
    securityJsCode: "855d6879b402df55426c9ae200e89e32",
  };

  // 从接口获取路径数据
  const paths = await fetchData();

  // 使用第一个轨迹点作为地图中心点
  const centerPoint = paths.length > 0 && paths[0].length > 0 ? paths[0][0] : [116.397428, 39.90923]; // 默认中心点

  // 初始化地图
  AMapLoader.load({
    key: "529afce498b7ba487683bbac2cebaeb7", // 替换为你的 API Key
    version: "2.0",
    plugins: ["AMap.Scale"], // 使用插件
  })
      .then((AMap) => {
        map = new AMap.Map("container", {
          zoom: 10,
          center: centerPoint, // 使用第一个轨迹点作为中心点
          mapStyle: "amap://styles/whitesmoke",
        });

        // 绘制每条折线
        paths.forEach((path) => {
          const polyline = new AMap.Polyline({
            path: path.map(([lng, lat]) => new AMap.LngLat(lng, lat)), // 转换为 LngLat 格式
            strokeWeight: 3, // 线条宽度
            strokeColor: "blue", // 线条颜色
            lineJoin: "round", // 折线拐点连接处样式
          });
          map.add(polyline); // 将折线添加到地图
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
  height: 800px;
}
</style>

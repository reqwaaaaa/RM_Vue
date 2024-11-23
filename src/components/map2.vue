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
        "Authorization": `Bearer ${token}`
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
    plugins: ["AMap.Scale", "AMap.Geocoder", "AMap.PlaceSearch"], // 使用插件
  })
      .then((AMap) => {
        map = new AMap.Map("container", {
          zoom: 10,
          center: centerPoint, // 使用第一个点作为中心点
          mapStyle: "amap://styles/whitesmoke",
        });

        // 初始化地理编码器
        const geocoder = new AMap.Geocoder({
          city: "010", // 可选，城市设定，默认全国
        });

        // 初始化 PlaceSearch 服务，用于搜索附近的商店和饭店
        const placeSearch = new AMap.PlaceSearch({
          type: '餐饮服务|购物服务|生活服务', // 指定查询的POI类型
          pageSize: 5, // 每次最多返回5条结果
          pageIndex: 1, // 从第一页开始查询
          city: '010', // 可选，城市设定
        });

        // 为每个点创建一个标记
        points.forEach((point) => {
          const marker = new AMap.Marker({
            position: new AMap.LngLat(point[0], point[1]), // 设置标记位置
            map: map, // 指定地图
          });
          map.add(marker); // 将标记添加到地图

          // 为标记添加点击事件
          marker.on("click", () => {
            geocoder.getAddress([point[0], point[1]], (status, result) => {
              if (status === "complete" && result.regeocode) {
                const address = result.regeocode.formattedAddress;

                // 使用 PlaceSearch 查找附近的商店和饭店
                placeSearch.searchNearBy('', marker.getPosition(), 500, (status, result) => {
                  if (status === "complete" && result.info === "OK") {
                    const pois = result.poiList.pois;
                    let poiInfo = pois.map(poi => `<div>${poi.name} - ${poi.address}</div>`).join('');
                    poiInfo = poiInfo || "暂无附近商店或饭店信息";

                    // 弹出信息框展示地址和附近商店信息
                    const infoWindow = new AMap.InfoWindow({
                      content: `<div>地址：${address}</div><div>附近商店和饭店：</div>${poiInfo}`,
                      offset: new AMap.Pixel(0, -30),
                    });
                    infoWindow.open(map, marker.getPosition());
                  } else {
                    console.error("获取附近商店或饭店信息失败");
                  }
                });
              } else {
                console.error("获取地址信息失败");
              }
            });
          });
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

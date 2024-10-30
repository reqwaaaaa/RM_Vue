<template>
  <div id="wrapper" >
    <h1>
      今天吃什么？
      <br />
      <br />
      <b style="color: #ff9733">{{ foodItem }}</b>
    </h1>
    <input type="button" :value="run ? '不行，换一个' : '开始'" @click="toggleRun" id="start" />
    <input type="button" value="开始" id="stop" v-show="showStop" @click="stopAction" />
    <textarea v-model="foodList" rows="9" cols="53" style="display: none"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 初始化状态变量
const run = ref(false);
const foodItem = ref('');
const showStop = ref(false);
const clickCount = ref(0);  // 点击计数器
const maxClicks = 5;  // 最大点击次数
const timer = ref<number | null>(null);

// 食物列表
const foodList = ref(`馄饨 拉面 烩面 热干面 刀削面 油泼面 炸酱面 炒面 重庆小面 米线 酸辣粉 土豆粉 螺狮粉 烤肉 酱香饼 凉皮儿 麻辣烫 肉夹馍 羊肉汤 炒饭 盖浇饭 卤肉饭 烤肉饭 黄焖鸡米饭 驴肉火烧 川菜 麻辣香锅 火锅 酸菜鱼 烤串 披萨 烤鸭 汉堡 炸鸡 寿司 蟹黄包 煎饼果子 生煎 炒年糕 拔丝土豆 白灼菜心 包菜炒鸡蛋粉丝 菠菜炒鸡蛋 炒滑蛋 炒茄子 炒青菜 葱煎豆腐 脆皮豆腐 地三鲜 干锅花菜 蚝油三鲜菇 蚝油生菜 荷兰豆炒腊肠 红烧冬瓜 红烧茄子 虎皮青椒 话梅煮毛豆 鸡蛋羹 微波炉鸡蛋羹 鸡蛋火腿炒黄瓜 茄子炖土豆 茭白炒肉 椒盐玉米 金针菇日本豆腐煲 烤茄子 榄菜肉末四季豆 雷椒皮蛋 凉拌黄瓜 凉拌木耳 凉拌莴笋 凉拌油麦菜 麻婆豆腐 蒲烧茄子 芹菜拌茶树菇 陕北熬豆角 上汤娃娃菜 手撕包菜 水油焖蔬菜 素炒豆角 酸辣土豆丝 糖拌西红柿 莴笋叶煎饼 西红柿炒鸡蛋 西红柿豆腐汤羹 西葫芦炒鸡蛋 小炒藕丁 洋葱炒鸡蛋 白菜猪肉炖粉条 带把肘子 冬瓜酿肉 番茄红酱 干煸仔鸡 宫保鸡丁 咕噜肉 黑椒牛柳 简易红烧肉 南派红烧肉 红烧猪蹄 湖南家常红烧肉 黄瓜炒肉 黄焖鸡 徽派红烧肉 回锅肉 尖椒炒牛肉 姜炒鸡 姜葱捞鸡 酱牛肉 酱排骨 咖喱肥牛 烤鸡翅 可乐鸡翅 口水鸡 辣椒炒肉 老式锅包肉 冷吃兔 荔枝肉 凉拌鸡丝 萝卜炖羊排 麻辣香锅 麻婆豆腐 梅菜扣肉 啤酒鸭 青椒土豆炒肉 肉饼炖蛋 杀猪菜 山西过油肉 商芝肉 瘦肉土豆片 水煮牛肉 水煮肉片 蒜苔炒肉末 台式卤肉饭 糖醋里脊 糖醋排骨 土豆炖排骨 无骨鸡爪 西红柿牛腩 西红柿土豆炖牛肉 乡村啤酒鸭 香干芹菜炒肉 香干肉丝 香菇滑鸡 香煎五花肉 小炒黄牛肉 小炒鸡肝 小炒肉 新疆大盘鸡 血浆鸭 羊排焖面 洋葱炒猪肉 意式烤鸡 鱼香茄子 鱼香肉丝 猪皮冻 猪肉烩酸菜 柱候牛腩 孜然牛肉 醉排骨 白灼虾 鳊鱼炖豆腐 蛏抱蛋 葱烧海参 葱油桂鱼 干煎阿根廷红虾 红烧鲤鱼 红烧鱼 红烧鱼头 黄油煎虾 烤鱼 咖喱炒蟹 鲤鱼炖白菜 清蒸鲈鱼 清蒸生蚝 水煮鱼 蒜蓉虾 糖醋鲤鱼 微波葱姜黑鳕鱼 香煎翘嘴鱼 小龙虾 油焖大虾 茶叶蛋 蛋煎糍粑 桂圆红枣粥 鸡蛋三明治 煎饺 金枪鱼酱三明治 空气炸锅面包片 美式炒蛋 牛奶燕麦 水煮玉米 苏格兰蛋 太阳蛋 溏心蛋 吐司果酱 微波炉蛋糕 燕麦鸡蛋饼 蒸花卷 蒸水蛋 炒方便面 炒河粉 炒凉粉 炒馍 炒年糕 炒意大利面 蛋炒饭 豆角焖面 韩式拌饭 河南蒸面条 火腿饭团 基础牛奶面包 茄子肉煎饼 鲣鱼海苔玉米饭 酱拌荞麦面 空气炸锅照烧鸡饭 醪糟小汤圆 老干妈拌面 老友猪肉粉 烙饼 凉粉 麻辣减脂荞麦面 麻油拌面 电饭煲蒸米饭 煮锅蒸米饭 披萨饼皮 热干面 日式咖喱饭 芝麻烧饼 手工水饺 酸辣蕨根粉 汤面 微波炉腊肠煲仔饭 西红柿鸡蛋挂面 扬州炒饭 炸酱面 蒸卤面 中式馅饼 煮泡面加蛋 半成品加工 半成品意面 空气炸锅鸡翅中 空气炸锅羊排 懒人蛋挞 凉皮 牛油火锅底料 速冻馄饨 速冻水饺 速冻汤圆 炸薯条 昂刺鱼豆腐汤 番茄牛肉蛋花汤 勾芡香菇汤 金针菇汤 菌菇炖乳鸽 罗宋汤 米粥 皮蛋瘦肉粥 生汆丸子汤 西红柿鸡蛋汤 小米粥 银耳莲子粥 玉米排骨汤 紫菜蛋花汤 饮料 耙耙柑茶 百香果橙子特调 冰粉 金菲士 金汤力 可乐桶 奶茶 奇异果菠菜特调 酸梅汤 泰国手标红茶 杨枝甘露 长岛冰茶 B52轰炸机 Mojito莫吉托 奥利奥冰淇淋 草莓冰淇淋 反沙芋头 咖啡椰奶冻 烤蛋挞 魔芋蛋糕 戚风蛋糕 提拉米苏 雪花酥 芋泥雪媚娘`);  // 请将食物列表补充完整

// 切换随机化功能
function toggleRun() {
  clickCount.value++;
  if (clickCount.value > maxClicks) {
    alert('这么作？今天别吃了！');
    clickCount.value = 0;  // 重置点击计数器
    return;
  }

  const list = foodList.value.split(' ');
  if (!run.value) {
    startRandomizer(list);
  } else {
    if (timer.value) clearInterval(timer.value);
  }
  run.value = !run.value;
}

// 启动随机选择
function startRandomizer(list: string[]) {
  timer.value = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * list.length);
    foodItem.value = list[randomIndex];  // 显示随机选择的食物名称
    animateText(list[randomIndex]);
  }, 50);
}

// 文字动画效果
function animateText(food: string) {
  const rTop = Math.ceil(Math.random() * window.innerHeight);
  const rLeft = Math.ceil(Math.random() * (window.innerWidth - 50));
  const rSize = Math.ceil(Math.random() * (37 - 14) + 14);
  const span = document.createElement('span');
  span.className = 'temp';
  span.textContent = food;
  span.style.cssText = `
    position: absolute;
    top: ${rTop}px;
    left: ${rLeft}px;
    color: rgba(0, 0, 0, ${Math.random()});
    font-size: ${rSize}px;
  `;
  document.body.appendChild(span);
  setTimeout(() => {
    document.body.removeChild(span);
  }, 2000);
}

// 停止按钮的功能
function stopAction() {
  alert('这么作？今天别吃了！');
  showStop.value = false;
}

// 处理键盘Enter键触发
onMounted(() => {
  document.onkeydown = (e) => {
    if (e.key === 'Enter') toggleRun();
  };
});
</script>

<style scoped>
/* 引入default.css中的样式 */
html {
  overflow: hidden;
  height: 100%;
}

body {
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #eee;
  font-family: "微软雅黑";
}

#wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -60px;
  margin-left: -250px;
  width: 500px;
  height: 120px;
  text-align: center;
}

h1 {
  margin: 0 0 20px;
  padding: 0;
  font-weight: 300;
  font-size: 30px;
}

h1 b {
  font-weight: 700;
}

#start, #stop {
  width: 120px;
  height: 40px;
  vertical-align: middle;
  font-family: "微软雅黑";
  cursor: pointer;
}

.temp {
  position: absolute;
  z-index: -1;
  color: #777;
}
</style>

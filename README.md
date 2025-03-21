# RouteMate 前端

## 1. 概述

前端项目基于 **Vue.js 3** 框架，结合 **Element Plus** UI 组件库，提供用户交互界面。

## 2. 项目结构

### 技术栈
- **框架**：Vue.js 3
- **组件库**：Element Plus
- **HTTP 客户端**：Axios
- **路由管理**：Vue Router

### 主要文件
- **main.js**：应用的入口文件，负责初始化 Vue 应用、配置路由、注册插件和全局依赖。
- **App.vue**：顶级应用组件，管理整个前端界面的结构和布局。
- **Login.vue** 和 **Register.vue**：用户登录和注册页面，与后端认证模块交互。
- **Main.vue**：主页面，作为用户访问其他功能的导航入口。
- **pinxche.vue**、**POI.vue**：用于拼车服务与 POI 推荐的前端页面。
- **map1.vue** 和 **map2.vue**：轨迹和 POI 地图的可视化展示。

## 3. 前端架构分析

### 3.1 路由管理

路由管理通过 **Vue Router** 实现，定义在 `main.js` 中。以下是主要的路由路径：
```javascript
const routes = [
    { path: '/', component: CoverPage },
    { path: '/0', component: Login },
    { path: '/1', component: Register },
    { path: '/main', component: Main },
    { path: '/pinche', component: PinChe },
    { path: '/poi', component: POI },
    { path: '/todaymenu', component: TodayMenu }
]
```
- **用户认证路径**：`/0` (Login.vue)、`/1` (Register.vue) 用于用户登录与注册，集成了身份验证逻辑。
- **功能路径**：`/pinche` 和 `/poi` 分别对应拼车和 POI 推荐功能，用户可以通过这些路径进入特定服务页面。
- **Vue Router** 使用 `createWebHistory()` 来管理浏览器历史，确保用户导航的流畅性和页面刷新不丢失状态。

### 3.2 全局依赖与插件注册

在 `main.js` 中，全局注册了 **Axios** 和 **Element Plus** 组件库：
```javascript
app.provide("$axios", axios);
app.use(ElementPlus);
```
- **Axios** 被注入为全局实例，使所有组件都可以便捷地通过 `$axios` 进行后端 API 调用。
- **Element Plus** 提供了丰富的 UI 组件，用于提升用户体验，如按钮、表单等。

## 4. 各组件的功能分析与后端集成

### 4.1 用户认证模块

- **Login.vue** 和 **Register.vue** 实现了用户的登录和注册功能。
    - **Login.vue**：用户输入凭据后，通过 Axios 发起 POST 请求到后端的 `/auth/login` 接口。如果验证成功，后端返回 JWT 令牌，前端将其保存到本地存储中，供后续请求使用。
    - **Register.vue**：用户注册页面，信息提交后与后端的 `/auth/register` 进行交互，完成用户注册流程。

### 4.2 主功能模块

- **Main.vue** 是登录后用户的主页面，提供导航到拼车、POI 推荐等服务的入口。
    - 主页面与后端的多个模块紧密集成，用户可以通过导航进入其他页面，如 **拼车服务** 或 **POI 推荐** 页面。

### 4.3 拼车服务与 POI 推荐模块

- **PinChe.vue**：前端通过调用后端的 `/carpool` 接口获取与当前用户轨迹相似的用户列表。
    - 前端页面发送 POST 请求，附带用户的热点轨迹数据，后端通过相似度分析模块返回相似用户的信息（如用户 ID、电话、邮箱等）。
    - 页面展示相似用户的基本信息，便于用户进行拼车联系。

- **POI.vue**：前端通过调用后端的 `/poi` 接口实现 POI 推荐功能。
    - 调用 `/poi` 接口，前端传递用户的热点数据，后端根据这些数据返回推荐的 POI 信息。
    - 地图上展示筛选后的 POI，帮助用户获得个性化的地点推荐。

### 4.4 地图组件

- **map1.vue** 和 **map2.vue** 分别用于展示用户的轨迹和 POI 推荐的可视化。
    - 地图组件与后端的轨迹和热点推荐模块进行交互，将后端返回的轨迹数据在地图上绘制出来。
    - 使用第三方地图库（如 Leaflet 或高德地图 API）实现轨迹与热点的直观展示。

## 5. 前后端交互流程

### 5.1 用户身份认证
- 用户在 **Login.vue** 登录后，后端返回 JWT 令牌。
- 前端将该令牌保存在本地存储中，后续所有涉及用户数据的请求都需在请求头中附带该令牌，以确保安全性。

### 5.2 热点轨迹与相似用户推荐
- 在 **PinChe.vue** 中，用户请求拼车服务，前端将用户的热点轨迹通过 POST 请求发送到后端。
- 后端通过 KDTree 算法对轨迹相似度进行计算，并返回与当前用户轨迹相似的用户信息，前端负责将这些信息展示出来，便于用户选择拼车伙伴。

### 5.3 POI 推荐的实现
- 在 **POI.vue** 中，用户可以查看推荐的 POI 信息。
- 后端利用用户的热点轨迹数据进行分析，过滤掉无关的轨迹点，并返回推荐的 POI 数据，前端在地图上将这些 POI 进行可视化展示。


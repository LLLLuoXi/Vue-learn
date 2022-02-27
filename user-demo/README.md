<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-27 23:08:41
 * @LastEditors: your name
 * @Description: 
-->
- [user-demo](#user-demo)
  - [🧐 导航守卫原理](#-导航守卫原理)
    - [前置守卫beforeEach](#前置守卫beforeeach)
  - [🧐 鉴权原理](#-鉴权原理)
# user-demo

 运用vuex和导航守卫实现用户登录与鉴权的demo

## 🧐 导航守卫原理
### 前置守卫beforeEach
- 每当导航切换时（包含刷新页面的第一次），该函数会运行。
- from：之前的路由对象(this.$route)。
- to：即将进入的路由对象(this.$route)。
- next : 确认导航的一个函数 调用该函数（无参），就会直接进入to，调用该函数（传参），根据函数进入新的导航。

![导航守卫原理.png](https://s2.loli.net/2022/02/19/aXgxCnfL912OtKy.png)

store.js
```js
actions: {
    async whoAmI(ctx) {
        ctx.commit("setLoading", true);
        const resp = await userApi.whoAmI()
        ctx.commit("setUser", resp)
        ctx.commit("setLoading", false);
    },
},
```
## 🧐 鉴权原理
![鉴权原理.png](https://s3.bmp.ovh/imgs/2022/02/ea7b7659c1719cf2.png)
```js
import store from "../store";
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要鉴权，进入鉴权逻辑
    const status = store.getters["loginUser/status"]
    if (status === "loading") {
      //  加载中，无法确定是否已经登录
      next({
        path: "/loading",
        query: {
          returnurl: to.fullPath
        }
      })
    } else if (status === "login") {
      //登录过了
      next()
    } else {
      // 未登录
      alert("该页面需要登录，清先登录")
      next({
        path: "/login",
        query: {
          returnurl: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
```




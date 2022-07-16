/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-16 21:00:29
 * @LastEditors: your name
 * @Description: 
 */

const { observer } = require('./observer')
const { autorun } = require('./Dep')

const state = {
    name: 'luoxi',
    age: 24,
    addr: {
        province: 'guangxi',
        city: "liuzhou"
    }
}

observer(state)

/*
 数据的get会运行，依赖收集进来了，将来数据变化，会触发notify重新运行autorun
*/
autorun(() => {
    // vue中的模板渲染
    console.log("姓名：", state.name, "地址", state.addr.province, state.addr.city)
})
// 姓名: luoxi 地址 guangxi liuzhou 

state.name = 'luoxi1';
// --> 姓名 luoxi1 地址 guangxi liuzhou 

state.addr.province = 'tianjin';
// --> 姓名 luoxi1 地址 tianjin liuzhou 

state.addr.city = 'tianjin';
// --> 姓名 luoxi1 地址 tianjin tianjin 

state.age = 18;
// nothing happened

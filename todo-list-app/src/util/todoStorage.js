/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-08 21:45:57
 * @LastEditors: your name
 * @Description: 
 */

const LOCAL_KEY = "todomvc"

/**
 * @description: 生成一个任务的唯一编号，时间戳+ 4位随机数
 * @param {*}
 * @return {*}
 */
export function generateId() {
    return Date.now() + Math.random().toString(16).substring(2, 5)
}
/**
 * @description: 获取目前所有任务
 */
export function fetch() {
    const result = localStorage.getItem(LOCAL_KEY)
    if (result) {
        return JSON.parse(result)
    }
    return []
}

/**
 * @description: 保存所有任务
 * @param {*} todos 任务列表
 */
export function save(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}

/**
 * @description: 经过筛选的任务列表
 * @param {*} todos 任务列表
 *  @param {*} visibility 显示的状态
 */
export function filter(todos, visibility) {
    if (visibility === 'all') {
        return todos
    } else if (visibility === "active") {
        return todos.filter(it => it.completed === false)
    } else if (visibility === "completed") {
        return todos.filter(it => it.completed === true)
    }
    throw new Error("invalid visibility value");
}
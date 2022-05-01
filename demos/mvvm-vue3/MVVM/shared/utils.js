/*
 * @Author: luoxi
 * @LastEditTime: 2022-05-01 21:43:57
 * @LastEditors: your name
 * @Description: 通用工具方法
 */

export function isObject(value) {
  return typeof value === 'object' && value != null
}

export function hasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}

export function isEqual(newValue, oldValue) {
  return newValue === oldValue
}
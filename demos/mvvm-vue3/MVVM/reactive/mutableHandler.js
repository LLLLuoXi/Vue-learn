/*
 * @Author: luoxi
 * @LastEditTime: 2022-05-01 22:30:30
 * @LastEditors: your name
 * @Description: 捕捉器处理函数
 */
import { isObject, hasOwnProperty, isEqual } from '../shared/utils'
import { useReactive } from '.';

const get = createGetter();
const set = createSetter();

function createGetter() {
  return function get(target, key, receiver) {
    console.log(target, key, receiver);
    const res = Reflect.get(target, key, receiver)
    console.log('响应式数据获取:', target[key]);

    if (isObject(res)) {
      return useReactive(res)
    }
    return res;
  }
}
function createSetter() {
  console.log('enter createSetter');
  return function set(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    const isKeyExist = hasOwnProperty(target, key)
    console.log('isKeyExist', isKeyExist);
    const oldValue = target[key];
    const res = Reflect.set(target, key, value, receiver)

    if (!isKeyExist) {
      console.log('响应式新增', key, value);
    } else if (!isEqual(value, oldValue)) {
      console.log(' 响应式修改：', key, value);
      // view update
    }
    return res;

  }
}

const mutableHandler = {
  get,
  set
}

export {
  mutableHandler
};

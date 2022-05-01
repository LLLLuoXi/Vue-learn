/*
 * @Author: luoxi
 * @LastEditTime: 2022-05-01 21:54:07
 * @LastEditors: your name
 * @Description: 
 */
import { isObject } from '../shared/utils'
import { mutableHandler } from './mutableHandler'

export function useReactive(target) {
  console.log('createReactObject', createReactObject(target, mutableHandler));
  return createReactObject(target, mutableHandler);
}

function createReactObject(target, baseHandler) {
  if (!isObject(target)) {
    return target;
  }
  const observer = new Proxy(target, baseHandler);
  return observer
}
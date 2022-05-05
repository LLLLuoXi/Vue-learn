/*
 * @Author: luoxi
 * @LastEditTime: 2022-05-05 23:42:41
 * @LastEditors: your name
 * @Description: 
 */

import { randomNum } from '../shared/utils'
const reg_onClick = /onClick\="(.+?)\"/g
const eventPool = []

export function eventFormat(template) {
  // console.log(template.match(reg_onClick));
  return template.replace(reg_onClick, function (node, key) {
    console.log(node, key);
    const _mark = randomNum()

    eventPool.push({
      mark: _mark,
      handler: key.trim(),
      type: 'click'
    })

    console.log('eventPool', eventPool);
    return `data-mark="${_mark}"`
  })
}

export function bindEvent(methods) {
  const allElements = document.querySelectorAll('*')
}
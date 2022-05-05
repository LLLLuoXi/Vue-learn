/*
 * @Author: luoxi
 * @LastEditTime: 2022-05-05 23:32:01
 * @LastEditors: your name
 * @Description: 
 * 
 */
import { eventFormat, stateFormat } from './index';
import { bindEvent } from './compiler/event';

export function useDom({ template, state, methods }, rootDOM) {
  console.log(template, state, methods, 'rootDOM:', rootDOM);
  rootDOM.innerHTML = render(template, state);
  bindEvent(methods)
}

export function render(template, state) {
  template = eventFormat(template)
  template = stateFormat(template, state)
  console.log('template', template);
  return template;
}

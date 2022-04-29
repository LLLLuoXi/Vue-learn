/*
 * @Author: luoxi
 * @LastEditTime: 2022-04-29 22:32:47
 * @LastEditors: your name
 * @Description: 
 * 
 */
import { eventFormat, stateFormat } from './index';

export function useDom({ template, state, methods }, rootDOM) {
  console.log(template, state, methods, 'rootDOM:', rootDOM);
  rootDOM.innerHTML = render(template, state);
}

export function render(template, state) {
  template = eventFormat(template)
  template = stateFormat(template, state)
  console.log('template', template);
  return template;
}

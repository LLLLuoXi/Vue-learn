/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-07 22:09:23
 * @LastEditors: your name
 * @Description: 
 */
import { ref } from 'vue'
import { generateId } from '../util/todoStorage'
export default function useNewTodo(todosRef) {
    const newTodoRef = ref('')
    const addTodo = () => {
        const value = newTodoRef.value && newTodoRef.value.trim();
        if (!value) {
            return;
        }
        // 生成任务对象 加入到任务列表中
        const todo = {
            id: generateId(),
            title: value,
            completed: false,
        }
        console.log(todo);
        todosRef.value.push(todo);
        newTodoRef.value = ""
    }
    return { newTodoRef, addTodo }

}
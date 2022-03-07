/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-07 22:08:48
 * @LastEditors: your name
 * @Description: 
 */
import { ref, watchEffect } from "vue";
import * as todoStoreage from "../util/todoStorage";

export default function useTodoList() {
    const todosRef = ref(todoStoreage.fetch());
    watchEffect(() => {
        todoStoreage.save(todosRef.value);
    });

    return { todosRef };
}
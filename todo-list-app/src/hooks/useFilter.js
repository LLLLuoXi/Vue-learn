/*
 * @Author: luoxi
 * @LastEditTime: 2022-03-08 21:55:45
 * @LastEditors: your name
 * @Description: 
 */
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { filter } from "../util/todoStorage";
const validHash = ["all", "active", "completed"]
export default function useFilter(todosRef) {
    console.log('useFilter');
    const visibilityRef = ref("all")
    const onHashChange = () => {
        const hash = location.hash.replace(/#\/?/, '')
        console.log(hash);
        if (validHash.includes(hash)) {
            visibilityRef.value = hash

        } else {
            console.log('hash 无效');
            location.hash = ""
            visibilityRef.value = "all"
        }

    }
    onMounted(() => {
        window.addEventListener("hashchange", onHashChange)
    })
    onUnmounted(() => {
        window.removeEventListener("hashchange", onHashChange)
    })

    const filteredTodoRef = computed(() => {
        return filter(todosRef.value, visibilityRef.value)
    })

    const remainningRef = computed(() => {
        return filter(todosRef.value, 'active').length
    })

    const completedRef = computed(() => {
        return filter(todosRef.value, 'completed').length
    })

    return { visibilityRef, filteredTodoRef, remainningRef, completedRef }

}
/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-08 18:32:55
 * @LastEditors: your name
 * @Description: 
 */
import { ref, computed, watch } from "vue";
import gsap from "gsap"

const colors = ["#334552", "#B34335", "#6E9FA5", "#A2C3AC", "#C8846C"];
export default function useGdp(gdpRef, maxSize) {
    console.log("gdpRef.value", gdpRef.value, Object.prototype.toString.apply(gdpRef.value).slice(8, -1))
    const maxValue = computed(() => {
        if (gdpRef.value.length) {
            return Math.max(...gdpRef.value.map(it => it.value))
        }
        return 0;
    })
    console.log("maxValue", maxValue)

    const bars = ref([])
    const barsTarget = computed(() => {
        return gdpRef.value.map((it, i) => ({
            ...it,
            color: colors[i % colors.length],
            size: (it.value / maxValue.value * maxSize)
        }))
    })

    watch(barsTarget, () => {
        for (let i = 0; i < barsTarget.value.length; i++) {
            if (!bars.value[i]) {
                bars.value[i] = {
                    ...barsTarget.value[i],
                    size: 0,
                    value: 0
                }
            }
            // bars.value[i] 中的属性逐步变化到 barsTarget.value[i] 属性的值
            gsap.to(bars.value[i], {
                ...barsTarget.value[i],
                duration: 1
            })
        }
    }, { deep: true, immediate: true })

    return {
        bars
    }
}
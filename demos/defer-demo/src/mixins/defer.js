/*
 * @Author: luoxi
 * @LastEditTime: 2022-07-02 00:22:53
 * @LastEditors: your name
 * @Description:
 */

/**
 *
 * @param {*} maxFrameCount 在渲染完成之前的最大分帧数
 * @returns
 */
export default function (maxFrameCount) {
    return {
        data() {
            return {
                //目前帧数
                frameCount: 0
            }
        },
        mounted() {
            // 刷新目前帧数
            const refreshFrameCount = (() => {
                requestAnimationFrame(() => {
                    this.frameCount++;
                    if (this.frameCount < maxFrameCount) {
                        refreshFrameCount();
                    }
                })
            })

            refreshFrameCount();
        },
        methods: {
            // 组件超过showInFrameCount进行渲染
            defer(showInFrameCount) {
                return this.frameCount >= showInFrameCount
            }
        }
    }

}
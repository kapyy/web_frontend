

const baseWidth = 1920
// 相对于1920像素的缩放比
const baseSize = 100
let realFont = 10


export function px2rem(px: number) {
    return (px / baseSize) + 'rem'
}

export function setRem() {

    let scale = document.documentElement.clientWidth / baseWidth
    // 根据屏幕变化 1rem 对应的 font-size
    scale = scale > 1 ? 1 : scale;
    realFont = baseSize * scale
    document.documentElement.style.fontSize = realFont + 'px'
}

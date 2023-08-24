// eslint-disable-next-line import/no-anonymous-default-export
export function debounce(func: Function, delay: number, immediate: boolean = false): Function {
  let timer: any
  return function (this: unknown, ...args: any[]) {
    let that = this
    if (immediate) {
      func.apply(that, args) // 确保引用函数的指向正确，并且函数的参数也不变
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(that, args)
    }, delay)
  }
}


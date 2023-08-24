

import styles from './index.module.sass'
import { ReactNode, useEffect, useState } from 'react';
import { useSwiper } from 'swiper/react';






//  组件作用 用于分辨率适配, 背景图设置, 进入动画效果 
export function PageBox(props: { children: ReactNode; url: any; gifUrl?: any, onepice?: Boolean, index?: number }) {
    const { children, url, gifUrl, onepice, index } = props
    const swiper = useSwiper();
    const [BGGif, setBGGif] = useState('')

    swiper.on('transitionEnd', (e) => {
        if (e.activeIndex === index) {
            setBGGif(gifUrl)

        }

    })


    useEffect(() => {
        if (onepice) {
            setBGGif(gifUrl)
        }

    }, [gifUrl, onepice])


    return (
        <div className={styles.pageContent} style={{
            backgroundImage: `url(${url})`,
            backgroundRepeat: 'no-repeat',
            height: '100%',
            width: '100%',
            backgroundPosition: 'center center',
            backgroundSize: '100% 100%',

        }} >
            <div style={{
                backgroundImage: `url(${BGGif})`,
                backgroundRepeat: 'no-repeat',
                height: '100%',
                width: '100%',
                backgroundPosition: 'center center',
                backgroundSize: '100% 100%',

            }} className={styles.pageContainer}>
                {children}
            </div >
        </ div >
    )
}
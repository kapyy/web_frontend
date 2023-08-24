
import styles from './index.module.sass'

import activeBG from 'assets/img/button-active.png'
import disableBg from 'assets/img/button-disable.png'
import hoverBG from 'assets/img/button-hover.png'
import { useEffect, useState, ReactNode } from 'react'



export const Kbutton = (props: { children: ReactNode, disable?: boolean, onClick: any }) => {
    const { disable, children, onClick } = props
    const [hover, sethover] = useState(false)
    const [url, setUrl] = useState(activeBG)
    const [Uistate, setUistate] = useState('')
    useEffect(() => {
        if (disable) {
            setUrl(disableBg)
            setUistate('disable')
            return
        } else if (hover) {
            setUrl(hoverBG)
            setUistate('hover')

        } else {
            setUrl(activeBG)
            setUistate('')

        }

    }, [disable, hover])
    return (
        <div
            style={{
                backgroundImage: `url(${url})`,

            }}
            className={[
                styles.button,
                styles[Uistate],
            ].join(' ')}
            {...props}
            onClick={onClick}
            onMouseEnter={() => { sethover(true) }}
            onMouseLeave={() => { sethover(false) }}>
            {children}
        </div>
    )
}
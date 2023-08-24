import { ReactNode } from "react"

import styles from './index.module.sass'
// 下拉组件 
export function KDropdown({ children, onclickBg }: { children: ReactNode, onclickBg: () => void }) {
    return <div onClick={(e) => {
        onclickBg()

    }}
        className={styles.dropdownContainer}>
        <div onClick={(e) => {
            e.stopPropagation()
        }}>
            {children}
        </div>
    </div >
}

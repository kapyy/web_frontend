import { WebImage } from "base-components/webImage";
import { userInfoModel } from "model/homeModel";
import { useRecoilState } from "recoil";
import { px2rem } from "utils/px2rem";
import styles from './index.module.sass'

// 通用的头像组件
export function Avatar({ width, height, onclick, calssName, url }: { url?: string, width: number, height: number, onclick?: () => void, calssName?: string }) {
    const [userInfoStatus, Status] = useRecoilState(userInfoModel);
    let avatarWidth = width * 1.2
    return (<div style={{
        width: px2rem(width),
        height: px2rem(height),
        borderRadius: px2rem(height),
        overflow: 'hidden'
    }}
        onClick={onclick}
        className={[styles.avatar, calssName].join(' ')}>
        <WebImage className={styles.avatarImg} width={avatarWidth} height={avatarWidth * 8 / 5} src={url || userInfoStatus.avatar} />
    </div>)
}



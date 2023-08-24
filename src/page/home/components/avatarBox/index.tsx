import { Circle } from "base-components/circle";

import styles from './index.module.sass'
import linkIcon from 'assets/img/homePage/link.png';
import unlinkIcon from 'assets/img/homePage/unlink.png';
import { Avatar } from "../avatar";
import { useCallback } from "react";
import { px2rem } from "utils/px2rem";


export function AvatarBox({ favorability, url, isLink, size, id }: { id: number, size: number, favorability: number, url?: string, isLink: boolean }) {

    const changLink = useCallback(
        () => {
            console.log(id, isLink)
        },
        [id, isLink],
    )
    return <div className={styles.avatarBox} style={{
        width: px2rem(size),
        height: px2rem(size)
    }}>
        <div style={{
            position: "absolute"
        }} className={styles.circle}>
            <Circle
                size={px2rem(size)}
                progress={favorability}
                lineWidth="10"
                progressColor="#B6FF3E"
                bgColor="#A0ABC3"
            />
            <img className={styles.onlineIcon} style={{
                width: size / 300 + 'rem',
                height: size / 300 + 'rem'
            }}

                onClick={changLink}
                src={isLink ? linkIcon : unlinkIcon} alt="" />
        </div>
        <Avatar calssName={styles.RoleAvatar} width={size - 7} url={url} height={size - 7} ></Avatar>
    </div>

}







import { useCallback, useEffect, useState } from 'react'
import styles from './index.module.sass'
import activeBG from 'assets/img/homePage/左下角背景.png'
import normalBG from 'assets/img/homePage/轮盘背景.png'
import addIcon from 'assets/img/homePage/增加.png'
import emptyIcon from 'assets/img/homePage/凹槽空位.png'
import linkBG from 'assets/img/homePage/选中样式.png'
import { IRole, roleListModel, userInfoModel } from 'model/homeModel'
import { useRecoilState } from 'recoil'
import { AvatarBox } from '../avatarBox'
import { useNavigate } from 'base-components/navigate'
import { WebImage } from 'base-components/webImage'


export function RoleCtrl() {
    const [isActive, setIsAvtive] = useState(true)
    const [roleListData,] = useRecoilState(roleListModel);

    const [hadLink, sethadLink] = useState(false)

    useEffect(() => {
        let item = roleListData.find(i => {
            return i.isLink
        })

        sethadLink(item !== undefined)
        if (item === undefined) {
            setIsAvtive(true)
        }
    }, [roleListData])



    const changeIsActive = useCallback(
        () => {
            if (!hadLink) {
                return
            }
            setIsAvtive(!isActive)
        },
        [hadLink, isActive],
    )
    return isActive ? <ActiveCtrl onClickBg={changeIsActive} /> : <NormalCtrl openCtrl={changeIsActive} />
}




function NormalCtrl({ openCtrl }: { openCtrl: () => void }) {
    const [userInfo,] = useRecoilState(userInfoModel);
    return <div className={styles.normalCtrl}
        style={{
            backgroundImage: `url(${activeBG})`
        }}
        onClick={openCtrl}
    >
        <WebImage className={styles.avatar} src={userInfo.avatar} width={150} height={240} />
    </div>
}


function ActiveCtrl({ onClickBg }: { onClickBg: () => void }) {
    const [roleListData,] = useRecoilState(roleListModel);
    const navigate = useNavigate();

    return <div className={styles.roleCtrlBg} onClick={onClickBg}>
        <div className={styles.roleCtrl}
            onClick={(e) => { e.stopPropagation() }}
            style={{
                backgroundImage: `url(${normalBG})`
            }}
        >
            <img className={styles.addIcon} src={addIcon} onClick={() => { navigate('/createRole') }} alt="" />
            <div className={[styles.first].join(' ')} >
                <RoleIcon {...roleListData[0]}></RoleIcon>
            </div>
            <div className={[styles.sec].join(' ')}>
                <RoleIcon {...roleListData[1]}></RoleIcon>
            </div>
            <div className={[styles.third].join(' ')}>
                <RoleIcon {...roleListData[2]}></RoleIcon>
            </div>
        </div>
    </div>
}


function RoleIcon(props: IRole) {
    const { isLink } = props
    if (props.id === undefined) {
        return <img src={emptyIcon} className={styles.emptyIcon} alt="" />
    }
    return <div className={styles.container}
        style={{
            backgroundImage: `url(${isLink && linkBG})`
        }}>
        <AvatarBox {...props} size={82} />
    </div>
}

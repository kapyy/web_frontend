

import styles from './index.module.sass'
import { removeLoginToken, roleListModel, userInfoModel, IRole, tokenBalance } from 'model/homeModel'
import { useRecoilState } from 'recoil'

import { useNavigate } from 'base-components/navigate'
import logo from 'assets/img/icon.jpg';
import gameIcon from 'assets/img/gameIcon.jpg';
import delConfirmBG from 'assets/img/homePage/delConfirm.png';
import tokenBG from 'assets/img/homePage/token.png';
import linkIcon from 'assets/img/homePage/link.png';
import unlinkIcon from 'assets/img/homePage/unlink.png';
import userManageImg from 'assets/img/homePage/userManage.png'
import heiEG from 'assets/img/homePage/Electricity_high.png';
import discord from 'assets/img/homePage/Discord_Icon.png';
import xIcon from 'assets/img/homePage/Twitter_icon.png';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import Modal from 'react-modal';
import { Circle } from 'base-components/circle';
import { delRole } from 'servers/api';
import { KDropdown } from 'base-components/dropDwon';
import { Avatar } from '../avatar';
import { AvatarBox } from '../avatarBox';

const modalStyles = {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  background: 'none',
  border: 'none'
}


// 首页头部组件
export const Header = () => {
  return <div className={styles.header}>
    <div>
      <img src={logo} className={styles.logo} />
    </div>
    <UserInfo />
  </div>

}

// 用户模块组件
export const UserInfo = () => {
  const goDiscord = useCallback(
    () => {
      window.open('https://discord.com/invite/DFK48WnTB6')
    },
    [],
  )
  const godX = useCallback(
    () => {
      window.open('https://discord.com/invite/DFK48WnTB6')
    },
    [],
  )
  return <div className={styles.userInfo}>
    <div className={styles.user}>
      <img src={discord} onClick={goDiscord} className={styles.icon} alt="" />
      <img src={xIcon} onClick={godX} className={styles.icon} alt="" />
      <TokenBalance></TokenBalance>
      <UserAvatar />
    </div>
  </div>
}




function TokenBalance() {
  const [showM, setShowM] = useState(false)
  const [tokenBalanceData,] = useRecoilState(tokenBalance);
  const onClick = useCallback(
    () => {
      setShowM(true)
      // to do  init token banlance
    },
    [],
  )
  return <div>
    <img src={heiEG} onClick={onClick} className={styles.icon} alt="" />
    {showM && <KDropdown onclickBg={() => { setShowM(false) }} >
      <div className={styles.TokenBalance}
        style={{
          backgroundImage: `url(${tokenBG})`
        }}
      >
        Tokne ：{tokenBalanceData.tokenBalance}
      </div>
    </KDropdown>}

  </div>

}

// 用户头像组件
function UserAvatar() {
  const [showM, setShowM] = useState(false)
  const clickAvatar = useCallback(
    () => {
      setShowM(true)
    },
    [],
  )

  return <div className={styles.userAvatar}>
    <Avatar onclick={clickAvatar} width={54} height={54} calssName={styles.avatar}></Avatar>
    {showM && <KDropdown onclickBg={() => { setShowM(false) }} >
      <UserDropdownContent></UserDropdownContent>
    </KDropdown>}
  </div>
}



//  点击用户头像的下拉菜单内容
function UserDropdownContent() {
  const [userInfoStatus,] = useRecoilState(userInfoModel);
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const logOut = useCallback(
    () => {
      removeLoginToken()
      navigate('/login')
    },
    [navigate],
  )
  const opneDobit = useCallback(
    () => {
      setIsOpen(true)
    },
    [],
  )
  return <div className={styles.dropdown}  >
    <div className={styles.top}>
      <Avatar width={50} height={50} calssName={styles.Avatar}></Avatar>
    </div>
    <div className={styles.buttom}>
      <div className={styles.nickname}> {userInfoStatus.nickname}</div>
      <div className={styles.email}> {userInfoStatus.email}</div>
      <div className={styles.line}></div>
      <div className={styles.button} onClick={opneDobit} > Dobit management</div>
      <div className={styles.button} onClick={logOut}> Log out</div>
    </div>
    <Modal
      onRequestClose={() => { setIsOpen(false) }}
      isOpen={modalIsOpen}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 },
        content: modalStyles,
      }}
    >
      <div className={styles.modalClose} onClick={() => {
        setIsOpen(false)
      }}> </div>
      <UserManageModal></UserManageModal>
    </Modal>
  </div>

}


function UserManageModal() {
  const [allowDel, setallowDel] = useState(true)
  const [roleListData,] = useRecoilState(roleListModel);

  useEffect(() => {
    if (roleListData.length === 1) {
      setallowDel(false)

    }
  }, [roleListData])
  return <div className={styles.userManage} style={{
    backgroundImage: `url(${userManageImg})`
  }}>
    <div className={styles.UserManageModalcontent}>
      {
        roleListData.map((i, index) =>
          <Role {...i} key={index} allowDel={allowDel} />
        )
      }
    </div>
  </div>
}

interface IRoleType extends IRole {
  allowDel: boolean
}

function Role({ avatar, favorability, id, isLink, allowDel }: IRoleType) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [disalbe, setDisable] = useState(false);
  const del = useCallback(
    () => {
      setIsOpen(true)
    },
    [],
  )
  useEffect(() => {
    if (isLink || !allowDel) {
      setDisable(true)
    }

  }, [allowDel, isLink])
  // 接口交互的逻辑
  const delCmd = useCallback(
    async () => {
      await delRole(id)
      setIsOpen(true)
    },
    [id],
  )
  return <div className={styles.role}>

    <AvatarBox favorability={favorability} id={id} isLink={isLink} url={avatar} size={96}></AvatarBox>
    <div className={styles.RoleButtonList}>
      <RoleButton> Set as profile pic </RoleButton>
      <RoleButton disable={disalbe} onClick={del}>Delete Dobit</RoleButton>
    </div>
    <Modal
      onRequestClose={() => { setIsOpen(false) }}
      isOpen={modalIsOpen}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 100 },
        content: modalStyles,
      }}
    >
      <div className={styles.modalClose} onClick={() => {
        setIsOpen(false)
      }}> </div>
      <div className={styles.delModal} style={
        {
          backgroundImage: `url(${delConfirmBG})`
        }
      }>

        <p>Are you sure to delete this DOBIT?Once deleted, the data cannot be retrieved.</p>
        <div className={styles.buttonList}>
          <div onClick={() => { setIsOpen(false) }} className={styles.confirmButton}>NO</div>
          <div onClick={delCmd} className={[styles.confirmButton, styles.err].join(' ')}>Yes</div>
        </div>
      </div>
    </Modal>
  </div>
}



function RoleButton(props: { children: ReactNode, disable?: boolean, onClick?: any }) {
  const { disable, children, onClick } = props
  return <div
    className={[styles.RoleButton, disable ? styles.disable : ''].join(' ')}
    onClick={!disable ? onClick : ''}>
    {children}
  </div>
}







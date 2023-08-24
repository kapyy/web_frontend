
import { Header } from './components/header'
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoModel, tokenBalance } from 'model/homeModel';

import { getUserinfo, getTokenBalance } from 'servers/api';
import { RoleCtrl } from './components/ctrl';


// import styles from './index.module.sass'


function Home() {
  const [, setUserInfo] = useRecoilState(userInfoModel)
  const [, setTokenBalance] = useRecoilState(tokenBalance)

  //初始化加载
  useEffect(() => {

    // initUserInfo()
    // initToken()
  }, [])
  async function initUserInfo() {
    // TODO  请求用户信息  token信息
    let res = await getUserinfo()
    setUserInfo(res)
  }
  async function initToken() {
    // TODO  请求用户信息  token信息
    let res = await getTokenBalance()
    setTokenBalance(res)
  }
  return (
    <div className="App">
      <Header></Header>
      <RoleCtrl></RoleCtrl>
    </div>
  );
}

export default Home

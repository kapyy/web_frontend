
import { useCallback, useEffect, useState } from 'react';
import { addWaitlist } from 'servers/api';
import styles from './index.module.sass'
import icon from 'assets/img/icon.jpg'
import Runes from 'assets/img/runes.png'
import RunesEN from 'assets/img/runesEN.png'
import runesBG from 'assets/img/runesBG.png'
import inputBGA from 'assets/img/inputBGA.png'
import inputGB from 'assets/img/inputGB.png'
import { regeEMial } from 'page/register';
import { toast } from 'react-toastify';
import { useRive } from '@rive-app/react-canvas';
import star_rating from 'assets/rive/new_file.riv'
import sss from 'assets/rive/sss.riv'
import dog from 'assets/img/dog.gif'



type stateType = -1 | 0 | 1 | 2 | 3//枚举值 -1 表示还没有请求接口 0 表示首次请求成功显示分享链接 1 表示已经通过白名单可以登录 2表示再等待名单中 3 ip调用次数过多

function Petition() {
  const [email, setEmail] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [runes, setRunes] = useState(Runes)
  const [state, setState] = useState<stateType>(-1)
  const innerWidth = window.innerWidth
  const Height = innerWidth / 1920 * 1080
  const { rive, RiveComponent: RiveComponentTouch
  } = useRive({
    src: sss,
    artboard: 'New Artboard',
    autoplay: true
  });
  const changeEmail = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    },
    [],
  )
  const submit = useCallback(
    async () => {
      let res = await addWaitlist({
        email,
        sharecode: new URLSearchParams(document.location.search).get("shareCode") || undefined
      })
      console.log(res.data)

      setState(res.data.statue)
      setShareUrl(res.data.shareurl)
    },
    [email],
  )
  return (
    <div className={styles.container} >
      <div className={styles.RiveContainer} style={{
        width: innerWidth + 'px',
        height: Height + 'px',
      }} >

        <RiveComponentTouch
          className={styles.RiveComponent}
          width={innerWidth}
          height={Height}
        /></div>

      <img src={icon} className={styles.icon} />
      <div className={styles.form}>
        <div className={styles.RunesBG}
          style={{
            backgroundImage: `url(${runesBG})`
          }}>
          <img src={runes}
            className={styles.runesimg}
            alt=""
            onMouseEnter={() => { setRunes(RunesEN) }}
            onMouseLeave={() => { setRunes(Runes) }}
          />
        </div>
        <Input onChange={changeEmail} onClick={submit} />
        <div>
          <Tip state={state} shareUrl={shareUrl} />
        </div>


      </div>
      <div>
        <img className={styles.dog} src={dog} alt="" />
      </div>
    </div>
  );
}

const Tip = ({ state, shareUrl }: { state: stateType, shareUrl: string }) => {

  const onClick = useCallback(
    () => {
      let transfer = document.createElement('input');
      document.body.appendChild(transfer);
      transfer.value = shareUrl;  // 这里表示想要复制的内容
      transfer.focus();
      transfer.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
      }
      transfer.blur();
      toast.success('copy success')
      document.body.removeChild(transfer);
    },
    [shareUrl],
  )
  if (state === -1) return <div></div>
  if (state === 0) return <div className={styles.tip}>
    The COVENANT has been formed, and the TRANSIT KEY will be delivered to your email address as soon as the verification is completed.
    <p>You can also summon your friends to join Mysterel and move up the queue faster!</p>
    <p><span className={styles.email}>{shareUrl}</span> <span className={styles.button} onClick={onClick}>copy</span> </p>
  </div>
  if (state === 2) return <div className={styles.tip}>
    You are already on the list
  </div>
  if (state === 3) return <div className={styles.tip}>
    Thanks for your interest! You've reached today's limit. Please try again tomorrow.
  </div>
  if (state === 1) return <div>

  </div>
  return <div></div>
}

const Input = ({ onChange, onClick }: { onChange: (s: any) => void, onClick: () => void }) => {
  const [text, setText] = useState('')
  const [url, setUrl] = useState(inputGB)
  const [fouceState, setFouceState] = useState(false)
  const [disable, setDisable] = useState(true)


  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFouceState(false)
    setUrl(inputGB)
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFouceState(true)
    setUrl(inputBGA)
  };

  const changeText = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setText(e.target.value)
      onChange(e)
    },
    [onChange],
  )

  useEffect(() => {
    if (!regeEMial.test(text)) {
      setDisable(true)
    } else {
      setDisable(false)

    }

  }, [text])
  return <div
    className={styles.InputBox}
    onMouseEnter={() => { setUrl(inputBGA) }}
    onMouseLeave={() => { !fouceState && setUrl(inputGB) }}
    style={{
      backgroundImage: `url(${url})`,
    }}>
    <input
      className={styles.input}
      onChange={changeText}
      onFocus={handleFocus}
      onBlur={handleBlur}>
    </input>
    <span onClick={() => { !disable && onClick() }} className={[styles.button, disable ? '' : styles.active].join(' ')}> Join the waitlist</span>
  </div>

}



export default Petition
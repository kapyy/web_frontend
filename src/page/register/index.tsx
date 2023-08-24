import { useForm, useWatch, Control } from 'react-hook-form';
import useCountdown from "@bradgarropy/use-countdown"
import { toast } from 'react-toastify';
import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";

import styles from './index.module.sass'
import {
  KInput
} from 'base-components/input';
import { Kbutton } from 'base-components/button';
import { AuthingLogin, changeUserInfo, getManagementToken, sendEmail, signup } from 'servers/authing';
import loginBG from 'assets/img/bg/loginBG.png'

export const regeEMial = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;

interface RegisterForm {
  password: string,
  email: string,
  passCode: string,
};

function RegisterPage() {

  return (
    <div className={styles.container} style={{
      backgroundImage: `url(${loginBG})`,
    }}>

      <div className={styles.form}>
        <Form></Form>
      </div>
    </div>
  );
}

const Countdown = ({ onCompleted }: { onCompleted: any }) => {
  const countdown = useCountdown({
    minutes: 0,
    seconds: 59,
    format: "mm:ss",
    autoStart: true,
    onCompleted: onCompleted,
  })
  return <span>
    {countdown.seconds}
  </span>
}

const SendEmail = ({ control }: { control: Control<RegisterForm> }) => {
  const email = useWatch({
    control,
    name: "email", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });
  const [waiting, setWaiting] = useState(false)
  const sendCode = useCallback(
    async () => {
      if (!regeEMial.test(email)) {
        toast.error(' You must enter your right email')
        return
      }
      let res = await sendEmail({
        email,
        "channel": "CHANNEL_REGISTER"
      })
      if (res.data.statusCode === 200) {
        setWaiting(true)
        toast.success('send success')
      } else {
        toast.error(res.data.message)
      }
    },
    [email],
  )
  return <div className={styles.sendEmail} >
    {waiting ? <Countdown onCompleted={() => {
      setWaiting(false)
    }} /> : <span onClick={sendCode}> send</span>}

  </div>
}




function Form() {
  const { register, handleSubmit, formState, control } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const submit = useCallback(
    async (data: RegisterForm) => {
      let { password, email, passCode } = data
      let res = await signup({ passCodePayload: { email, passCode } })
      //注册成功下一步修改密码
      if (res.data.statusCode === 200) {
        toast.success('register success')
        // 获取token
        let tokendata = await getManagementToken()
        let access_token = tokendata.data.data.access_token
        let userId = res.data.data.userId
        let userInfo = await changeUserInfo({
          authorization: access_token,
          userId,
          password
        })

        console.log(userInfo, ' authing完成')
        await AuthingLogin({ password, email })
        navigate('/')

      } else {
        toast.error(res.data.message)
      }
    },
    [navigate],
  )
  const [agree, setAgree] = useState(false)
  const gotoLogin = useCallback(
    () => {
      navigate('/login')

    },
    [navigate],
  )
  const onChange = useCallback(
    (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
      setAgree(e.target.checked)
    },
    [],
  )

  return (<form onSubmit={handleSubmit(submit)} className={styles.form}>
    <KInput
      autoFocus
      margin="dense"
      label="email"
      error={!!formState.errors.email?.message}
      helperText={formState.errors.email?.message}
      first
      {...register('email', {
        required: {
          value: true,
          message: "You must enter your email"
        },
        validate: {
          positive: (value, context) => {
            return regeEMial.test(value) ? undefined : 'You must enter your right email'
          },
        },
      })}
    />
    <KInput
      autoFocus
      margin="dense"
      label="code"
      error={!!formState.errors.passCode?.message}
      helperText={formState.errors.passCode?.message}
      addonAfter={SendEmail({ control })}
      {...register('passCode', {
        required: {
          value: true,
          message: "You must enter your code"
        },
      })}
    />
    <KInput
      autoFocus
      margin="dense"
      label="password"
      fullWidth
      variant="outlined"
      type='password'
      helperText={formState.errors.password?.message}
      error={!!formState.errors.password?.message}
      {...register('password', {
        required: {
          value: true,
          message: "You must enter your password"
        },
        minLength: { value: 8, message: 'password  length cannot be less than 8' },
        maxLength: { value: 20, message: 'password  length cannot be more than 20' },
      })}
    />
    <div className={styles.account}>
      < input name="checkbox" className={styles.checkbox} type="checkbox" value="checkbox" onChange={onChange} />
      By continuing to the next step,you agree to our and severs
    </div>
    <div className={styles.Kbutton}>
      <Kbutton onClick={handleSubmit(submit)} disable={!agree}> register </Kbutton>
    </div>
    <div className={styles.account}>
      <span>Have an account?</span>
      <span onClick={gotoLogin} className={styles.active}>Log in</span>
    </div>
  </form>
  )

}










export default RegisterPage
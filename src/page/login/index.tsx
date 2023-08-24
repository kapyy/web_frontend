import { useForm, useWatch, Control } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import styles from './index.module.sass'
import {
  KInput
} from 'base-components/input';
import { Kbutton } from 'base-components/button';
import { AuthingLogin } from 'servers/authing';
import loginBG from 'assets/img/bg/loginBG.png'
import { setLoginInfo } from 'model/homeModel';


function LoginPage() {

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

type LoginForm = {
  username: string;
  password: string
};


function Form() {
  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const navigate = useNavigate();


  const submit = useCallback(
    async (data: LoginForm) => {
      let { password, username } = data
      try {
        let res = await AuthingLogin({ password, email: username })
        if (res.code === 0) {
          setLoginInfo(res.data.token)
          toast.success('login success')
          navigate('/')

        } else {
          toast.error(res.msg)
        }
      } catch (err: any) {
        toast.error(err.message)
      }
    },
    [navigate]
  )
  const gotoRegister = useCallback(
    () => {
      navigate('/register')

    },
    [navigate],
  )


  return (<form onSubmit={handleSubmit(submit)} >
    <KInput
      label="email"
      first
      error={!!formState.errors?.username?.message}
      helperText={formState.errors?.username?.message}
      {...register('username')}
    />
    <KInput
      label="password"
      type='password'
      error={!!formState.errors?.password?.message}
      helperText={formState.errors?.password?.message}
      {...register('password')}
    />
    <div className={styles.Forgot}>
      <span>
        Forgot your password？
      </span>
    </div>
    <div className={styles.Kbutton}>
      <Kbutton onClick={handleSubmit(submit)}> login </Kbutton>
    </div>
    <div className={styles.account}>
      <span>
        Don’t have an account?
      </span>
      <span onClick={gotoRegister} className={styles.active}>Create an account</span>
    </div>

  </form >
  )

}
















export default LoginPage
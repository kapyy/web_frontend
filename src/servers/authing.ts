import { setAuthingToken } from 'model/homeModel';
import { verify } from './api';
import { IResponse, AuthingAxios } from './http'
const client_id = '64c8bfceb2584559c13132be'
const client_Secret = 'd56bbaacd29ab3d159fda0fd7cbf2c04'
const x_authing_userpool_id = '64c8bed2b9445245411f1ef0'


type LoginParams = {
    email: string,
    password: string
}
export const AuthingLogin = (params: LoginParams): Promise<IResponse> => {

    return AuthingAxios.post('https://console.authing.cn/api/v3/signin', {
        connection: 'PASSWORD',
        client_id: client_id,
        client_secret: client_Secret,
        passwordPayload: params
    }, {
        headers: {
            'x-authing-app-id': client_id
        }
    }).then(res => {
        if (res.data.statusCode === 200) {
            setAuthingToken({
                id_token: res.data.data.id_token,
                access_token: res.data.data.access_token
            })
            return res.data.data.id_token
        } else {
            throw new Error(res.data.message);
        }
    }).then((res) => {
        return verify({ id_token: res })
    })
};

type ISendEmail = {
    email: string,
    channel: string
}

export const sendEmail = (params: ISendEmail): Promise<IResponse> => {
    return AuthingAxios.post('https://console.authing.cn/api/v3/send-email', params,
        {
            headers: {
                'x-authing-userpool-id': x_authing_userpool_id,
                Accept: ' application/json, text/plain, */*'
            }

        }
    )
}

type ISignup = {
    passCodePayload: {
        email: string,
        passCode: string,
    }
}
// 注册 验证码模式

export const signup = (params: ISignup): Promise<IResponse> => {
    return AuthingAxios.post('https://console.authing.cn/api/v3/signup', {
        ...params,
        connection: 'PASSCODE',
    },
        {
            headers: {
                'x-authing-userpool-id': x_authing_userpool_id,
                Accept: ' application/json, text/plain, */*'
            }

        }
    )
}

export const getAuthingUserInfo = (): Promise<IResponse> => {
    return AuthingAxios.get('https://console.authing.cn/api/v3/get-profile',
        {
            headers: {
                'x-authing-userpool-id': x_authing_userpool_id,
                Accept: ' application/json, text/plain, */*',
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('access_token')
            }

        }
    )
}

// 此处有非常严重的安全问题，为了在注册流修改用户密码需要获取管理员token并且前端写死管理员秘钥
export const getManagementToken = () => {
    return AuthingAxios.post('https://console.authing.cn/api/v3/get-management-token', {
        accessKeySecret: 'be4039dba04e7442f1acdefa0f8c44a6',
        'accessKeyId': x_authing_userpool_id,
    },
        {
            headers: {
                Accept: ' application/json, text/plain, */*',
                'Content-Type': 'application/json',
                authorization: ''
            }

        }
    )
}

type IChangeUserInfo = {
    userId: string
    password: string
    authorization: string
}
// 修改用户信息，主要是密码
export const changeUserInfo = ({ userId, password, authorization }: IChangeUserInfo) => {
    return AuthingAxios.post('https://console.authing.cn/api/v3/update-user', {
        userId,
        password
    },
        {
            headers: {
                Accept: ' application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'x-authing-userpool-id': x_authing_userpool_id,
                authorization
            }

        }
    )
}




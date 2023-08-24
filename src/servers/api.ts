import http, { IResponse, gameHttp, webHttp } from './http'

import { IRole } from 'model/homeModel'
type ILogin = {
    username: string,
    password: string
}

export const Login = (params: ILogin): Promise<IResponse> => {
    return webHttp.post('/v1/login', params).then(res => {
        return res.data
    }
    );
};

type IRegister = {
    username: string,
    password: string,
    nickname: string

}

export const Register = (params: IRegister): Promise<any> => {
    return webHttp.post('/v1/register', params).then(res => {
        return res.data
    }
    );
};

type ILogout = {
    user_id: string,
    token: string,
}

export const Logout = (params: ILogout): Promise<any> => {
    return webHttp.post('/v1/logout', params).then(res => {
        return res.data
    }
    );
};

// 获取角色信息
export const getUserinfo = (): Promise<any> => {
    return webHttp.get('/v1/userinfo').then(res => {
        return res.data
    });
};


type IVerify = {
    id_token: string
}

export const verify = (params: IVerify): Promise<IResponse> => {
    return webHttp.post('/v1/verify', params).then(res => {
        return res.data
    }
    );
};

//创建角色
export const rolecreate = (params: any): Promise<any> => {
    return gameHttp.post('/v1/rolecreate', params).then(res => {
        return res.data
    });
};



// 技能查询
export const skillsearch = (params: any): Promise<any> => {
    return gameHttp.post('/v1/skillsearch', params).then(res => {
        return res.data
    });
};


// 是生成模型
export const modelcreate = (params: any): Promise<{
    model_name: string,
    atlas_uri: string,
    thumbnail_uri: string,
    png_uri: string,
}> => {
    return gameHttp.post('/v1/modelcreate', params).then(res => {
        return res.data
    });
};




// 入参数格式


type IPetition = {
    sharecode?: string,
    email: string,
}


// 添加等待白名单
export const addWaitlist = ({ email, sharecode }: IPetition) => {
    return webHttp.post('/v1/addwaitlist', {
        email,
        sharecode
    })
}





// 添加等待白名单
export const getTokenBalance = (): Promise<{
    tokenBalance: number,
    fullToken: number,
}> => {
    return gameHttp.post('/v1/getTokenBalance')
}




// delRole
export const delRole = (id: number): Promise<{

}> => {
    return gameHttp.post('/v1/delRole')
}


// delRole
export const getRoleList = (): Promise<
    IRole[]
> => {
    return gameHttp.post('/v1/getRoleList')
}

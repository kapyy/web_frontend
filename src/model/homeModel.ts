import { atom } from "recoil";
type UserInfo = {
    nickname?: string,
    email: string,
    avatar: string
}
export const userInfoModel = atom({
    key: 'userInfo', // unique ID (with respect to other atoms/selectors)
    default: {
        email: '21312@13123',
        nickname: 'Ramen',
        avatar: 'outputs/43351508-fe33-4464-84a6-b1aee843fffc/image.png',
    } as UserInfo,
});



export const tokenBalance = atom({
    key: 'tokenBalance', // unique ID (with respect to other atoms/selectors)
    default: {
        tokenBalance: 200000,
        fullToken: 300000
    }
});


export type IRole = {
    avatar: string,
    favorability: number,
    id: number,
    isLink: boolean
}

export const roleListModel = atom({
    key: 'roleList', // unique ID (with respect to other atoms/selectors)
    default: [{
        favorability: 33,
        avatar: 'outputs/43351508-fe33-4464-84a6-b1aee843fffc/image.png',
        id: 11,
        isLink: false
    },
    {
        favorability: 50,
        avatar: 'outputs/43351508-fe33-4464-84a6-b1aee843fffc/image.png',
        id: 22,
        isLink: true
    }, {
        favorability: 90,
        avatar: 'outputs/43351508-fe33-4464-84a6-b1aee843fffc/image.png',
        id: 33,
        isLink: false
    },
    ] as IRole[],
});






export const setLoginInfo = (token: string) => {
    localStorage.setItem('token', token)
}

export const removeLoginToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
}


export const setAuthingToken = ({ access_token, id_token }: { access_token: string, id_token: string }) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('id_token', id_token)
}




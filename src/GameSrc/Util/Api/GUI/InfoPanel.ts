import http, { IResponse } from '../../../../servers/http'

type InpcIm = {
    role_id : string,
    npc_id: string
}

export const Infoboard = (params: InpcIm): Promise<IResponse> => {
    return http.post('game/infoboard', params).then(res => {
        return res.data
    }
    );
};

type newInfo={
    role_id: string,
    npc_id: string,
    description : string
}

export const updatedInfo = (params: newInfo): Promise<IResponse> => {
    return http.post('game/updatedinfo', params).then(res => {
        return res.data
    }
    );
};
import http, { IResponse } from '../../../../servers/http'

// type InpcIm = {
//     role_id : string,
// }

// export const GAboard_log = (params: InpcIm): Promise<IResponse> => {
//     return http.post('game/gaboard/log', params).then(res => {
//         return res.data
//     }
//     );
// };

// temp data
export const Gaboard_log = () => {
    var templog:string[] = [];
    for (var i = 0; i < 10; i++) {
        templog[i] = "test_log" + String(i);
    }
    return templog;
};

// export const Gaboard_schedule = (params: InpcIm): Promise<IResponse> => {
//     return http.post('game/gaboard/schedule', params).then(res => {
//         return res.data
//     }
//     );
// };

// temp data
export const Gaboard_schedule = () => {
    var tempsche:string[] =[];
    for(var i=0;i<10;i++){
        tempsche[i]="test_sche"+String(i);
    }
    return tempsche;
};


var AWS = require("aws-sdk");

AWS.config.credentials = new AWS.WebIdentityCredentials({
    RoleArn: 'arn:aws:iam::621191458127:role/authing-user',
    WebIdentityToken: localStorage.getItem('id_token') // id_token
});

var s3 = new AWS.S3({});

// 返回base64 url 注意这是一个异步函数。

export function s3GetData(key: string): Promise<string> {
    return new Promise((reslove, reject) => {
        s3.getObject({
            Bucket: 'kotoko-dynamic-test',
            Key: key
        },
            (err: any, data: any) => {
                if (err) {
                    console.log(err);
                } else if (data) {
                    const base64Image = data.Body.toString('base64');
                    const contentType = data.ContentType;
                    // 构建 base64 编码的 URL
                    const base64Url = `data:${contentType};base64,${base64Image}`;
                    reslove(base64Url);
                }
            })
    })
}
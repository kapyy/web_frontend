export function toDataURL(url: string) {
    return new Promise<string>((reslove) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                if (reader.result === null) {
                    reslove('null')
                } else {
                    reslove(reader.result.toString())
                }
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    })
}
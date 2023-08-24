import { s3GetData } from "./s3"



//todo 资源转base64 全部存在内存

export class LoaderManager {
    flieList: {
        [key: string]: string,
    }
    base64List: {
        [key: string]: string,
    }
    count: number

    constructor(fileLsit: {
        [key: string]: string,
    }) {
        this.flieList = fileLsit
        this.base64List = {}
        this.count = Object.keys(this.flieList).length
    }

    async load() {
        if (this.count === 0) {
            return this.base64List
        }
        await new Promise((reslove) => {
            Object.keys(this.flieList).forEach(async (key, item) => {

                this.base64List[key] = await s3GetData(key)

                this.count--
                if (this.count === 0) {
                    reslove(12)
                }

            })
        })
        return this.base64List
    }
}

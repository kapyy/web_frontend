import { useEffect, useState } from "react"
import { px2rem } from "utils/px2rem"
import { s3GetData } from "utils/s3"

interface Iprops {
    src: string,
    width: number,
    height: number
    className?: string
}

export const WebImage = ({ src, width, height, className }: Iprops) => {
    const [url, seturl] = useState('')
    const [load, setload] = useState(false)

    useEffect(() => {
        s3GetData(src)
            .then((res: string) => {
                seturl(res)
                setload(true)
            })
    }, [src])
    return (
        <div style={{
            width: px2rem(width),
            height: px2rem(height)
        }}>
            {load && <img style={{
                width: px2rem(width),
                height: px2rem(height)
            }} className={className} src={url} />}
        </div>
    )
}
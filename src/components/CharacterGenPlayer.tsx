import { SpinePlayer } from "@esotericsoftware/spine-player";
import { useCallback, useEffect, useRef } from 'react';

export const CharacterGenPlayer = (props: { file: any }) => {
    const file = props.file
    const reactCanvas = useRef(null);
    const playerRef = useRef<null | SpinePlayer>(null);

    const initPlayer = useCallback(async (file: any) => {
        if (playerRef.current) {
            playerRef.current.dispose()
            playerRef.current = null
        }
        // Q为啥要大费周章的转base64 ？
        // A 因为不这样就会相对路径寻址，但是S3的安全策略不允许
        try {
            const spinePlayer = new SpinePlayer(reactCanvas.current as unknown as HTMLElement, {
                preserveDrawingBuffer: false,
                jsonUrl: 'person-normal.json',
                atlasUrl: 'spinepack.atlas',
                animation: "animation",
                mipmaps: false,
                premultipliedAlpha: false,
                showControls: false,
                rawDataURIs: {
                    'person-normal.json': file.json,
                    'spinepack.atlas': file.atlas,
                    'spinepack.png': file.png,
                }
            })
            // const spinePlayer = new SpinePlayer(reactCanvas.current as unknown as HTMLElement, {
            //     jsonUrl: "https://esotericsoftware.com/files/examples/4.0/spineboy/export/spineboy-pro.json",
            //     atlasUrl: "https://esotericsoftware.com/files/examples/4.0/spineboy/export/spineboy-pma.atlas"
            // })
            playerRef.current = spinePlayer
        } catch {
            playerRef.current = null
        }

    }, [])


    useEffect(() => {
        if (reactCanvas !== null && file?.json !== undefined) {
            initPlayer(file)
        }
    }, [reactCanvas, file, initPlayer])


    return <>
        <div ref={reactCanvas}></div>
    </>

}

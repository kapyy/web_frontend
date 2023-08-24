
import { useCallback, useEffect, useState } from 'react'
import styles from "./index.module.sass"
import { spinefileIndex, spinefileList, spinefileLoading } from 'model/spineModel';
import { useRecoilState } from 'recoil';
import { LoaderManager } from 'utils/spnieLoader';
import { Textarea, Button, Chip } from '@mui/joy';
import { CharacterGenPlayer } from 'components/CharacterGenPlayer';
import { modelcreate, rolecreate } from 'servers/api';
import { getSpineFileName } from 'utils/getSpineFileName';
import { ssaoPixelShader } from '@babylonjs/core/Shaders/ssao.fragment';



export function SpinePage() {
    const [index, setIndex] = useRecoilState(spinefileIndex)
    const [fileList, setFileList] = useRecoilState(spinefileList)
    const [drawFile, setDrawFile] = useState<any>(null)
    const [loading, setLoading] = useRecoilState(spinefileLoading)



    const [prompt, setPrompt] = useState('')
    const getNewAssets = useCallback(
        async () => {
            setLoading(true)
            const res = await modelcreate({
                prompt: prompt,
                index: 1
            })
            const loaderManager = new LoaderManager(getSpineFileName(res.model_name))
            const loadres = await loaderManager.load()
            let length = 0
            setFileList((oldList) => {
                const list = [...oldList, { ...loadres, model_name: res.model_name }]
                length = list.length
                return list

            })
            setIndex(length - 1)
            setLoading(false)

        },
        [setFileList, setIndex, setLoading, prompt],
    )
    useEffect(() => {
        if (fileList.length > 0) {
            setDrawFile(fileList[index])
        }

    }, [index, fileList])

    const changFileIndex = useCallback(
        (index: number) => {

            setIndex(index)
        },
        [setIndex],
    )
    const save = useCallback(
        () => {
            rolecreate({
                index: 1,
                step: 4,
                model_names: drawFile.model_name
            })
        },
        [drawFile],
    )

    return <>
        <div className={styles.content}>
            {loading ? <div className={styles.loading}>
                敷衍的LOADING......
            </div> : null}
            <div className={styles.left}>
                <div className='player'>
                    {drawFile?.json ? <CharacterGenPlayer file={drawFile} ></CharacterGenPlayer>
                        : null}
                </div>
                <div className={styles.fileList}>
                    {fileList.map((i, index) => {
                        return <Chip key={index} onClick={() => { changFileIndex(index) }}>
                            <img className={styles.fileImage} src={i.thumbnail_uri} alt="" />
                        </Chip >
                    })}
                </div>

            </div>
            <div className={styles.right}>
                <h3>DESCRIPION</h3>
                <Textarea
                    placeholder="Placeholder"
                    minRows={12}
                    maxRows={15} size="lg"
                    onChange={(e) => {
                        setPrompt(e.target.value)
                    }}
                />
                <Button onClick={getNewAssets}>
                    CRERATE
                </Button>
            </div>
            <div className={styles.nextbutton}>
                {/* <img src={Next} alt="" onClick={ } /> */}
            </div>
        </div>
    </ >
}


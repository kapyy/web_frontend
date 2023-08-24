
import styles from "./index.module.sass"

import { useSwiper } from 'swiper/react';
import { wordCloud } from 'utils/cloud';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Chip, ChipDelete } from '@mui/joy';
import Next from 'assets/img/bg/Next.png'
import { rolecreate } from 'servers/api';

const data = ['word', 'architect', 'logician', 'commander', 'debater', 'analyst', 'diplomat', 'advocate', 'mediator', 'protagonist', 'campaigner', 'sentinel', 'logistician', 'defender', 'executive', 'consul', 'explorer', 'virtuoso', 'adventurer', 'entrepreneur', 'entertainer', 'Sensing', 'Intuition', 'Thinking', 'Feeling', 'valuing', 'connecting', 'reasoning', 'structuring', 'knowing', 'ideating', 'stabilizing', 'experiencing', 'Practical', 'Responsible', 'Traditional', 'Considerate', 'Caring', 'Organized', 'Idealistic', 'Compassionate', 'Insightful', ' Logical', 'Visionary', 'Independent', 'Skillful', 'Practical', 'Adventurous', 'Sensitive', ' Free-spirited', 'Flexible ', 'Idealistic', 'Creative', 'Principled', 'Logical', 'Conceptual', 'Abstracted', 'Energetic', 'Adventurous', 'Competitive', 'Enthusiastic', 'Spontaneous', 'Generous', 'Enthusiastic', 'Creative', 'Principled', 'Energetic', 'Visionary', 'Resourceful', 'Efficient', 'Organized', 'Practical', 'Friendly', 'Generous', 'Organized', 'Charismatic', ' Altruistic', 'Organized', 'Decisive', 'Strategic', 'Efficient']


export function WordCloudpage() {
    const canvas = useRef(null)
    const wordListRef = useRef<string[]>([])
    const [wordList, setWordList] = useState<string[]>([])
    const swiper = useSwiper();

    const onClick = useCallback(
        (data: string) => {
            if (wordListRef.current.indexOf(data) === -1) {
                if (wordListRef.current.length > 9) {
                    return
                }
                wordListRef.current = [...wordListRef.current, data]
                setWordList(wordListRef.current)
            }
        },
        [],
    )
    useEffect(() => {
        if (canvas.current) {
            wordCloud(canvas.current, data, onClick,)
        }

    }, [canvas, onClick])

    const del = useCallback(
        (data: string) => {
            let list = [...wordListRef.current]
            list.splice(list.indexOf(data), 1)
            setWordList(list)
            wordListRef.current = list

        },
        [setWordList, wordListRef]
    )
    const next = useCallback(
        async () => {
            rolecreate({
                index: 1,
                step: 2,
                personality: wordList
            })
            swiper.slideNext()
        }, [swiper, wordList]
    )
    return <>
        <div className={styles.content}>
            <div className={styles.left}>
                <canvas className='canvas' width="600" height="600" ref={canvas}></canvas>
            </div>
            <div className={styles.list}>
                {wordList.map(i => {
                    return Itme(i, del)
                })}
            </div>
        </div>
        <div className={styles.nextbutton}>
            <img src={Next} alt="" onClick={next} />
        </div>
    </ >
}

export const Itme = (i: string, del: (i: any) => void) => {
    return <Chip
        endDecorator={<ChipDelete onDelete={() => { del(i) }} />}
        sx={{
            gap: 8,
            top: 7,
            margin: 0.5
        }}
    >
        <div>{i}</div>
    </Chip >
}



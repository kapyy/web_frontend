
import styles from './index.module.sass'

import { Autocomplete } from '@mui/joy';
import { useCallback, useState } from 'react';
import { Itme } from '../WordCloudpage';
import Next from 'assets/img/bg/Next.png'

import { useSwiper } from 'swiper/react';
import { rolecreate, skillsearch } from 'servers/api';
import { debounce } from '@mui/material/utils';

//  组件作用 用于分辨率适配, 背景图设置, 进入动画效果 
export function SkillPage() {
    const swiper = useSwiper();
    const [kills, setKills] = useState<string[]>([])
    const choose = useCallback<(kill: string) => void>(
        (kill: string) => {
            if (kills.indexOf(kill) === -1) {
                setKills([...kills, kill])
            }
        },
        [kills],
    )

    const del = useCallback(
        (data: string) => {
            let list = [...kills]
            list.splice(list.indexOf(data), 1)
            setKills(list)
        },
        [kills]
    )
    const next = useCallback(
        async () => {
            rolecreate({
                index: 1,
                Step: 3,
                skills: kills
            })
            swiper.slideNext()
        }, [swiper, kills]
    )

    return <>
        <div className={styles.content}>
            <div className={styles.skills}>
                {kills.map(i => {
                    return Itme(i, del)
                })}
            </div>
            <div className={styles.searchKill}>
                <KllSearch choose={choose}></KllSearch>
            </div>
        </div>
        <div className={styles.nextbutton}>
            <img src={Next} alt="" onClick={next} />
        </div>
    </ >
}

function KllSearch(props: { choose: (kill: string) => void }) {
    const choose = props.choose
    const [killList, setKillList] = useState<string[]>([])
    const [loding, setLoding] = useState<boolean>(false)
    const [killChoose, setKillChoose] = useState<string>('')
    const onInputChange = useCallback(
        debounce(async (val: string) => {
            if (val === '') {
                setKillList([])
                return
            }
            setLoding(true)
            setKillList([])
            let res = await skillsearch({ search_value: val })
            setKillList(res.skills)
            setLoding(false)
        }, 400)
        ,
        [],
    )
    const change = useCallback(
        (kill: string | null) => {
            setKillChoose('')
            if (kill) choose(kill)

        },
        [choose],
    )

    return <div className={styles.KllSearch}>
        <div className={styles.KllSearchBox}>
            <h2>
                SKILL
            </h2>
            <h5>balablabla</h5>
            <Autocomplete
                inputValue={killChoose}
                onChange={(event, newValue) => {
                    change(newValue);
                }}
                loading={loding}
                options={killList}
                onInputChange={(e, val) => {
                    setKillChoose(val)
                    onInputChange(val)
                }}
            />
        </div>

    </div>
}


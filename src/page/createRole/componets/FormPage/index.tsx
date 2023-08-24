
import styles from './index.module.sass'
import Next from 'assets/img/bg/Next.png'
import img from 'assets/img/bg/bg1.png'
import gifUrl from 'assets/img/bg/gif1.gif'
import { PageBox } from '../pageBox';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { FormControl } from '@mui/joy';

import { useSwiper } from 'swiper/react';
import { modelcreate, rolecreate } from 'servers/api';
import { spinefileIndex, spinefileList, spinefileLoading } from 'model/spineModel';
import { useRecoilState } from 'recoil';
import { LoaderManager } from 'utils/spnieLoader';
import { getSpineFileName } from 'utils/getSpineFileName';
import { KInput } from 'base-components/input';
import { Ktextarea } from 'base-components/textarea';


import icon from 'assets/img/icon.jpg'



type FormType = {
    name: string;
    age: string | number
    sex: string
    gender: string
    description: number
};
export function FormPage() {
    const swiper = useSwiper();
    const { register, handleSubmit, formState: { errors }, } = useForm<FormType>();
    const [text, setText] = useState('');
    const [, setFileList] = useRecoilState(spinefileList)
    const [, setSpinefileIndex] = useRecoilState(spinefileIndex)
    const [, setLoading] = useRecoilState(spinefileLoading)



    const next = useCallback(
        async (data: FormType) => {
            if (data.age === '100+') {
                data.age = 101
            } else {
                data.age = Number(data.age)
            }
            rolecreate({
                index: 1,
                step: 1,
                ...data
            })
            swiper.slideNext()
            setLoading(true)
            let res = await modelcreate({
                prompt: data.description,
                index: 1
            })
            let loaderManager = new LoaderManager(getSpineFileName(res.model_name))

            let loadres = await loaderManager.load()

            setFileList((oldList) => {
                let list = [...oldList, { ...loadres, model_name: res.model_name }]
                return list
            })

            setSpinefileIndex(0)
            setLoading(false)
        }, [setFileList, setLoading, setSpinefileIndex, swiper]
    )

    return <PageBox url={img} gifUrl={gifUrl}
        onepice={true}>

        <Box className={styles.container}>

            <Grid container className={styles.form} spacing={2}>
                <Grid xs={12}>
                    <div className={styles.iconbox}>
                        <img width={250} src={icon} alt="" />
                    </div>
                </Grid>

                <Grid xs={12}>
                    <FormControl>
                        <KInput size="lg"
                            label="dobitName"
                            helperText={errors.name?.message}
                            error={!!errors.name?.message}
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: "You must enter your dobitName"
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'dobitName length cannot be more than 30'
                                },
                            })} />
                    </FormControl>
                </Grid>
                <Grid xs={4}>
                    <FormControl>
                        <KInput
                            label="age"
                            type="number"
                            size="lg"
                            helperText={errors.age?.message}
                            error={!!errors.age?.message}
                            {...register('age', {
                                max: {
                                    value: 100,
                                    message: 'sex  length cannot be more than 15'
                                },
                            }
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid xs={4}>
                    <FormControl>
                        <KInput size="lg"
                            label="sex"
                            error={!!errors.sex?.message}
                            {...register('sex', {
                                maxLength: {
                                    value: 15,
                                    message: 'sex  length cannot be more than 15'
                                },
                            })} />
                        {!!errors.sex?.message
                            ? <div >{errors.sex?.message}</div>
                            : null}
                    </FormControl>
                </Grid>
                <Grid xs={4}>
                    <FormControl>
                        <KInput size="lg"
                            label="gender"
                            error={!!errors.gender?.message}
                            {...register('gender', {

                            })} />
                        {!!errors.gender?.message
                            ? <div>{errors.gender?.message}</div>
                            : null}
                    </FormControl>
                </Grid>
                <Grid xs={12}>
                    <FormControl>
                        <Ktextarea
                            placeholder="Placeholder111232131"
                            size="lg"
                            label="email"
                            rows={4}
                            {...register('description', {
                                onChange: (event) => {
                                    let val = event.target.value
                                    console.log(val, 'val~~')
                                    if (val.length > 300) {
                                        setText(val.slice(0, 300))
                                    } else {
                                        setText(val)
                                    }
                                }
                            })}

                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
        <div className={styles.nextbutton}>
            <img src={Next} alt="" onClick={handleSubmit(next)} />
        </div>
    </PageBox >
}


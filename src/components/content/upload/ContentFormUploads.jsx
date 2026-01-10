import { useRef, useState } from 'react'
import { useEplayer } from '@/context/eplayer-context'
import PleaseAuth from '@/components/errors/PleaseAuth'
import style from './contentFormUploads.module.scss'
import { useMutation } from '@tanstack/react-query'
import { musicService } from '@/services/music.service'
import { message } from 'antd';
import UploadsPreview from './components/UploadsPreview'
import UploadsName from './components/UploadsName'
import UploadsDesc from './components/UploadsDesc'
import UploadsAudio from './components/UploadsAudio'
import UploadsBtn from './components/UploadsBtn'

export default function ContentFormUploads() {
    const {isAuth, userId, access_token, refresh_token, changeAccessToken} = useEplayer()
    const imageInputRef = useRef(null)
    const imagePreviewRef = useRef(null)
    const audioInputRef = useRef(null)
    const audioDropZoneRef = useRef(null)
    const [imageFile, setImageFile] = useState(null)
    const [audioFile, setAudioFile] = useState(null)
    const nameRef = useRef(null)
    const descRef = useRef(null)

    const [messageApi, contextHolder] = message.useMessage();
    const success = (text) => {
        messageApi.open({
            type: 'success',
            content: text,
        });
    };
    const error = (text) => {
        messageApi.open({
            type: 'error',
            content: text,
        });
    };

    const {mutate, isPending} = useMutation({
        mutationKey: ['publication audio'],
        mutationFn: (form) => musicService.postUpload(
            form,
            access_token,
            refresh_token,
            changeAccessToken
        ),
        onSuccess: (data) => {
            success('Публикация прошла успешно')
            imageInputRef.current.value = null
            imagePreviewRef.current.src = '#'
            imagePreviewRef.current.style.display = 'none'
            audioInputRef.current.value = null
            audioDropZoneRef.current.value = null
            setImageFile(null)
            setAudioFile(null)
            nameRef.current.value = null
            descRef.current.value = null
            console.log(JSON.stringify(data))
        },
        onError: (error) => {
            error(error.response?.data?.message || error.message || error || 'Ошибка')
            console.log('uploadError: ', error.response?.data?.message || error.message)
        }
    })

    const uploadForm = () => {
        if (isPending) return;

        const form = {
            preview: imageFile,
            title: nameRef.current.value,
            description: descRef.current.value,
            audio: audioFile,
            id: userId
        }

        if (!form.title || !form.audio) return error('Форма не заполнена');

        return mutate(form)
    }

    if (!isAuth) {
        return <PleaseAuth />
    }

    return (
        <div className={style.ContentFormUploads}>
            {contextHolder}
            <div className={style.ContentFormUploads__Container}>
                <div className={style.ContentFormUploads__Wrapper}>
                    <p className={style.ContentFormUploads__Wrapper__Title}>
                        Публикация
                    </p>
                    <div className={style.ContentFormUploads__Wrapper__Form}>
                        <UploadsPreview
                            imageInputRef={imageInputRef}
                            imagePreviewRef={imagePreviewRef}
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                        />

                        <UploadsName nameRef={nameRef} />

                        <UploadsDesc descRef={descRef} />

                        <UploadsAudio
                            audioFile={audioFile}
                            setAudioFile={setAudioFile}
                            audioInputRef={audioInputRef}
                            audioDropZoneRef={audioDropZoneRef}
                        />

                        <UploadsBtn isPending={isPending} uploadForm={uploadForm} />
                    </div>
                </div>
            </div>
        </div>
    )
}
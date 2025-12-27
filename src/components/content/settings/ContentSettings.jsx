import { useMutation, useQuery } from '@tanstack/react-query'
import { useEplayer } from '../../../context/eplayer-context'
import PleaseAuth from '../../errors/PleaseAuth'
import style from './contentSettings.module.scss'
import { userService } from '../../../services/user.service'
import { useEffect, useRef, useState } from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import userDefaultAvatar from '../../../assets/images/userDefaultAvatar.svg'
import audioDefaultpreview from '../../../assets/images/audioDefaultpreview.jpeg'
import { Button, message, Popover, Space } from 'antd';
import { musicService } from '../../../services/music.service'
import { useNavigate } from 'react-router'
import SettingsLoading from './components/SettingsLoading'
import SettingsError from './components/SettingsError'

export default function ContentSettings() {
    const {
        isAuth,
        userId,
        access_token,
        refresh_token,
        changeAccessToken
    } = useEplayer()

    const [messageApi, contextHolder] = message.useMessage();

    const {
        isLoading,
        data,
        isError,
        error,
        refetch,
        isSuccess
    } = useQuery({
        queryKey: ['user profile data by id: ', userId],
        queryFn: () => userService.profile(access_token, refresh_token, changeAccessToken),
        enabled: false,
        retry: 0
    })

    const [avatarFile, setAvatarFile] = useState(null)
    const [form, setForm] = useState({})
    const [globalError, setGlobalError] = useState('')
    const [musicArray, setMusicArray] = useState([])
    
    const inputAvatarRef = useRef(null)
    const avatarRef = useRef(null)
    const nameRef = useRef(null)
    const descRef = useRef(null)

    const {
        mutate: updateUserProfile,
        isPending: isUpdateUserProfile
    } = useMutation({
        mutationKey: ['update user profile by id: ', userId],
        mutationFn: () => userService.updateUserAccount(
            form,
            access_token,
            refresh_token,
            changeAccessToken
        ), onSuccess: (data) => {
            messageApi.open({
                type: 'success',
                content: 'Данные успешно сохранены',
            });
            refetch()
        }, onError: (error) => {
            setGlobalError(error.response?.data?.message || error.message);
        }
    })

    const {
        mutate: deleteMusic,
        isPending: isDeleteMusic
    } = useMutation({
        mutationKey: ['delete music'],
        mutationFn: (musicId) => musicService.postDelete(
            musicId,
            access_token,
            refresh_token,
            changeAccessToken
        ), onSuccess: (data, musicId) => {
            try {
                const newState = musicArray.filter(item => item.id !== musicId)
                setMusicArray(newState)
            } catch (e) {
                return console.error(e)
            }
            messageApi.open({
                type: 'success',
                content: 'Пост успешно удалён',
            });
        }, onError: (error) => {
            messageApi.open({
                type: 'error',
                content: `Ошибка: ${error.response?.data?.message || error.message}`,
            });
        }
    })

    function changeAvatarInput(e) {
        const file = e.target.files[0]
        if (!file) return;
        setAvatarFile(file)

        const reader = new FileReader()

        reader.onload = (e) => {
            const avatarImg = avatarRef.current
            avatarImg.src = e.target.result
            avatarImg.style.display = 'block'
        }

        reader.readAsDataURL(file)
    }

    function saveFormAccount() {
        setForm({
            avatar: avatarFile,
            name: nameRef.current.value,
            description: descRef.current.value
        })
    }

    useEffect(() => {
        if (Object.keys(form).length === 0) return;

        updateUserProfile()
    }, [form])

    useEffect(() => {
        if (!isAuth || !access_token || !refresh_token) return;

        refetch()
    }, [isAuth, access_token, refresh_token])

    useEffect(() => {
        if (!data) return;

        setMusicArray(data?.music?.reverse())
    }, [data])

    if (!isAuth) {
        return <PleaseAuth />
    }

    if (isLoading || !isSuccess || !musicArray) {
        return <SettingsLoading />
    }

    if (isError) {
        return <SettingsError message={error.response?.data?.message || error.message} />
    }

    return (
        <div className={style.ContentSettings}>
            {contextHolder}
            <div className={style.ContentSettings__Container}>
                <div className={style.ContentSettings__Wrapper}>
                    <p className={style.ContentSettings__Wrapper__Title}>
                        Настройки
                    </p>

                    <div className={style.ContentSettings__Wrapper__FormAccount}>
                        <p className={style.ContentSettings__Wrapper__FormAccount__Title}>
                            Профиль
                        </p>

                        <div className={style.ContentSettings__Wrapper__FormAccount__Form}>
                            <label
                                htmlFor="avatar"
                                className={style.ContentSettings__Wrapper__FormAccount__Form__Avatar}
                            >
                                <input
                                    ref={inputAvatarRef}
                                    onChange={(e) => changeAvatarInput(e)}
                                    style={{
                                        display: 'none'
                                    }}
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    accept='image/jpeg, image/jpg, image/png, image/gif'
                                />
                                <div className={style.ContentSettings__Wrapper__FormAccount__Form__Avatar__Img}>
                                    {avatarFile ? (
                                        <img
                                            ref={avatarRef}
                                            style={{display: 'none'}}
                                            src='#'
                                            alt='Изображение'
                                        />
                                    ): (
                                        <img
                                            src={userDefaultAvatar}
                                            alt="Изображение"
                                        />
                                    )}
                                </div>
                                <button
                                    onClick={() => inputAvatarRef.current.click()}
                                    type="button"
                                >
                                    Изменить
                                </button>
                            </label>

                            <label
                                htmlFor="name"
                                className={style.ContentSettings__Wrapper__FormAccount__Form__Name}
                            >
                                <p>Имя</p>
                                <input
                                    ref={nameRef}
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={data.name}
                                    maxLength={100}
                                />
                            </label>

                            <label
                                htmlFor="desc"
                                className={style.ContentSettings__Wrapper__FormAccount__Form__Desc}
                            >
                                <p>Описание</p>
                                <textarea
                                    ref={descRef}
                                    type="text"
                                    name="desc"
                                    id="desc"
                                    defaultValue={data.description}
                                    maxLength={5000}
                                />
                            </label>

                            { globalError && (
                                <div className={style.ContentSettings__Wrapper__FormAccount__Form__Error}>
                                    <p>{globalError}</p>
                                </div>
                            )}

                            <div className={style.ContentSettings__Wrapper__FormAccount__Form__Save}>
                                <button
                                    type="button"
                                    onClick={() => saveFormAccount()}
                                    disabled={isUpdateUserProfile}
                                >
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={style.ContentSettings__Wrapper__MusicAccount}>
                        <p className={style.ContentSettings__Wrapper__MusicAccount__Title}>
                                Моя музыка
                        </p>
                        <div className={style.ContentSettings__Wrapper__MusicAccount__List}>
                            {musicArray ? musicArray.map(music => (
                                <div
                                    id={music.id}
                                    key={music.id}
                                    className={style.ContentSettings__Wrapper__MusicAccount__List__Item}
                                >
                                    <div className={style.ContentSettings__Wrapper__MusicAccount__List__Item__Preview}>
                                        <img
                                            className={style.ContentSettings__Wrapper__MusicAccount__List__Item__Preview__Img}
                                            src={
                                                music.preview ? 
                                                    `/api/music/preview/${music.preview}`
                                                    : audioDefaultpreview
                                                }
                                                alt="Изображение"
                                        />
                                    </div>

                                    <div className={style.ContentSettings__Wrapper__MusicAccount__List__Item__Text}>
                                        <p
                                            className={style.ContentSettings__Wrapper__MusicAccount__List__Item__Text__Title}
                                        >
                                            {music.title}
                                        </p>
                                        <Popover
                                            content={
                                                <div
                                                    style={{
                                                        display: 'flex'
                                                    }}
                                                >
                                                    <button
                                                        style={{
                                                            backgroundColor: 'transparent'
                                                        }}
                                                        onClick={() => deleteMusic(music.id)}
                                                        disabled={isDeleteMusic}
                                                    >
                                                        Удалить
                                                    </button>
                                                </div>
                                            }
                                            trigger="click"
                                        >
                                            <Button>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </Button>
                                        </Popover>
                                    </div>
                                </div>
                            )): (
                                <p>Ничего нет...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
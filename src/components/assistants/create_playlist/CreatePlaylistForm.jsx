import { useEffect, useRef, useState } from "react"
import style from './CreatePlaylist.module.scss'
import { message, Switch } from "antd"
import { useMutation } from "@tanstack/react-query"
// import { useEplayer } from "../../../context/eplayer-context"
// import { userService } from "../../../services/user.service"
import { useEplayer } from '@/context/eplayer-context'
import { userService } from '@/services/user.service'
import FormName from "./components/FormName"
import FormDesc from "./components/FormDesc"
import FormAccess from "./components/FormAccess"
import FormSubmit from "./components/FormSubmit"

export default function CreatePlaylistForm({ newItem }) {
    const {
        access_token,
        refresh_token,
        changeAccessToken,
        changeUser
    } = useEplayer()

    const [access, setAccess] = useState(true)

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

    const onChangeAccess = (checked) => {
        setAccess(checked)
    }

    const {
        mutate: mutateForm,
        isPending: isPendingForm
    } = useMutation({
        mutationKey: ['create playlist'],
        mutationFn: (form) => {
            console.log('Mutation playlist is started: ', form)

            return userService.createPlaylist(
                form,
                access_token,
                refresh_token,
                changeAccessToken
            )
        },
        onSuccess: (newPlaylist) => {
            console.log(newPlaylist)
            nameRef.current.value = ''
            descRef.current.value = ''
            setAccess(true)
            success('Плейлист создан')
            changeUser(prev => ({
                ...prev,
                playlists: [
                    ...prev.playlists,
                    newPlaylist
                ]
            }))
        },
        onError: (error) => {
            console.log(error)
            error(error.response?.data?.message ?? error.message ?? error ?? 'Ошибка')
        }
    })

    const handleSubmit = () => {
        if (
            !nameRef.current.value
            || nameRef.current.value === ''
        ) {
            return error('Название обязательно к заполнению...')
        }

        mutateForm({
            name: nameRef.current.value,
            description: descRef.current.value,
            access,
            newItem: newItem ?? null
        })
    }

    return (
        <div className={style.PlaylistForm}>
            {contextHolder}
            <div className={style.CreatePlaylistForm__Container}>
                <FormName nameRef={nameRef} />
                <FormDesc descRef={descRef} />
                <FormAccess
                    onChangeAccess={onChangeAccess}
                    access={access}
                />
                <FormSubmit
                    handleSubmit={handleSubmit}
                    isPendingForm={isPendingForm}
                />
            </div>
        </div>
    )
}
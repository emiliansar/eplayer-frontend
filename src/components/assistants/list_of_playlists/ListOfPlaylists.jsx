// import { useEplayer } from "../../../context/eplayer-context";
import { useEplayer } from '@/context/eplayer-context'
import style from './ListOfPlaylists.module.scss'
import { useMutation } from "@tanstack/react-query";
// import { userService } from "../../../services/user.service";
import { userService } from "@/services/user.service";
// import { useMusic } from "../../../context/music-context";
import { useMusic } from "@/context/music-context";
import { message } from 'antd';
// import PleaseAuth from "../../errors/PleaseAuth";
import PleaseAuth from "@/components/errors/PleaseAuth";
import PlaylistBtnCreate from "./components/PlaylistBtnCreate";
import PlaylistsItem from "./components/PlaylistsItem";
import { useState } from "react";

export default function ListOfPlaylists({ setIsFinalRequest, musicId }) {
    const {
        user,
        userId,
        access_token,
        refresh_token,
        changeAccessToken
    } = useEplayer()
    const { currentTrackId } = useMusic()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [messageApi, contextHolder] = message.useMessage();

    const success = (text) => {
        messageApi.open({
            type: 'success',
            content: text,
        });
    };

    const error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const {
        isPending: isPendingPlaylist,
        mutate: mutatePlaylist
    } = useMutation({
        mutationKey: ['update playlist'],
        mutationFn: (playlistId) => userService.addToPlaylist(
            playlistId,
            userId,
            access_token,
            refresh_token,
            changeAccessToken,
            musicId
        ),
        onSuccess: (data) => {
            console.log("success data: ", data)
            success('Произведение успешно добавленно в плейлист!')
            setIsFinalRequest(true)
        },
        onError: (e) => {
            console.log("error: ", e)
            error(e.response?.data.message || e.message || 'Ошибка')
            message.destroy(error)
        }
    })

    const handleAddToPlaylist = (playlistId) => {
        mutatePlaylist(playlistId)
    }

    if (userId === 0) {
        return <PleaseAuth />
    }

    return (
        <div className={style.ListOfPlaylists} >
            {contextHolder}
            <div className={style.ListOfPlaylists__List}>
                <div className={style.ListOfPlaylists__List__Item}>
                    <PlaylistBtnCreate
                        showModal={showModal}
                        isModalOpen={isModalOpen}
                        handleCancel={handleCancel}
                        newItem={currentTrackId}
                    />
                </div>
                {user.playlists?.map((item, index) => (
                    <div
                        key={index}
                        className={style.ListOfPlaylists__List__Item}
                    >
                        <PlaylistsItem
                            handleAddToPlaylist={handleAddToPlaylist}
                            item={item}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
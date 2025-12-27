import { useQuery } from "@tanstack/react-query"
import { useEplayer } from "../../../context/eplayer-context"
import PleaseAuth from "../../errors/PleaseAuth"
import { userService } from "../../../services/user.service"
import style from './contentPlaylists.module.scss'
import PlaylistLoading from "./components/PlaylistsLoading"
import PlaylistsError from "./components/PlaylistsError"
import PlaylistsItem from "./components/PlaylistsItem"
import PlaylistNew from "./components/PlaylistNew"

export default function ContentPlaylists() {
    const {
        isAuth,
        userId,
        user,
        access_token,
        refresh_token,
        changeAccessToken
    } = useEplayer()

    const {
        isLoading,
        data,
        isError,
        error,
        isSuccess
    } = useQuery({
        queryKey: ["playlists user: ", userId],
        queryFn: () => userService.getPlaylists(
            access_token,
            refresh_token,
            changeAccessToken
        ),
        retry: false,
    })

    if (!isAuth) {
        return <PleaseAuth />
    }

    if (isLoading) {
        return <PlaylistLoading />
    }

    if (isError) {
        return <PlaylistsError message={error.response?.message || error.message} />
    }

    return (
        <div className={style.ContentPlaylists}>
            <div className={style.ContentPlaylists__Container}>
                <p className={style.ContentPlaylists__Container__Title}>
                    Мои плейлисты
                </p>
                <div className={style.ContentPlaylists__Container__List}>
                    {data?.map((playlist, index) => (
                        <PlaylistsItem
                            key={index}
                            playlist={playlist}
                        />
                    ))}
                    <PlaylistNew />
                </div>
                <div className={style.ContentPlaylists__Container__Reference}>
                    <p>Если новый плейлист не появился перезагрузите страницу...</p>
                </div>
            </div>
        </div>
    )
}
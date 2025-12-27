import { Link } from "react-router";
import style from '../ContentPlaylists.module.scss'
import playlistDefaultPreviewImg from '../../../../assets/images/playlistDefaultPreview.jpeg'

export default function PlaylistsItem({ playlist }) {
    return (
        <Link
            to={`/listen?m=${playlist.musicList?.[0]}&p=${playlist.id}`}
            className={style.ContentPlaylists__Container__List__Item}
        >
            <div className={style.ContentPlaylists__Container__List__Item__Preview}>
                <img
                    src={
                        playlist.preview?.[0] || playlistDefaultPreviewImg
                    }
                    alt="Изображение плейлиста"
                />
            </div>
            <div className={style.ContentPlaylists__Container__List__Item__Text}>
                <p className={style.ContentPlaylists__Container__List__Item__Text__Title}>
                    {playlist.name}
                </p>
                <span
                    className={style.ContentPlaylists__Container__List__Item__Text__Access}
                >
                    {playlist.access ? "Открытый доступ" : "Доступ ограничен"}
                </span>
            </div>
        </Link>
    )
}
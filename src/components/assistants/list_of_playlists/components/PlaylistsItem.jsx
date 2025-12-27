import playlistDefaultPreviewImg from '../../../../assets/images/playlistDefaultPreview.jpeg'
import style from '../ListOfPlaylists.module.scss'

export default function PlaylistsItem({ handleAddToPlaylist, item }) {
    return (
        <button
            onClick={() => handleAddToPlaylist(item.id)}
            className={style.ListOfPlaylists__List__Item__Btn}
        >
            <div
                className={style.ListOfPlaylists__List__Item__Btn__Preview}
            >
                <img
                    src={playlistDefaultPreviewImg}
                    alt="Превью плейлиста"
                />
            </div>
            <p
                className={style.ListOfPlaylists__List__Item__Btn__Title}
            >
                {item.name}
            </p>
        </button>
    )
}
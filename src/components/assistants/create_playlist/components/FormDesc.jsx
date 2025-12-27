import style from '../CreatePlaylist.module.scss'

export default function FormDesc({ descRef }) {
    return (
        <div
            className={style.CreatePlaylistForm__Field}
        >
            <span>Описание: </span>
            <textarea
                ref={descRef}
                type="text"
                name="desc"
                id="desc"
                className={style.CreatePlaylistForm__Field__Desc}
            />
        </div>
    )
}
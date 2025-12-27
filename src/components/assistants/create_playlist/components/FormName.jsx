import style from '../CreatePlaylist.module.scss'

export default function FormName({ nameRef }) {
    return (
        <div
            className={style.CreatePlaylistForm__Field}
        >
            <span>Название: </span>
            <input
                ref={nameRef}
                type="text"
                name="name"
                id="name"
                maxLength={100}
                className={style.CreatePlaylistForm__Field__Name}
            />
        </div>
    )
}
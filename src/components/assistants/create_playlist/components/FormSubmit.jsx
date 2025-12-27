import style from '../CreatePlaylist.module.scss'

export default function FormSubmit({
    handleSubmit,
    isPendingForm
}) {
    return (
        <div
            className={style.CreatePlaylistForm__Submit}
        >
            <button
                onClick={handleSubmit}
                disabled={isPendingForm}
                className={style.CreatePlaylistForm__Submit__Btn}
            >
                Создать
            </button>
        </div>
    )
}
import style from '../contentHistory.module.scss'

export default function HistoryNotFound() {
    return (
        <div className={style.ContentHistory}>
            <div className={style.ContentHistory__Container}>
                <p className={style.ContentHistory__Container__Title}>
                    История прослушивания
                </p>

                <div className={style.ContentHistory__Container__Nothing}>
                    <p className={style.ContentHistory__Container__Nothing__Message}>
                        Тут ничего нет
                    </p>
                </div>
            </div>
        </div>
    )
}
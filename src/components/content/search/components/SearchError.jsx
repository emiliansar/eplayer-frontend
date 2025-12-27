import style from '../ContentSearch.module.scss'

export default function SearchError() {
    return (
        <div className={style.ContentSearch}>
            <div className={style.ContentSearch__Container}>
                <p className={style.ContentSearch__Error}>
                    Ошибка... Текст в консоли
                </p>
            </div>
        </div>
    )
}
import style from '../ContentSearch.module.scss'

export default function SearchLoading() {
    return (
        <div className={style.ContentSearch}>
            <div className={style.ContentSearch__Container}>
                <p className={style.ContentSearch__IsLoading}>
                    Загрузка...
                </p>
            </div>
        </div>
    )
}
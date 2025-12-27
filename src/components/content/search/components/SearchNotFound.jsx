import style from '../ContentSearch.module.scss'

export default function SearchNotFound({ searchQuery }) {
    return (
        <div className={style.ContentSearch}>
            <div className={style.ContentSearch__Container}>
                <p className={style.ContentSearch__NotFound}>
                    По вашему запросу ничего не найдено...
                    { searchQuery }
                </p>
            </div>
        </div>
    )
}
import style from '../ContentAuthor.module.scss'

// PlNotFound - playlist not found
export default function PlNotFound() {
    return (
        <div className={style.PLNotFound}>
            <p>Плейлистов нет</p>
        </div>
    )
}
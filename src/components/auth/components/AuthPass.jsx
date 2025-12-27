import style from '../AppAuth.module.scss'

export default function AuthPass({ passwordRef }) {
    return (
        <div className={style.AppAuth__Auth__Container__Password}>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                className={style.AppAuth__Auth__Container__Password__Input}
                ref={passwordRef}
            />
        </div>
    )
}
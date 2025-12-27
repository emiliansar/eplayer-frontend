import style from '../AppAuth.module.scss'

export default function AuthEmail({ emailRef, defaultName }) {
    return (
        <div className={style.AppAuth__Auth__Container__Email}>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Почта"
                className={style.AppAuth__Auth__Container__Email__Input}
                ref={emailRef}
                onChange={defaultName}
            />
        </div>
    )
}
import style from '../AppAuth.module.scss'

export default function AuthName({ stateDefaultName, nameRef }) {
    return (
        <div className={style.AppAuth__Auth__Container__Name}>
            <input
                type="text"
                name="name"
                id="name"
                placeholder={ stateDefaultName ? `${stateDefaultName} | изначальное имя` : "Имя"}
                className={style.AppAuth__Auth__Container__Name__Input}
                ref={nameRef}
            />
        </div>
    )
}
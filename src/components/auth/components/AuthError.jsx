import style from '../AppAuth.module.scss'

export default function AuthError({ errorValue }) {
    return (
        <>
            {errorValue && (
                <div className={style.AppAuth__Auth__Container__Error}>
                    <p className={style.AppAuth__Auth__Container__Error__Text}>
                        {errorValue}
                    </p>
                </div>
            )}
        </>
    )
}
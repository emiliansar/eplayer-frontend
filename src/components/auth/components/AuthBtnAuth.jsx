import { useOutletContext } from 'react-router'
import style from '../AppAuth.module.scss'

export default function AuthBtnAuth({
    isPending,
    emailRef,
    passwordRef,
    mutate,
    setErrorValue
}) {
    const { error } = useOutletContext()

    const Signin = () => {
        setErrorValue('')

        const dto = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        if (!dto.email || !dto.password) {
            return error("Форма не заполнена")
        }

        // return console.log(dto)

        mutate(dto)
    }

    return (
        <div className={style.AppAuth__Auth__Container__Button}>
            <button
                type="button"
                className={style.AppAuth__Auth__Container__Button__Submit}
                onClick={Signin}
                disabled={isPending}
            >
                Войти
            </button>
        </div>
    )
}
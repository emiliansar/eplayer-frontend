import style from '../AppAuth.module.scss'

export default function AuthBtnReg({
    nameRef,
    stateDefaultName,
    emailRef,
    passwordRef,
    mutate,
    isPending,
    setErrorValue
}) {
    const Register = () => {
        setErrorValue('')

        const dto = {
            name: nameRef.current.value || stateDefaultName,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        if (!dto.email || !dto.password) {
            return setErrorValue("Форма не заполнена")
        }

        mutate(dto)
    }

    return (
        <div className={style.AppAuth__Auth__Container__Button}>
            <button
                type="button"
                className={style.AppAuth__Auth__Container__Button__Submit}
                onClick={Register}
                disabled={isPending}
            >
                Создать аккаунт
            </button>
        </div>
    )
}
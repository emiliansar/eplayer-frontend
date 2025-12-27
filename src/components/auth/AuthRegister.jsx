import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { authService } from "../../services/auth.service"
import style from './AppAuth.module.scss'
import { MoveRight } from "lucide-react"
import { Link, useNavigate, useOutletContext } from "react-router"
import AuthName from "./components/AuthName"
import AuthEmail from "./components/AuthEmail"
import AuthPass from "./components/AuthPass"
import AuthError from "./components/AuthError"
import AuthBtnReg from "./components/AuthBtnReg"

export default function AuthRegister() {
    const { success, error } = useOutletContext()
    const queryClient = useQueryClient()
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const navigate = useNavigate()
    const [errorValue, setErrorValue] = useState('')
    const [stateDefaultName, setStateDefaultName] = useState('')

    const {mutate, isPending} = useMutation({
        mutationKey: ['register'],
        mutationFn: (dto) => authService.register(dto),
        onSuccess: (data) => {
            queryClient.setQueryData(['register'], data)
            console.log(data)
            success("Аккаунт зарегистрирован")
            navigate('/auth/signin')
        },
        onError: (e) => {
            error(e.response?.data?.message || e.message || "Ошибка")
            // setErrorValue(e.response?.data?.message || e.message || "Ошибка")
        }
    })

    const defaultName = () => {
        if (nameRef.current.value) return

        const defaultUserName = emailRef.current.value.split('@')[0]
        console.log(defaultUserName)

        setStateDefaultName(defaultUserName)
    }

    return (
        <>
          <div className={`${style.AppAuth__Auth} ${style.AppAuth__Register}`}>
            <div className={style.AppAuth__Auth__Container}>
                <p className={style.AppAuth__Auth__Container__Title}>
                    Регистрация
                </p>
                <AuthName stateDefaultName={stateDefaultName} nameRef={nameRef} />
                <AuthEmail emailRef={emailRef} defaultName={defaultName} />
                <AuthPass passwordRef={passwordRef} />
                <AuthError errorValue={errorValue} />
                <AuthBtnReg
                    nameRef={nameRef}
                    stateDefaultName={stateDefaultName}
                    emailRef={emailRef}
                    passwordRef={passwordRef}
                    mutate={mutate}
                    isPending={isPending}
                    setErrorValue={setErrorValue}
                />
                <div className={style.AppAuth__Auth__Container__OtherLinks}>
                    <span>
                        Есть аккаунт?
                        <Link
                            to={'/auth/signin'}
                        >
                            Авторизоваться
                            <MoveRight />
                        </Link>
                    </span>
                </div>
            </div>
          </div>
        </>
    )
}
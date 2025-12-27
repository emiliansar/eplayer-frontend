import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { authService } from "../../services/auth.service"
import { useEplayer } from "../../context/eplayer-context"
import style from './appAuth.module.scss'
import { MoveRight } from 'lucide-react';
import { Link, useNavigate, useOutletContext } from "react-router"
import AuthEmail from "./components/AuthEmail"
import AuthPass from "./components/AuthPass"
import AuthError from "./components/AuthError"
import AuthBtnAuth from "./components/AuthBtnAuth"

export default function AuthSignin() {
    const { success, error } = useOutletContext()

    const {
        changeIsAuth,
        changeUserId,
        changeAccessToken,
        changeRefreshToken
    } = useEplayer()

    const queryClient = useQueryClient()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const [errorValue, setErrorValue] = useState('')
    const navigate = useNavigate()

    const {mutate, isPending} = useMutation({
        mutationKey: ['signin'],
        mutationFn: (dto) => authService.signin(dto),
        onSuccess: (data) => {
            console.log(data)
            changeUserId(data.id)
            changeAccessToken(data.access_token)
            changeRefreshToken(data.refresh_token)
            changeIsAuth(true)
            queryClient.setQueryData(['user'], data)
            success("Успешный вход")
            setTimeout(() => {
                navigate('/')
            }, 1000)
        },
        onError: (e) => {
            error(e.response?.data?.message || e.message || "Ошибка")
            // setErrorValue(e.response?.data?.message || e.message || "Ошибка")
        }
    })

    return (
        <>
          <div className={style.AppAuth__Auth}>
            <div className={style.AppAuth__Auth__Container}>
                <p className={style.AppAuth__Auth__Container__Title}>
                    Авторизация
                </p>
                <AuthEmail emailRef={emailRef} />
                <AuthPass passwordRef={passwordRef} />
                <AuthError errorValue={errorValue} />
                <AuthBtnAuth
                    mutate={mutate}
                    isPending={isPending}
                    setErrorValue={setErrorValue}
                    emailRef={emailRef}
                    passwordRef={passwordRef}
                />
                <div className={style.AppAuth__Auth__Container__OtherLinks}>
                    <span>
                        Нет аккаунта?
                        <Link
                            to={'/auth/reg'}
                        >
                            Зарегистрироваться
                            <MoveRight />
                        </Link>
                    </span>
                </div>
            </div>
          </div>
        </>
    )
}
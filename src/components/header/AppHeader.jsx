import { Link, Navigate, useLocation, useNavigate } from "react-router";
import style from './appHeader.module.scss';
import logo from '../../assets/images/logo.svg';
import searchButton from '../../assets/images/searchButton.svg';
import userDefaultAvatar from '../../assets/images/userDefaultAvatar.svg';
import settingImg from '../../assets/images/settings.svg';
import outAccount from '../../assets/images/outAccount.svg';
import enterAccount from '../../assets/images/enterAccount.svg'
import { useEplayer } from "../../context/eplayer-context";
import { useQuery } from "@tanstack/react-query";
import { authService } from "../../services/auth.service";
import { useEffect, useRef, useState } from "react";

export default function AppHeader() {
    const {
        isAuth,
        userId,
        access_token,
        refresh_token,
        changeIsAuth,
        changeUserId,
        changeAccessToken,
        changeRefreshToken,
        searchQuery,
        changeSearchQuery
    } = useEplayer()
    const {Loading, data, isError, error, isSuccess, refetch} = useQuery({
        queryKey: ['user profile: ', userId],
        queryFn: () => authService.profile(access_token, refresh_token. changeAccessToken),
        enabled: false,
    })
    const navigate = useNavigate()
    const location = useLocation()
    const [isAvatarMenu, setIsAavatarMenu] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if (!isAuth) return

        refetch()
    }, [isAuth])

    function exitAcc() {
        changeIsAuth(false)
        changeUserId(null)
        changeAccessToken('')
        changeRefreshToken('')
        setIsAavatarMenu(false)
        navigate('/')
    }

    const handleSearch = () => {
        if (!inputRef.current
            || !inputRef.current.value
        ) {
            return
        }

        changeSearchQuery(inputRef.current.value.trim())

        const text = inputRef.current.value
            .trim()
            .split(' ')
            .join('+')

        navigate(`/search?text=${text}`)
    }

    return (
        <>
            <div className={style.AppHeader}>
                <div className={style.AppHeader__Container}>
                    <div className={style.AppHeader__Container__Logo}>
                        <Link
                            to={"/"}
                            className={style.AppHeader__Container__Logo__Link}
                        >
                            <img src={logo} alt="Лого" />
                            <span>Эмиль Плейер</span>
                        </Link>
                    </div>

                    <div className={style.AppHeader__Container__Search}>
                        <label htmlFor="search" className={style.AppHeader__Container__Search__Label}>
                            <input
                                ref={inputRef}
                                type="text"
                                name="search"
                                id="search"
                                defaultValue={searchQuery}
                                className={style.AppHeader__Container__Search__Label__InputField}
                            />
                            <button
                                type="button"
                                onClick={handleSearch}
                                className={style.AppHeader__Container__Search__Label__InputButton}
                            >
                                <img src={searchButton} alt="Поиск" />
                            </button>
                        </label>
                    </div>

                    { isAuth ? (
                        <div className={style.AppHeader__Container__Avatar}>
                            <img src={
                                    userDefaultAvatar || data.avatar
                                }
                                alt="Аватарка"
                                className={style.AppHeader__Container__Avatar__Img}
                                onClick={() => setIsAavatarMenu(!isAvatarMenu)}
                            />

                            { isAvatarMenu && (
                                <div className={style.AppHeader__Container__Avatar__Menu}>
                                    <Link to={"/settings"}>
                                        <img src={settingImg} alt="Настройки" />
                                        <span>Настройки</span>
                                    </Link>
                                    <button
                                        type="button"
                                        className={style.AppHeader__Container__Avatar__Menu__ButtonOut}
                                        onClick={() => exitAcc()}
                                    >
                                        <img src={outAccount} alt="Выход" />
                                        <span>Выход</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ): (
                        <div className={style.AppHeader__Container__EnterAccount}>
                            <Link
                                to={"/auth"}
                                className={style.AppHeader__Container__EnterAccount__Link}
                            >
                                <img src={enterAccount} alt="Вход" />
                                <p>Войти</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

    // return (
    //     <>
    //         <div>Шапка сайта</div>
    //         <Link to={"/auth"}>Авторизоваться</Link>
    //     </>
    // )
}
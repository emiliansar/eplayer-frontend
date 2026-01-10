import { Link } from "react-router"
import { useEplayer } from "@/context/eplayer-context"
import style from './appSider.module.scss'
// import settingImg from '../../assets/images/settings.svg';
// import outAccount from '../../assets/images/outAccount.svg';

export default function SiderMenu() {
    const { isAuth } = useEplayer()

    return (
        <>
            <div className={style.AppSider__Avatar__Menu}>
                {isAuth ? (
                    <>
                        <Link
                            to={"/settings"}
                            className={style.AppSider__Avatar__Menu__Settings}
                        >
                            <img src='/assets/images/settings.svg' alt="Настройки" />
                            <span>Настройки</span>
                        </Link>
                        <button
                            type="button"
                            className={style.AppSider__Avatar__Menu__ButtonOut}
                            onClick={() => exitAcc()}
                        >
                            <img src='/assets/images/outAccount.svg' alt="Выход" />
                                <span>Выход</span>
                        </button>
                    </>
                ): (
                    <>
                        <Link
                            to={"/settings"}
                            className={style.AppSider__Avatar__Menu__Settings}
                        >
                            <img src='/assets/images/settings.svg' alt="Настройки" />
                            <span>Настройки</span>
                        </Link>
                        <Link
                            className={style.AppSider__Avatar__Menu__ButtonOut}
                            to={"/auth"}
                        >
                            <img src='/assets/images/outAccount.svg' alt="Выход" />
                            <span>Вход</span>
                        </Link>
                    </>
                )}
            </div>
        </>
    )
}
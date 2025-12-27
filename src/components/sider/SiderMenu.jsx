import { Link } from "react-router"
import { useEplayer } from "../../context/eplayer-context"
import style from './appSider.module.scss'
import settingImg from '../../assets/images/settings.svg';
import outAccount from '../../assets/images/outAccount.svg';

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
                            <img src={settingImg} alt="Настройки" />
                            <span>Настройки</span>
                        </Link>
                        <button
                            type="button"
                            className={style.AppSider__Avatar__Menu__ButtonOut}
                            onClick={() => exitAcc()}
                        >
                            <img src={outAccount} alt="Выход" />
                                <span>Выход</span>
                        </button>
                    </>
                ): (
                    <>
                        <Link
                            to={"/settings"}
                            className={style.AppSider__Avatar__Menu__Settings}
                        >
                            <img src={settingImg} alt="Настройки" />
                            <span>Настройки</span>
                        </Link>
                        <Link
                            className={style.AppSider__Avatar__Menu__ButtonOut}
                            to={"/auth"}
                        >
                            <img src={outAccount} alt="Выход" />
                            <span>Вход</span>
                        </Link>
                    </>
                )}
            </div>
        </>
    )
}
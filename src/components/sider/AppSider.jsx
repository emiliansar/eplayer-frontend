import { Link, useNavigate } from "react-router";
import style from './appSider.module.scss';
// import history from '../../assets/images/history.svg';
// import playlists from '../../assets/images/playlists.svg';
// import uploadFile from '../../assets/images/uploadFile.svg';
import { useState } from "react";
import { useEplayer } from "@/context/eplayer-context";
// import userDefaultAvatar from '../../assets/images/userDefaultAvatar.svg';
// import settingImg from '../../assets/images/settings.svg';
// import outAccount from '../../assets/images/outAccount.svg';
import SiderMenu from "./SiderMenu";
import { ConfigProvider, Popover } from 'antd';

export default function AppSider() {
    const [isAvatarMenu, setIsAavatarMenu] = useState(false)
    const {isAuth, changeIsAuth, changeAccessToken, changeRefreshToken, changeUserId} = useEplayer()
    const navigate = useNavigate()

    function exitAcc() {
        changeIsAuth(false)
        changeUserId(null)
        changeAccessToken('')
        changeRefreshToken('')
        setIsAavatarMenu(false)
        navigate('/')
    }

    return (
        <>
            <div className={style.AppSider}>
                <div className={style.AppSider__Container}>
                    <p className={style.AppSider__Container__Title}>
                        Вы
                    </p>
                    <div className={style.AppSider__Container__Nav}>
                        <Link
                            to={"/history"}
                            className={style.AppSider__Container__Nav__Link}
                        >
                            <img src='/assets/images/history.svg' alt="История" />
                            <p>История</p>
                        </Link>
                        <Link
                            to={"/playlists"}
                            className={style.AppSider__Container__Nav__Link}
                        >
                            <img src='/assets/images/playlists.svg' alt="Плейлисты" />
                            <p>Плейлисты</p>
                        </Link>
                        <Link
                            to={"/upload-file"}
                            className={style.AppSider__Container__Nav__Link}
                        >
                            <img src='/assets/images/uploadFile.svg' alt="Загрузить свой файл" />
                            <p>Загрузить</p>
                        </Link>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgElevated: '#1e1e1e',
                                    boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, .3), 0 3px 6px -4px rgba(0, 0, 0, .3), 0 9px 28px 8px rgba(0, 0, 0, .3)'
                                },
                            }}
                        >
                            <Popover
                                content={<SiderMenu />}
                                trigger="click"
                            >
                                <div className={`${style.AppSider__Container__Nav__Link} ${style.AppSider__Avatar}`}>
                                        <img src={
                                                '/assets/images/userDefaultAvatar.svg' || data.avatar
                                            }
                                            alt="Аватарка"
                                            className={style.AppSider__Avatar__Img}
                                        />
                                </div>
                            </Popover>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </>
    )
}
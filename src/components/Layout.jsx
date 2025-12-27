import { Outlet } from "react-router";
import AppHeader from "./header/AppHeader";
import AppSider from "./sider/AppSider";
import style from './layout.module.scss'
import ListenControl from "./control/ListenControl";

export default function Layout() {
    const ListenControlStyle = {
        position: 'fixed',
        bottom: 0,
        left: '250px',
        width: '100%',
        zIndex: 10,
        backgroundColor: '#1e1e1e'
    }

    return (
        <>
            <div className={style.Layout}>
                <AppHeader />
                <div className={style.Layout__Sub}>
                    <div className={style.Layout__Sub__Sider}>
                        <AppSider />
                    </div>
                    <div className={style.Layout__Sub__Outlet}>
                        <div className={style.Layout__Sub__Outlet__Content}>
                            <Outlet />
                        </div>
                        <div className={style.Layout__Sub__Outlet__ListenControl}>
                            <ListenControl />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
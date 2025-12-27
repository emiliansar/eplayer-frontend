import { Link } from "react-router";
import openLink from "../../assets/images/openLink.svg";
import style from './pleaseAuth.module.scss'

export default function PleaseAuth() {
    return (
        <>
            <div className={style.PleaseAuth}>
                <p className={style.PleaseAuth__Title}>Авторизуйтесь пожалуйста</p>
                <Link
                    to={"/auth"}
                    className={style.PleaseAuth__Link}
                >
                    <span>Авторизоваться</span>
                    <img src={openLink} alt="Ссылка" />
                </Link>
            </div>
        </>
    )
}
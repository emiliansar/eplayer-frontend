import { useEffect, useState } from "react"
// import { authorService } from "../../../services/author.service"
import { Link, Outlet, useLocation, useSearchParams } from "react-router"
import style from './ContentAuthor.module.scss'
// import userDefaultAvatarImg from '../../../assets/images/userDefaultAvatar.svg'
import AuthorInfo from "./components/AuthorInfo"
import { useAuthor } from "@/context/author-context"

export default function AuthorLayout() {
    const [searchParams, setSearchParams] = useSearchParams()
    const idParam = searchParams.get('id')
    const location = useLocation()

    const { changeAuthorId } = useAuthor()

    useEffect(() => {
        if (idParam && idParam !== 0) {
            changeAuthorId(+idParam)
            console.log(+idParam)
        }
    }, [idParam])

    return (
        <div className={style.Layout}>
            <div className={style.Layout__Container}>
                <div className={style.Layout__DescAccount}>
                    <AuthorInfo />
                </div>
                <div className={style.Layout__Сreativity}>
                    <div className={style.Layout__Сreativity__Links}>
                        <Link
                            to={`/author/tracks?id=${idParam}`}
                            className={`${
                                style.Layout__Сreativity__Links__Item
                            } ${
                                location.pathname === '/author'
                                || location.pathname === '/author/tracks' ?
                                    `${style.Layout__Сreativity__Links__ItemActive}`
                                    : null
                            }`}
                        >
                            Треки
                        </Link>
                        <Link
                            to={`/author/playlists?id=${idParam}`}
                            className={`${
                                style.Layout__Сreativity__Links__Item
                            } ${
                                location.pathname === '/author/playlists' ?
                                    `${style.Layout__Сreativity__Links__ItemActive}`
                                    : null
                            }`}
                        >
                            Плейлисты
                        </Link>
                    </div>
                    <div className={style.Layout__Сreativity__Outlet}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
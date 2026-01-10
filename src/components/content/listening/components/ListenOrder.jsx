import { useMusic } from "@/context/music-context"
import style from '../ContentListening.module.scss'
// import { authorService } from "../../../../services/author.service"
// import { useEffect, useState } from "react"
import OrderItem from "./OrderItem"
// import deleteImg from '../../../../assets/images/delete.svg'

export default function ListenOrder() {
    const { playlist, currentPlaylistId, delOrderPlayback } = useMusic()

    if (Object.keys(playlist).length === 0) {
        return null
    }

    return (
        <div className={style.ListenOrder}>
            <div className={style.ListenOrder__Container}>
                <div className={style.ListenOrder__Top}>
                    <p
                        className={style.ListenOrder__Top__Title}
                    >
                        Очередь
                    </p>
                    { (typeof(currentPlaylistId) !== 'number' || currentPlaylistId === 0) && (
                        <button
                            onClick={delOrderPlayback}
                            className={style.ListenOrder__Top__BtnDelete}
                        >
                            <span>
                                Очистить
                            </span>
                            <img src='/assets/images/delete.svg' />
                        </button>
                    ) }
                </div>
                <div className={style.ListenOrder__List}>
                    {playlist.musicList?.map((item, index) => (
                            <div
                                key={index}
                                className={style.ListenOrder__List__Item}
                            >
                                <OrderItem musicId={item} />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
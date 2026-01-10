// import { useEffect, useState } from "react"
// import { useMusic } from "../../../../context/music-context"
import style from '../ContentListening.module.scss'
// import { useQuery } from "@tanstack/react-query"
// import { authorService } from "../../../../services/author.service"
import InfoPreview from "./music_info/InfoPreview"
import InfoManagement from "./music_info/InfoManagement"
import InfoDesc from "./music_info/InfoDesc"

export default function ListenMusicInfo() {

    return (
        <>
            <div className={style.ListenMusicInfo}>
                <div className={style.ListenMusicInfo__Content}>
                    <InfoPreview />
                    <InfoManagement />
                </div>
                <InfoDesc />
            </div>
        </>
    )
}
import style from './ContentListening.module.scss'
import ListenMusicInfo from './components/ListenMusicInfo'
import ListenOrder from './components/ListenOrder'
import { useSearchParams } from "react-router"
import { useMusic } from "@/context/music-context"
import { useEffect } from "react"
import { useNavigate } from 'react-router'
import ListenError from './components/ListenError'

export default function ContentListening() {
    const [searchParams, setSearchParams] = useSearchParams()
    const mParam = searchParams.get('m')
    const pParam = searchParams.get('p')

    const {
        currentTrackId,
        currentPlaylistId,
        error,
        changeCurrentTrackId,
        changePlaylistId
    } = useMusic()

    const navigate = useNavigate()

    useEffect(() => {
        if (!isNaN(mParam)) {
            changeCurrentTrackId(+mParam)
        }

        if (!isNaN(pParam)) {
            changePlaylistId(+pParam)
        } else {
            changePlaylistId(0)
        }
    }, [mParam, pParam])

    if (error?.statusCode) {
        return <ListenError message={error.message} />
    }

    return (
        <>
            <div className={style.ContentListening}>
                <div className={style.ContentListening__Container}>
                    <div className={style.ContentListening__Wrapper}>
                        <ListenMusicInfo />
                        <ListenOrder />
                    </div>
                </div>
            </div>
        </>
    )
}
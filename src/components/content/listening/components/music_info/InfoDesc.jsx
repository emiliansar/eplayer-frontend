import { useMusic } from "@/context/music-context"
import style from '../../ContentListening.module.scss'

export default function InfoDesc() {
    const { currentTrack } = useMusic()

    return currentTrack?.description && (
        <div className={style.ListenMusicInfo__Desc}>
            <div className={style.ListenMusicInfo__Desc__Wrapper}>
                <p className={style.ListenMusicInfo__Desc__Title}>
                    Описание...
                </p>
                <div className={style.ListenMusicInfo__Desc__Content}>
                    <div className={style.ListenMusicInfo__Desc__Content__MusicDesc}>
                        { currentTrack.description }
                    </div>
                </div>
            </div>
        </div>
    )
}
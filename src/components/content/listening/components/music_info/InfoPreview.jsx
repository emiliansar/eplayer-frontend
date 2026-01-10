import { useMusic } from '@/context/music-context'
import style from '../../ContentListening.module.scss'
// import audioDefaultpreviewImg from '../../../../../assets/images/audioDefaultpreview.jpeg'

export default function InfoPreview() {
    const { currentTrack } = useMusic()

    return (
        <div className={style.ListenMusicInfo__Content__Preview}>
            <img
                className={style.ListenMusicInfo__Content__Preview__Img}
                src={ currentTrack?.preview ? `/api/images/${currentTrack.preview}` : '/assets/images/audioDefaultpreview.jpeg'}
                alt="Обложка"
            />
        </div>
    )
}
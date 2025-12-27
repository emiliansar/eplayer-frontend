import { Popover } from "antd"
import { useMusic } from "../../../../../context/music-context"
import PopoverCurrTrack from "../../../../assistants/popovers/PopoverCurrTrack"
import style from '../../ContentListening.module.scss'
import doubleArrowImg from './../../../../../assets/images/doubleArrow-ReplayOff.svg'
import repeatImg from './../../../../../assets/images/repeat-ReplayPlaylist.svg'
import repeatOneImg from './../../../../../assets/images/repeatOne-ReplayOne.svg'
import repeatOneOnImg from './../../../../../assets/images/repeatOneOn-EndAfterCurrent.svg'
import moreHorizImg from './../../../../../assets/images/moreHoriz.svg'
import headsetOffImg from './../../../../../assets/images/headsetOff.svg'
import headphonesImg from './../../../../../assets/images/headphones.svg'

export default function ManagementMenu() {
    const {
        handlePlayPause,
        isPlaying,
        changeSpeed,
        speed,
        changeReplay,
        replay
    } = useMusic()

    return (
        <div className={style.ListenMusicInfo__Content__Management__Menu}>
            <button
                onClick={handlePlayPause}
                className={style.ListenMusicInfo__Content__Management__Menu__BtnListen}
            >
                <img src={isPlaying ? headsetOffImg : headphonesImg} />
                <span>{ isPlaying ? "Остановить" : "Слушать"}</span>
            </button>
            <button
                onClick={changeSpeed}
                className={style.ListenMusicInfo__Content__Management__Menu__BtnSpeed}
            >
                <span>{speed}X</span>
                <span>Скорость</span>
            </button>
            <button
                onClick={changeReplay}
                className={style.ListenMusicInfo__Content__Management__Menu__BtnReplay}
            >
                {replay === 'off' && (<img src={doubleArrowImg} alt="Повтор" />)}
                {replay === 'replay-playlist' && (<img src={repeatImg} alt="Повтор" />)}
                {replay === 'replay-one' && (<img src={repeatOneImg} alt="Повтор" />)}
                {replay === 'end-after-one' && (<img src={repeatOneOnImg} alt="Повтор" />)}
                <span>
                    { replay === 'off' && "Выкл" }
                    { replay === 'replay-playlist' && "Плейлист" }
                    { replay === 'replay-one' && "Текущее" }
                    { replay === 'end-after-one' && "Выкл посл." }
                </span>
            </button>
            <Popover
                content={<PopoverCurrTrack />}
                title=""
                trigger="click"
                color="#2e2e2e"
            >
                <button
                    className={style.ListenMusicInfo__Content__Management__Menu__BtnMenu}
                >
                    <img src={moreHorizImg} />
                </button>
            </Popover>
        </div>
    )
}
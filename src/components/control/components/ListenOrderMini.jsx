import { useEffect, useState } from 'react'
import style from '../control.module.scss'
import OrderMiniItem from './OrderMiniItem'
// import keyboardDoubleArrowDown from '../../../assets/images/keyboardDoubleArrowDown.svg'
// import keyboardDoubleArrowUp from '../../../assets/images/keyboardDoubleArrowUp.svg'
import { useMusic } from '@/context/music-context'
// import { useLocation } from 'react-router'
export default function ListenOrderMini() {
    const { playlist } = useMusic()
    const [isOpen, setIsOpen] = useState(false)

    if (Object.keys(playlist).length === 0) {
        return null
    }

    return (
        <div className={style.ListenOrderMini}>
            <div
                className={style.ListenOrderMini__Container}
            >
                <div
                    className={style.ListenOrderMini__Section}
                >
                    <div className={style.ListenOrderMini__IsOpen}>
                        <button
                            onClick={() => setIsOpen(prev => !prev)}
                            className={style.ListenOrderMini__IsOpen__Btn}
                        >
                            <span>{ isOpen ? "Свернуть" : "Развернуть" }</span>
                            <img
                                src={ isOpen ? '/assets/images/keyboardDoubleArrowDown.svg'
                                    : '/assets/images/keyboardDoubleArrowUp.svg'
                                }
                            />
                        </button>
                    </div>
                    <div className={`${style.ListenOrderMini__Wrapper} ${ isOpen ? null : style.ListenOrderMini__WrapperDisActive}`}>
                        <ul className={style.ListenOrderMini__Wrapper__List}>
                            { playlist.musicList.map((item, index) => (
                                <li
                                    key={index}
                                    className={style.ListenOrderMini__Wrapper__List__Item}
                                >
                                    <OrderMiniItem musicId={item} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
// PlayListItem.jsx
import { Link } from 'react-router'
import playlistDefaultPreviewImg from '../../../../assets/images/playlistDefaultPreview.jpeg'
import style from '../ContentAuthor.module.scss'

export default function PlItem({ item }) {
    return item?.id && (
        <Link
            to={`/listen?m=${item.musicList?.[0]}&p=${item.id}`}
            className={style.PlItem}
        >
            <div
                className={style.PlItem__Wrapper}
            >
                <div className={style.PlItem__Preview}>
                    <img
                        src={ playlistDefaultPreviewImg }
                        alt="Превью"
                        style={{
                            width: 200,
                        }}
                    />
                </div>
                <div className={style.PlItem__Info}>
                    <p className={style.PlItem__Info__Title}>
                        {item.name}
                    </p>
                </div>
            </div>
        </Link>
    )
}
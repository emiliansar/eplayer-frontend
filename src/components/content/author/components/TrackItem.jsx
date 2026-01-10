import style from '../ContentAuthor.module.scss'
// import audioDefaultpreview from '../../../../assets/images/audioDefaultpreview.jpeg'
import { Link } from 'react-router'

export default function TrackItem({ item }) {
    return item.id && (
        <Link
            to={`/listen?m=${item.id}`}
            className={style.TrackItem}
        >
            <div
                className={style.TrackItem__Wrapper}
            >
                <div className={style.TrackItem__Preview}>
                    <img
                        src={
                            item.preview ? `/api/images/${item.preview}` : '/assets/images/audioDefaultpreview.jpeg'
                        }
                        alt="Превью"
                    />
                </div>
                <div className={style.TrackItem__Info}>
                    <p className={style.TrackItem__Info__Title}>
                        {item.title}
                    </p>
                </div>
            </div>
        </Link>
    )
}
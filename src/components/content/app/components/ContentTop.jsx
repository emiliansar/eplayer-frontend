import style from '../AppContent.module.scss'
import arrowBackImg from '../../../../assets/images/arrowBack.svg'
import arrowForwardImg from '../../../../assets/images/arrowForward.svg'

export default function ContentTop({
    safesSlidePrev,
    safesSlideNext,
    itemCount
}) {
    return (
        <div className={style.AppContent__Wrapper__Block__Audio__Top}>
            <p className={style.AppContent__Wrapper__Block__Audio__Top__Title}>
                Музыка
            </p>
            <div className={style.AppContent__Wrapper__Block__Audio__Top__Menu}>
                <button
                    className={`${style.AppContent__Wrapper__Block__Audio__Top__Menu__Prev}__${itemCount}`}
                    type="button"
                    onClick={safesSlidePrev}
                >
                    <img src={arrowBackImg} alt="Назад" />
                </button>
                <button
                    className={`${style.AppContent__Wrapper__Block__Audio__Top__Menu__Next}__${itemCount}`}
                    type="button"
                    onClick={safesSlideNext}
                >
                    <img src={arrowForwardImg} alt="Вперёд" />
                </button>
            </div>
        </div>
    )
}
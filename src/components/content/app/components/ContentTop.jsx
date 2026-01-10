import style from '../appContent.module.scss'

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
                    <img src='/assets/images/arrowBack.svg' alt="Назад" />
                </button>
                <button
                    className={`${style.AppContent__Wrapper__Block__Audio__Top__Menu__Next}__${itemCount}`}
                    type="button"
                    onClick={safesSlideNext}
                >
                    <img src='/assets/images/arrowForward.svg' alt="Вперёд" />
                </button>
            </div>
        </div>
    )
}
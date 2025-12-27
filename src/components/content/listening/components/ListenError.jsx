import style from '../ContentListening.module.scss'

export default function ListenError({ message }) {
    return (
        <div className={style.ContentListening}>
            <div className={style.ContentListening__Container}>
                <div className={style.ContentListening__Wrapper}>
                    <div
                        style={{
                            textAlign: 'center'
                        }}
                        className={style.ContentListening__Error}
                    >
                        <p
                            className={style.ContentListening__Error__Message}
                            style={{
                                fontSize: 28,
                                fontWeight: 500,
                                color: 'red'
                            }}
                        >
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
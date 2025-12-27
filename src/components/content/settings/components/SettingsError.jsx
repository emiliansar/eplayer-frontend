export default function SettingsError({ message }) {
    return (
        <div className={style.ContentSettings}>
            <div className={style.ContentSettings__Container}>
                <div className={style.ContentSettings__Wrapper}>
                    <p className={style.ContentSettings__Wrapper__Error}>
                        { message }
                    </p>
                </div>
            </div>
        </div>
    )
}
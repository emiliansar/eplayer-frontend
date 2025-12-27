import style from '../contentFormUploads.module.scss'

export default function UploadsDesc({ descRef }) {
    return (
        <div className={style.ContentFormUploads__Wrapper__Form__Desc}>
            <label
                htmlFor="desc"
                className={style.ContentFormUploads__Wrapper__Form__Desc__Label}
            >
                <p>Введите описание</p>
                <input
                    type="text"
                    name="desc"
                    id="desc"
                    maxLength={2000}
                    ref={descRef}
                />
            </label>
        </div>
    )
}
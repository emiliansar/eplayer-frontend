import style from '../contentFormUploads.module.scss'

export default function UploadsName({ nameRef }) {
    return (
        <div className={style.ContentFormUploads__Wrapper__Form__Name}>
            <label
                htmlFor="name"
                className={style.ContentFormUploads__Wrapper__Form__Name__Label}
            >
                <p>Введите название</p>
                <input
                    type="text"
                    name="name"
                    id="name"
                    maxLength={200}
                    ref={nameRef}
                />
            </label>
        </div>
    )
}
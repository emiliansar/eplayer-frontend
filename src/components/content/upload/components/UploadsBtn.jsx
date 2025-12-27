import style from '../contentFormUploads.module.scss'

export default function UploadsBtn({ isPending, uploadForm }) {
    return (
        <div className={style.ContentFormUploads__Wrapper__Form__Upload}>
            <button
                type="button"
                className={`${style.ContentFormUploads__Wrapper__Form__Upload__Btn} ${isPending && (style.ContentFormUploads__Wrapper__Form__Upload__BtnIsPending)}`}
                onClick={() => uploadForm()}
                disabled={isPending}
            >
                Опубликовать
            </button>
        </div>
    )
}
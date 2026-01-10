// import { useRef, useState } from 'react'
import style from '../contentFormUploads.module.scss'
// import uploadImageImg from '../../../../assets/images/uploadImage.svg'

export default function UploadsPreview({
    imageInputRef,
    imagePreviewRef,
    imageFile,
    setImageFile
}) {
    const changeImageInput = (e) => {
        console.log("ChangeImageInput вызван")
        const file = e.target.files[0]
        if (!file) return setImageFile(null)
        setImageFile(file)

        const reader = new FileReader()

        reader.onload = (e) => {
            const imagePreview = imagePreviewRef?.current
            imagePreview.src = e.target.result
            imagePreview.style.display = 'block'
        }

        reader.readAsDataURL(file)
    }

    const clearImageInput = () => {
        const imagePreview = imagePreviewRef?.current
        const imageInput = imageInputRef?.current

        setImageFile(null)
        imageInput.value = null
        imagePreview.src = '#'
        imagePreview.style.display = 'none'
    }

    return (
        <div className={style.ContentFormUploads__Wrapper__Form__Preview}>
            <label
                htmlFor="imageInput"
                className={style.ContentFormUploads__Wrapper__Form__Preview__Label}
            >
                <p
                    className={style.ContentFormUploads__Wrapper__Form__Preview__Label__Title}
                >
                    Загрузите изображение
                </p>
                <input
                    ref={imageInputRef}
                    onChange={(e) => {
                        console.log("imageInput has been changed")
                        changeImageInput(e)
                    }}
                    style={{display: 'none'}}
                    type="file"
                    name="imageFile"
                    id="imageFile"
                    accept='image/jpeg, image/jpg, image/png, image/gif'
                />
                <div className={style.ContentFormUploads__Wrapper__Form__Preview__Label__ExpFile}>
                    {imageFile ? (
                        <>
                            <p className={style.ContentFormUploads__Wrapper__Form__Preview__Label__ExpFile__FileName}>
                                {imageFile.name}
                            </p>
                            <button
                                type="button"
                                className={style.ContentFormUploads__Wrapper__Form__Preview__Label__ExpFile__FileDelete}
                                onClick={clearImageInput}
                            >
                                Удалить изображение
                            </button>
                        </>
                    ): (
                        <button
                            className={style.ContentFormUploads__Wrapper__Form__Preview__Label__ExpFile__BtnUpload}
                            type="button"
                            onClick={() => imageInputRef?.current.click()}
                        >
                            <span>Загрузить изображение</span>
                            <img src='/assets/images/uploadImage.svg' alt="Изображение" />
                        </button>
                    )}
                </div>
            </label>
            <div
                className={style.ContentFormUploads__Wrapper__Form__Preview__Image}
            >
                <img
                    ref={imagePreviewRef}
                    style={{display: 'none'}}
                    src="#"
                    id='previewImage'
                    alt="Изображение"
                />
            </div>
        </div>
    )
}
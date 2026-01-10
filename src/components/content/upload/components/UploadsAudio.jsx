// import { useRef, useState } from 'react'
import style from '../contentFormUploads.module.scss'
// import uploadAudioFileImg from '../../../../assets/images/uploadAudioFile.svg'
// import uploadFileImg from '../../../../assets/images/uploadFile.svg'

export default function UploadsAudio({
    audioFile,
    setAudioFile,
    audioInputRef,
    audioDropZoneRef
}) {
    const changeAudioInput = (e) => {
        const file = e.target.files[0]
        if (!file) return setAudioFile(null)
        setAudioFile(file)
    }

    const dropAudioInput = (e) => {
        const file = e.dataTransfer.files[0]
        if (!file) return setAudioFile(null)
        setAudioFile(file)
    }

    const clearAudioInput = () => {
        const audioInput = audioInputRef.current

        setAudioFile(null)
        audioInput.value = null
    }

    return (
        <div className={style.ContentFormUploads__Wrapper__Form__Audio}>
            <label
                htmlFor="audioInput"
                className={style.ContentFormUploads__Wrapper__Form__Audio__Label}
            >
                <p>Загрузите аудиофайл</p>
                <input
                    ref={audioInputRef}
                    style={{display: 'none'}}
                    onChange={(e) => changeAudioInput(e)}
                    onDragEnter={(e) => changeAudioInput(e)}
                    type="file"
                    name="audioFile"
                    id="audioFile"
                    accept='audio/mpeg, audio/mp3, audio/wav, audio/ogg'
                />
                {audioFile ? (
                    <button
                        type="button"
                        onClick={() => clearAudioInput()}
                    >
                        Удалить
                    </button>
                ): null}
            </label>
            <div
                ref={audioDropZoneRef}
                className={style.ContentFormUploads__Wrapper__Form__Audio__DropZone}
                onDragOver={(e) => {
                    e.preventDefault()
                    audioDropZoneRef.current.style.boxShadow = '2px 2px 5px #9acd32, -2px -2px 5px #9acd32'
                }}
                onDragLeave={() => {
                    audioDropZoneRef.current.style.boxShadow = 'none'
                }}
                onDrop={(e) => {
                    e.preventDefault()
                    audioDropZoneRef.current.style.boxShadow = 'none'
                    dropAudioInput(e)
                }}
                onClick={() => audioInputRef.current.click()}
            >
                { audioFile ? (
                    <>
                        <img src='/assets/images/uploadAudioFile.svg' />
                        <p>{audioFile.name}</p>
                    </>
                ): (
                    <>
                        <img src='/assets/images/uploadFile.svg' />
                        <p>Нажмите чтобы выбрать или перетащите файл</p>
                    </>
                )}
            </div>
        </div>
    )
}
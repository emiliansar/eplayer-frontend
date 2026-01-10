import style from '../ContentPlaylists.module.scss'
// import addImg from '../../../../assets/images/add.svg'
import { useState } from 'react';
import CreatePlaylist from '@/components/assistants/create_playlist/CreatePlaylist';
// import { ConfigProvider, Modal } from 'antd';
// import CreatePlaylistForm from '../../../assistants/create_playlist/CreatePlaylistForm';

export default function PlaylistNew() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                type='button'
                className={style.CreatePlaylist}
                onClick={showModal}
            >
                <div className={style.CreatePlaylist__Content}>
                    <div className={style.CreatePlaylist__Content__Circle}>
                        <img
                            src='/assets/images/add.svg'
                            className={style.CreatePlaylist__Content__Circle__Img}
                        />
                    </div>
                    <p className={style.CreatePlaylist__Content__Text}>
                        Создать
                    </p>
                </div>
            </button>
            <CreatePlaylist
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
            />
        </>
    )
}
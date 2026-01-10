// import CreatePlaylist from '../../create_playlist/CreatePlaylist'
import CreatePlaylist from '@/components/assistants/create_playlist/CreatePlaylist'
import style from '../ListOfPlaylists.module.scss'
// import addImg from '../../../../assets/images/add.svg'
import { useMusic } from '../../../../context/music-context'

export default function PlaylistBtnCreate({
    showModal,
    isModalOpen,
    handleCancel,
    newItem
}) {

    const { currentTrackId } = useMusic()

    return (
        <>
            <button
                onClick={showModal}
                className={`${
                    style.ListOfPlaylists__List__Item__Btn
                    } ${
                    style.ListOfPlaylists__List__Item__CreatePlaylist
                }`}
            >
                <img src='/assets/images/add.svg' />
                <span>Новый</span>
            </button>
            <CreatePlaylist
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                newItem={currentTrackId}
            />
        </>
    )
}
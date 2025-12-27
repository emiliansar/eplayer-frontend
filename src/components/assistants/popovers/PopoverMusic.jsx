import download from '../../../assets/images/download.svg'
import playlistAdd from '../../../assets/images/playlistAdd.svg'
import artist from '../../../assets/images/artist.svg'
import addToOrder from '../../../assets/images/addToOrder.svg'
import shareImg from '../../../assets/images/share.svg'
import moreHoriz from '../../../assets/images/moreHoriz.svg'
import style from './Popover.module.scss'
import { useMusic } from '../../../context/music-context'
import { ConfigProvider, Modal } from 'antd'
import { useEffect, useState } from 'react'
import ListOfPlaylists from '../list_of_playlists/ListOfPlaylists'
import { useNavigate } from 'react-router'
import { message } from 'antd';
import doubleArrow from '../../../assets/images/doubleArrow-ReplayOff.svg'
import repeat from '../../../assets/images/repeat-ReplayPlaylist.svg'
import repeatOne from '../../../assets/images/repeatOne-ReplayOne.svg'
import repeatOneOn from '../../../assets/images/repeatOneOn-EndAfterCurrent.svg'
import PlaylistsModal from '../list_of_playlists/PlaylistsModal'

export default function PopoverMusic({ musicId }) {
    const {
        currentTrackId,
        currentTrack,
        changePlaylist,
        audioRef,
        speed,
        changeSpeed,
        changeReplay,
        replay
    } = useMusic()

    const [messageApi, contextHolder] = message.useMessage();
    const success = (text) => {
        messageApi.open({
            type: 'success',
            content: text,
        });
    };
    const error = (text) => {
        messageApi.open({
            type: 'error',
            content: text,
        });
    };

    const [isFinalRequest, setIsFinalRequest] = useState(false)
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const downloadAudioFile = () => {
        if (!currentTrack.id || !currentTrack.path) return

        return window.open(`/api/music/download/${currentTrack.path}`)
    }

    const handleAuthor = () => {
        navigate(`/author?id=${currentTrack.authorId}`)
    }

    const addToOrderPlayback = () => {
        try {
            changePlaylist(prev => {
                return {
                    ...prev,
                    musicList: [
                        ...new Set([
                            ...(prev.musicList || []),
                            musicId
                        ])
                    ]
                }
            })
            success('Добавлено в очередь')
        } catch (e) {
            throw error(e || 'Ошибка добавления в очередь')
        }
    }

    // const handleShare = () => {
    //     window.prompt(`http://localhost:5173/listen?m=${musicId}`)
    // }

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(`http://localhost:5173/listen?m=${musicId}`);
            success('Текст скопирован в буфер обмена');
        } catch (err) {
            error('Ошибка при копировании: ', err);
        }
    }

    useEffect(() => {
        if (isFinalRequest) {
            Modal.destroyAll()
        }
    }, [isFinalRequest])

    return (
        <div
            className={style.Popover}
        >
            {contextHolder}
            <button
                onClick={downloadAudioFile}
                className={style.Popover__BtnDownload}
            >
                <img src={download} />
                <span>Скачать</span>
            </button>
            <button
                onClick={showModal}
                className={style.Popover__AddToPlaylist}
            >
                <img src={playlistAdd} />
                <span>Добавить в плейлист</span>
            </button>
            <button
                onClick={handleAuthor}
                className={style.Popover__toAuthor}
            >
                <img src={artist} />
                <span>Перейти к исполнителю</span>
            </button>
            <button
                onClick={addToOrderPlayback}
                className={style.Popover__AddToOrderPlayback}
            >
                <img src={addToOrder} />
                <span>Добавить в очередь</span>
            </button>
            <button
                onClick={handleShare}
                className={style.Popover__Share}
                title='Поделиться'
            >
                <img
                    src={shareImg}
                    alt="Поделиться"
                />
                <span>Поделиться</span>
            </button>

            {/* <ConfigProvider
            theme={{
                    components: {
                    Modal: {
                        contentBg: '#1e1e1e',
                        headerBg: '#1e1e1e',
                        titleColor: '#fff'
                    },
                },
            }}
            >
                <Modal
                    title="Выберите плейлист"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <ListOfPlaylists setIsFinalRequest={setIsFinalRequest} musicId={musicId}  />
                </Modal>
            </ConfigProvider> */}
            <PlaylistsModal
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                setIsFinalRequest={setIsFinalRequest}
            />
        </div>
    )
}
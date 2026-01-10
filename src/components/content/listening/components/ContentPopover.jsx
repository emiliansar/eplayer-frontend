// import download from '../../../../assets/images/download.svg'
// import playlistAdd from '../../../../assets/images/playlistAdd.svg'
// import artist from '../../../../assets/images/artist.svg'
// import addToOrder from '../../../../assets/images/addToOrder.svg'
// import moreHoriz from '../../../../assets/images/moreHoriz.svg'
// import style from '../ContentListening.module.scss'
// import { useMusic } from '../../../../context/music-context'
// import { ConfigProvider, Modal } from 'antd'
// import { useEffect, useState } from 'react'
// import ListOfPlaylists from './ListOfPlaylists'
// import { useNavigate } from 'react-router'
// import { message } from 'antd';
// import doubleArrow from '../../../../assets/images/doubleArrow-ReplayOff.svg'
// import repeat from '../../../../assets/images/repeat-ReplayPlaylist.svg'
// import repeatOne from '../../../../assets/images/repeatOne-ReplayOne.svg'
// import repeatOneOn from '../../../../assets/images/repeatOneOn-EndAfterCurrent.svg'

// export default function ContentPopover() {
//     const { currentTrackId, currentTrack, changePlaylist, audioRef, speed, changeSpeed, changeReplay, replay } = useMusic()

//     const [messageApi, contextHolder] = message.useMessage();
//     const success = () => {
//         messageApi.open({
//             type: 'success',
//             content: 'Добавлено в очередь',
//         });
//     };
//     const error = (e) => {
//         messageApi.open({
//             type: 'error',
//             content: e || 'Ошибка добавления в очередь',
//         });
//     };

//     const [isFinalRequest, setIsFinalRequest] = useState(false)
//     const navigate = useNavigate()

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//     const handleOk = () => {
//         setIsModalOpen(false);
//     };
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };

//     const downloadAudioFile = () => {
//         if (!currentTrack.id || !currentTrack.path) return

//         return window.open(`/api/music/download/${currentTrack.path}`)
//     }

//     const handleAuthor = () => {
//         navigate(`/author?id=${currentTrack.authorId}`)
//     }

//     const addToOrderPlayback = () => {
//         try {
//             changePlaylist(prev => {
//                 return {
//                     ...prev,
//                     // musicList: [
//                     //     ...(prev.musicList || []),
//                     //     currentTrackId
//                     // ],
//                     musicList: [
//                         ...new Set([
//                             ...(prev.musicList || []),
//                             currentTrackId
//                         ])
//                     ]
//                 }
//             })
//             success()
//         } catch (e) {
//             throw error(e)
//         }
//     }

//     const handleChangeSpeed = () => {
//         if (audioRef.current) {
//             if (speed === 0.5) {
//                 changeSpeed(1.0)
//             }

//             if (speed === 1.0) {
//                 changeSpeed(1.5)
//             }

//             if (speed === 1.5) {
//                 changeSpeed(2.0)
//             }

//             if (speed === 2.0) {
//                 changeSpeed(0.5)
//             }
//         }
//     }

//     useEffect(() => {
//         if (isFinalRequest) {
//             Modal.destroyAll()
//         }
//     }, [isFinalRequest])

//     return (
//         <div
//             className={style.Popover}
//         >
//             <button
//                 onClick={handleChangeSpeed}
//                 className={style.Popover__BtnSpeed}
//             >
//                 <span>{speed}X</span>
//                 <speed>Скорость</speed>
//             </button>
//             <button
//                 onClick={changeReplay}
//                 className={style.Popover__BtnReplay}
//             >
//                 {replay === 'off' && (<img src={doubleArrow} alt="Повтор" />)}
//                 {replay === 'replay-playlist' && (<img src={repeat} alt="Повтор" />)}
//                 {replay === 'replay-one' && (<img src={repeatOne} alt="Повтор" />)}
//                 {replay === 'end-after-one' && (<img src={repeatOneOn} alt="Повтор" />)}
//                 <span>
//                     { replay === 'off' && "Выкл" }
//                     { replay === 'replay-playlist' && "Плейлист" }
//                     { replay === 'replay-one' && "Текущее" }
//                     { replay === 'end-after-one' && "Выкл посл." }
//                 </span>
//             </button>
//             {contextHolder}
//             <button
//                 onClick={downloadAudioFile}
//                 className={style.Popover__BtnDownload}
//             >
//                 <img src={download} />
//                 <span>Скачать</span>
//             </button>
//             <button
//                 onClick={showModal}
//                 className={style.Popover__AddToPlaylist}
//             >
//                 <img src={playlistAdd} />
//                 <span>Добавить в плейлист</span>
//             </button>
//             <button
//                 onClick={handleAuthor}
//                 className={style.Popover__toAuthor}
//             >
//                 <img src={artist} />
//                 <span>Перейти к исполнителю</span>
//             </button>
//             <button
//                 onClick={addToOrderPlayback}
//                 className={style.Popover__AddToOrderPlayback}
//             >
//                 <img src={addToOrder} />
//                 <span>Добавить в очередь</span>
//             </button>

//             <ConfigProvider
//             theme={{
//                     components: {
//                     Modal: {
//                         contentBg: '#1e1e1e',
//                         headerBg: '#1e1e1e',
//                         titleColor: '#fff'
//                     },
//                 },
//             }}
//             >
//                 <Modal
//                     title="Выберите плейлист"
//                     closable={{ 'aria-label': 'Custom Close Button' }}
//                     open={isModalOpen}
//                     onOk={handleOk}
//                     onCancel={handleCancel}
//                 >
//                     <ListOfPlaylists setIsFinalRequest={setIsFinalRequest} />
//                 </Modal>
//             </ConfigProvider>
//         </div>
//     )
// }
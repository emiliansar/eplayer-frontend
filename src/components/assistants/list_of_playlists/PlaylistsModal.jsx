import { ConfigProvider, Modal } from "antd";
import ListOfPlaylists from "./ListOfPlaylists";

export default function PlaylistsModal({
    isModalOpen,
    handleCancel,
    setIsFinalRequest,
    musicId
}) {
    return (
        <ConfigProvider
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
        </ConfigProvider>
    )
}
import { ConfigProvider, Modal } from "antd";
import CreatePlaylistForm from "./CreatePlaylistForm";

export default function CreatePlaylist({
    isModalOpen,
    handleCancel,
    newItem
}) {
    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            contentBg: '#1e1e1e'
                        },
                    },
                }}
            >
                <Modal
                    closable
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <CreatePlaylistForm newItem={newItem} />
                </Modal>
            </ConfigProvider>
        </>
    )
}
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import style from '../ContentPlaylists.module.scss'

export default function PlaylistLoading() {
    return (
        <div className="spin">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
    )
}
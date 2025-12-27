import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function HistoryLoading() {
    return (
        <div className="spin">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
    )
}
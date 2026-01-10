import { Spin } from 'antd'
import style from '../contentSettings.module.scss'
import { LoadingOutlined } from '@ant-design/icons'

export default function SettingsLoading() {
    return (
        <div className={style.ContentSettings}>
            <div className={style.ContentSettings__Container}>
                <div className={style.ContentSettings__Wrapper}>
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </div>
            </div>
        </div>
    )
}
import { Switch } from 'antd'
import style from '../CreatePlaylist.module.scss'

export default function FormAccess({
    onChangeAccess,
    access
}) {
    return (
        <div
            className={style.CreatePlaylistForm__Field}
        >
            <span>Доступ:
                <span>
                    {access ? 'открый' : 'закрытый'}
                </span>
            </span>
            <Switch
                defaultChecked
                onChange={onChangeAccess}
                defaultValue={access}
            />
        </div>
    )
}
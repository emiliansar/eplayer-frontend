import style from '../ContentAuthor.module.scss'
// import userDefaultAvatarImg from '../../../../assets/images/userDefaultAvatar.svg'
import { useAuthor } from '@/context/author-context'

export default function AuthorInfo() {
    const { author } = useAuthor()

    return author?.id && (
        <div className={style.AuthorInfo}>
            <div className={style.AuthorInfo__Container}>
                <div className={style.AuthorInfo__Wrapper}>
                    <div className={style.AuthorInfo__DescAcc}>
                        <div className={style.AuthorInfo__DescAcc__Preview}>
                            <img
                                src='/assets/images/userDefaultAvatar.svg'
                                alt="Аватар"
                            />
                        </div>
                        <div className={style.AuthorInfo__DescAcc__Info}>
                            <p className={style.AuthorInfo__DescAcc__Info__Name}>
                                { author.name }
                            </p>
                            { author.id && (
                                <p className={style.AuthorInfo__DescAcc__Info__Desc}>
                                    { author.description }
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import './index.sass'
import Button from '@mui/material/Button'


export const Header = () => {
    return <div className=''>
        <div>
            log
        </div>
        <UserInfo />
    </div>
}

export const UserInfo = () => {
    return <div className='userInfo'>
        <div>
            icon
        </div>
        <div className='user'>
            <Button className='button'>login</Button>
            <Button className='button'>register</Button>
        </div>
    </div>
}
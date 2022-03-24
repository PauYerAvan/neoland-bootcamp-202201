import './FollowButton.sass'
import { useState, useEffect } from 'react'
import { toggleFollowUser } from '../../../logic'
import { FollowIcon } from '../../icons'
import { Button } from '.'

export function FollowButton({ userId, isFollow = false }) {
    const [follow, setFollow] = useState(isFollow)

    const toggleFollow = async () => {
        try {
            await toggleFollowUser(sessionStorage.token, userId)

            setFollow(!follow)

        } catch (error) {
            alert(error.message)
        }
    }

    const onToggle = event => {
        event.preventDefault()
        toggleFollow()
    }

    return <>
        <Button type="button" onClick={onToggle}>
            <FollowIcon className={`follow-icon ${follow ? 'follow-full' : 'follow-empty'}`}/>
        </Button>
    </>
}
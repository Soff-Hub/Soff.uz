import React, { useEffect, useState } from 'react'
import { useSocket } from './useSocket'

export default function useNotifications() {
    const [notifications, setNofitications] = useState({})

    const socket = useSocket()

    useEffect(() => {
        const handleNotifications = (ntfs) => {
            setNofitications(ntfs)
        }

        // socket.onopen()

    }, [])

    return notifications
}

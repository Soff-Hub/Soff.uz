import React, { useState } from 'react'
import styles from './style.module.scss'
import CreateOrderModal from '../../../../shared/components/modals/CreateOrderModal'
import AuthModal from '~/components/AuthModal'
import { useSelector } from 'react-redux'

const ServiceFirstCard = () => {
    const [ open, setOpen ] = useState(false)
    const [ isOpen, setIsOpen ] = useState(false)
    const { isLoggedIn } = useSelector(state => state.auth)

    const handleOrder = () => {
        if(isLoggedIn){
            setOpen(true)
        }else{
            setIsOpen(true)
        }
    }

    return (
        <>
            <AuthModal 
                open={isOpen} 
                onClose={() => setIsOpen(false)}
                onSuccess={() => {
                    setOpen(true)
                }}
            />
            <CreateOrderModal open={open} onClose={() => setOpen(false)}/>
            <div className={styles.card}>
                <h3 className={styles.title}>Ishingizni frilanserlarga topshiring.</h3>
                <button onClick={handleOrder} className={styles.btn}>Hoziroq buyurtma berish</button>
            </div>
        </>
    )
}

export default ServiceFirstCard
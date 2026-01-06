import { Button } from 'antd';
import styles from './style.module.scss';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { MessageOutlined } from '@ant-design/icons';
import { useCreateChat } from '~/features/freelancers/chat/api/useCreateChat';
import { useSelector } from 'react-redux';
import { sleep } from '~/shared/utilities/sleep';
import ServiceOrderModal from '../ServiceOrderModal';

const StickyBox = ({ data }) => {
    const { mutate: createChat } = useCreateChat();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const handleCreateChat = ({ setAuthOpen, setActionTracker }) => {
        if (isLoggedIn) {
            createChat(data?.user[0]?.soff_seller_id);
        } else {
            setAuthOpen(true);
            setActionTracker('createChat');
        }
    };

    const handlePayment = ({ setModalOpen, setAuthOpen, setActionTracker }) => {
        if (isLoggedIn) {
            setModalOpen(true);
        } else {
            setAuthOpen(true);
            setActionTracker('payment');
        }
    };

    const handleAuthSuccess = async ({ actionTracker, setModalOpen }) => {
        await sleep(200);
        switch (actionTracker) {
            case 'createChat':
                createChat(data?.user[0]?.soff_seller_id);
                break;
            case 'payment':
                setModalOpen(true);
                break;
        }
    };

    return (
        <ServiceOrderModal handleAuthSuccess={handleAuthSuccess} order={data}>
            {({ setAuthOpen, setActionTracker, setModalOpen }) => (
                <div className={styles.stickyBox}>
                    <div className={styles.wrapper}>
                        <Button
                            type="default"
                            icon={<MessageOutlined />}
                            className={styles.customBtn}
                            onClick={() =>
                                handleCreateChat({
                                    setAuthOpen,
                                    setActionTracker,
                                })
                            }>
                            <span className={styles.chatTitle}>Chat</span>
                        </Button>

                        <Button
                            type="primary"
                            className={`${styles.customBtn} ${styles.customBtnShine} ${styles.customBtnGlow}`}
                            onClick={() =>
                                handlePayment({
                                    setModalOpen,
                                    setAuthOpen,
                                    setActionTracker,
                                })
                            }>
                            Buyurtma berish (
                            {formatCurrencyWithSpace(data?.price)} so'm)
                        </Button>
                    </div>
                </div>
            )}
        </ServiceOrderModal>
    );
};

export default StickyBox;

import { Skeleton, Alert } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import api from '~/shared/api/api';
import { useQuery } from '@tanstack/react-query';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import { FaArrowRight } from 'react-icons/fa6';

export default function NotificationList() {
    const { user } = useSelector((state) => state.auth);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notifications', user?.access],
        queryFn: async () => {
            const { data } = await api.get('api/v1/seller/user-notification/');
            return data;
        },
        enabled: !!user?.access,
    });

    const hasNotifications = data?.results?.length > 0;

    let notificationContent = (
        <Alert message="Yangiliklar hozircha yo‘q!" type="warning" showIcon />
    );

    if (isLoading) {
        notificationContent = Array(3)
            .fill(null)
            .map((_, i) => (
                <Skeleton
                    key={i}
                    active
                    paragraph={{ rows: 2 }}
                    className="mb-3"
                />
            ));
    } else if (isError) {
        notificationContent = (
            <Alert
                message={'Xatolik yuz berdi, qayta urinib ko‘ring!'}
                type="error"
                showIcon
            />
        );
    } else if (hasNotifications) {
        notificationContent = (
            <div className="text-start">
                {data.results.map((el, i) => (
                    <Notification
                        key={el.id || i}
                        notification={el?.notification}
                        link={el?.link}
                        index={i}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className=" ps-whishlist">
            <div className="container mb-5">
                <h1 className="page-title mt-5">Bildirishnomalar</h1>
                <SidebarLayout>
                    <div className="ps-section__content">
                        {notificationContent}
                    </div>
                </SidebarLayout>
            </div>
        </div>
    );
}

const Notification = ({ notification, link, index }) => {
    const { title, created_at, body } = notification || {};
    return (
        <div className="border shadow-sm mb-4 bg-success-subtle rounded-4 p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className="fs-4 fw-bold mb-2">
                    {index + 1}. {title}{' '}
                </h3>
                <small className="text-muted">
                    {new Date(created_at).toLocaleDateString('uz-UZ')}
                </small>
            </div>

            {body && (
                <div
                    className="m-0 text-dark-emphasis mb-3"
                    dangerouslySetInnerHTML={{ __html: body }}></div>
            )}

            {link && (
                <div className="text-end">
                    <Link href={link || '#'}>
                        <a
                            target="_blank"
                            className="btn btn-success rounded-pill fs-5 px-4 py-1">
                            Batafsil{' '}
                            <FaArrowRight
                                style={{
                                    marginLeft: '3px',
                                }}
                            />
                        </a>
                    </Link>
                </div>
            )}
        </div>
    );
};

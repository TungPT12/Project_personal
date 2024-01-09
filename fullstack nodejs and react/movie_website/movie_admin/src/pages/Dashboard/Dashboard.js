import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import InfoBoard from '../../components/InfoBorad/InfoBoard';
import formatPrice from '../../utils/FormatPrice';
import styles from './Dashboard.module.css'
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js';
import { faUser, faCartShopping, faDollar } from '@fortawesome/free-solid-svg-icons';
import { getNewOrdersApi } from '../../apis/order.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authnAction } from '../../stores/slice/authn.js';
import { checkIsLoginApi } from '../../apis/authn.js';

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, isAuthn } = useSelector(state => state.authn)
    const [isLoading, setIsLoading] = useState(true);
    const [newOrders, setNewOrders] = useState({
        countNewOrders: 0,
        earningInMonth: 0,
        results: []
    });
    const [count, setCount] = useState(0)

    const getNewOrders = () => {
        getNewOrdersApi(token).then((response) => {
            if (response.status === 500) {
                throw new Error('/500');
            }
            if (response.status === 400) {
                throw new Error('/400');
            }
            if (response.status === 404) {
                throw new Error('/404');
            }
            if (response.status === 403 || response.status === 401) {
                dispatch(authnAction.logout());
                throw new Error(response.data.message);
            }
            return response.data;
        }).then((data) => {
            setNewOrders(data)
            setIsLoading(false);
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                navigate('/admin/signin')
            }
        })
    }

    // const getCountUsers = () => {
    //     getUserCountAdminApi(token).then((response) => {
    //         if (response.status === 500) {
    //             throw new Error('/500');
    //         }
    //         if (response.status === 400) {
    //             throw new Error('/400');
    //         }
    //         if (response.status === 404) {
    //             throw new Error('/404');
    //         }
    //         if (response.status === 403 || response.status === 401) {
    //             dispatch(authnAction.logout());
    //             throw new Error(response.data.message);
    //         }
    //         return response.data;
    //     }).then((data) => {
    //         setCount(data.totalUser)
    //         setIsLoading(false);
    //     }).catch((error) => {
    //         if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
    //             navigate(error.message)
    //         } else {
    //             navigate('/admin/signin')
    //         }
    //     })
    // }

    const checkIsLogin = () => {
        checkIsLoginApi().then((response) => {
            if (response.status === 500) {
                throw new Error('/500');
            }
            if (response.status === 400) {
                throw new Error('/400');
            }
            if (response.status === 404) {
                throw new Error('/404');
            }
            if (response.status === 403 || response.status === 401) {
                throw new Error(response.data.message);
            }
            return response.data;
        }).then((data) => {
            dispatch(authnAction.login(data))
        }).catch((error) => {
            if (error.message === '/500' || error.message === '/400' || error.message === '/404') {
                navigate(error.message)
            } else {
                dispatch(authnAction.logout())
                navigate('/admin/signin')
            }
        })
    }

    const renderOrders = (orders) => {
        return orders.map((order, index) => {
            return <div key={order._id} className={`${styles['body-row']} bg-row-even d-flex ${index % 2 === 0 ? 'bg-row-even' : ''}`}>
                <div className={`${styles['id']} f-4  ps-2 text-ellipsis`}>
                    <p className="text-ellipsis m-0">{order.user}</p>
                </div>
                <div className={`${styles['name']} f-4  ps-2 text-ellipsis`}>{order.name}</div>
                <div className={` f-2  ps-2`}>
                    {order.phone}
                </div>
                <div className={`f-2 t ps-2`}>
                    {order.address}
                </div>
                <div className={`${styles['image']} f-2 ps-2`}>
                    {formatPrice(order.totalPrice.toString())}
                </div>
                <div className={`${styles['image']} text-capitalize f-2  ps-2`}>
                    {order.delivery.toLowerCase() === 'waiting' ? 'Chưa vận chuyển'
                        : order.delivery.toLowerCase() === 'Đang vận chuyển' ? 'Delivering' : 'đã giao'}
                </div>
                <div className={`${styles['image']} text-capitalize f-2  ps-2`}>
                    {order.status ? "chưa thanh toán" : "đã thanh toán"}
                </div>
                {/* <div className='f-1 text-capitalize ps-2'>
                    <ButtonLink
                        title="view"
                        link={`/admin/order/${order._id}`}
                    />

                </div> */}
            </div>
        })
    }

    useEffect(() => {
        if (!isAuthn) {
            checkIsLogin();
        } else {
            getNewOrders();
            // getCountUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            {
                isAuthn ? (
                    isLoading ? <LoadingSpinner /> : <>
                        <div className={`d-flex gap-2`}>
                            <InfoBoard
                                title="users"
                                statistical={count}
                                styleIcon='icon-user'
                                icon={faUser}
                            />
                            <InfoBoard
                                title="Earnings of Month"
                                statistical={`${formatPrice(newOrders.earningInMonth.toString())} VND`}
                                styleIcon='icon-earning'
                                icon={faDollar}
                            />
                            <InfoBoard
                                title="New Order"
                                statistical={newOrders.countNewOrders}
                                styleIcon='icon-order'
                                icon={faCartShopping}
                            />
                        </div>
                        <div className='mt-2'>
                            <Card>
                                <div className='px-2'>
                                    <h3 className={`${styles['title']} pe-3 pt-3 pb-2 mb-0 text-capitalize`}>last transactions</h3>
                                    <div className={`${styles['table']}`}>
                                        <div className={`${styles['header-table']}`}>
                                            <div className={`${styles['header-row']} d-flex`}>
                                                <div className='f-4 ps-2 text-ellipsis'>ID User</div>
                                                <div className='f-4 text-capitalize ps-2 text-ellipsis'>name</div>
                                                <div className='f-2 text-capitalize ps-2'>phone</div>
                                                <div className='f-2 text-capitalize ps-2'>address</div>
                                                <div className='f-2 text-capitalize ps-2'>total</div>
                                                <div className='f-2 text-capitalize ps-2'>delivery</div>
                                                <div className='f-2 text-capitalize ps-2'>status</div>
                                                {/* <div className='f-1 text-capitalize ps-2 border-0'>detail</div> */}
                                            </div>
                                        </div>
                                        <div className={`${styles['body-table']}`}>
                                            {renderOrders(newOrders.results)}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </>
                ) : <></>
            }
        </div>
    );
}

export default Dashboard;
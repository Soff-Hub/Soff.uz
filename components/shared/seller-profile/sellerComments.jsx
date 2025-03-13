import { Skeleton } from 'antd';
import Link from 'next/link';
import React from 'react';
import useApi from '~/repositories/useApi';

const comments = [
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
    {
        isName: 'Jack Ma',
        avatar: 'https://picsum.photos/id/237/200/300',
        activity: '1 soat ilgari',
        rating: '/static/img/SellerCommentsCardSellerRating.png',
        comment:
            '        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt nisi quia minus fuga vitae voluptatem soluta libero minima temporibus aut deserunt pariatur maiores ipsam aliquam officia hic ab quos numquam, eveniet itaque, tempora omnis! Dolorum deserunt cumque commodi, vero accusamus consequatur harum in dignissimos ut, quo explicabo, neque non odio?',
        path: '/product',
    },
];

export default function SellerComments () {
    const { isLoading } = useApi();
    return (
        <div className='SellerComments'>
            {isLoading && (
                <>
                    {Array(15)
                        .fill(0)
                        .map((d, i) => (
                            <Skeleton
                                key={i}
                                active
                                className='SellerCommentsSkeleton shadow'
                            />
                        ))}
                </>
            )}
            {comments.map((item, index) => (
                <div className='SellerCommentsCard'>
                    <div className='SellerCommentsCardAboutSeller'>
                        <div className='SellerCommentsCardAboutSellerinfo'>
                            <div className='SellerCommentsCardSellerAvatar'>
                                <img src={item.avatar} alt={item.isName} />
                                <p>{item.isName}</p>
                            </div>
                            <p className='SellerCommentsCardSellerActivety'>
                                {item.activity}{' '}
                            </p>
                        </div>
                        <img
                            src={item.rating}
                            className='SellerCommentsCardSellerRating'
                            alt=''
                        />
                    </div>
                    <div className='SellerCommentsCardSellerCommentWrap'>
                        <p className='SellerCommentsCardComment'>
                            {item.comment}
                        </p>
                        <a href={item.path} className='SellerCommentsCardBtn'>
                            Mahsulotni ko'rish
                        </a>
                    </div>
                </div>
            ))}
            <p className='text-center fs-5'>Ko'proq ko'rish . . .</p>
        </div>
    );
}

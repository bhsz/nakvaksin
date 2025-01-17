import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { GiHumanPyramid } from 'react-icons/gi';
import {
    IoEye,
    IoEyedropOutline,
    IoEyeOutline,
    IoHeartCircleOutline,
    IoLogoGithub,
    IoNotificationsOutline
} from 'react-icons/io5';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Faq from '../components/faq';
import Footer from '../components/footer';
import Header from '../components/header';
import { useUser } from '../hooks/useUser';

const CallToActionButton = () => {
    const { user } = useUser();
    const redirectUrl = user ? '/dashboard' : '/login';

    return (
        <div>
            <Link href={redirectUrl}>
                <button className="w-full py-6 px-10 rounded-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Jom! Subscribe to NakVaksin for FREE!
                </button>
            </Link>
        </div>
    );
};

const FeaturedItem = ({
    icon,
    title,
    subtitle,
    description
}: {
    icon: ReactElement;
    title: string;
    subtitle: string;
    description: string;
}) => (
    <div className="flex-1 mb-8 lg:px-4">
        <div className="flex items-center mb-1 xl:mb-3">
            <div>{icon}</div>
            <div className="ml-3 text-black font-medium xl:text-2xl">{title}</div>
        </div>
        <div className="leading-relaxed pr-4">
            <div className="font-normal text-blue-600 ">{subtitle}</div>
            <div>{description}</div>
        </div>
    </div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const { userProfile } = context.req.cookies;
    if (userProfile) {
        queryClient.setQueryData('user', JSON.parse(userProfile));
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default function Home() {
    const { user } = useUser();

    return (
        <div>
            <div
                className="z-0 opacity-90 w-full h-full absolute"
                style={{
                    background: `linear-gradient(-45deg, #2f1ce0 0%, #53a0fd 50%, #51eca5 100%)`
                }}
            />

            <div
                className="hidden sm:block absolute w-full h-full bg-bottom bg-no-repeat bg-cover min-h-screen "
                style={{
                    backgroundImage: "url('bg-curve.svg')"
                }}
            />
            <div className="absolute w-full flex flex-col">
                <div>
                    {user && <Header isHomepage={true} />}

                    <section className="w-full">
                        <div className="container flex flex-col items-center px-5 mx-auto sm:flex-row min-h-screen">
                            <div className="w-full lg:flex-grow lg:w-3/5 flex flex-col items-start text-left sm:px-8 mb-8 sm:mb-0 content-center sm:-mt-24 space-y-4">
                                <div className="text-4xl text-primary font-bold mt-4">
                                    NakVaksin
                                </div>

                                <div className="text-2xl font-semibold text-white title-font mb-4">
                                    Tiap-tiap hari check MySejahtera?
                                </div>

                                <div className="text-white text-opacity-90 italic space-y-1">
                                    <p>Walao weh, I missed my appointment...</p>
                                    <p>When will my children kena cucuk?</p>
                                    <p>
                                        How can I keep track of my employees&apos; vaccination
                                        appointment?
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <CallToActionButton />
                                </div>
                            </div>

                            <div className="sm:flex lg:w-5/6 lg:max-w-lg sm:w-1/2 flex justify-end sm:-mt-24 ">
                                <Image
                                    src="/phone.png"
                                    width={282}
                                    height={572}
                                    alt="Screenshot of this application"
                                />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="bg-white pb-8 w-full pt-8">
                    <div className="container mx-auto px-8 md:px-0">
                        <div className="text-center w-full pb-16">
                            <h2 className="uppercase text-gray-800">Kenapa this app?</h2>
                            <p className="sm:text-3xl text-2xl text-black-800 pt-4">
                                We help you monitor your vaccination appointment!
                            </p>
                        </div>

                        <div className="flex flex-col w-full lg:flex-row">
                            <FeaturedItem
                                icon={<IoNotificationsOutline size={48} />}
                                title={'Guaranteed notification'}
                                subtitle={"Don't worry, we are not as forgetful"}
                                description={
                                    'We promise that you will receive an SMS and email from us if your vaccination appointment is ready or even changed.'
                                }
                            />
                            <FeaturedItem
                                icon={<IoHeartCircleOutline size={48} />}
                                title={'Care for your loved one'}
                                subtitle={
                                    "Get up to speed with your family member's vaccine appointment updates"
                                }
                                description={
                                    'Keep an eye out for your grandparents, parents and even childrens when their appointment is set up.'
                                }
                            />
                            <FeaturedItem
                                icon={<IoEyeOutline size={48} />}
                                title={'Monitor your employees vaccination updates'}
                                subtitle={'Stop asking "Check your MySejahtera"'}
                                description={
                                    'You can subscribe to their vaccination updates and get the latest updates directly from us!'
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <Faq />
                </div>
                <Footer />
            </div>
        </div>
    );
}

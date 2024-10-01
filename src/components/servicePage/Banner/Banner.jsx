"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Axios from "axios";
import Typing from 'react-typing-effect';
import { Col, Container, Row } from 'react-bootstrap'
import styles from "@/styles/servicepage/Banner.module.css"
// Images
import formImg from 'media/newmobileapp/formImg.png'
import logos from "media/services/logos.svg"
import icon1 from "media/services/service-icon-1.png"
import icon2 from "media/services/service-icon-2.png"
import icon3 from "media/services/service-icon-3.png"
import icon4 from "media/services/service-icon-4.png"
import icon5 from "media/services/service-icon-5.png"
import icon6 from "media/services/service-icon-6.png"
import icon7 from "media/services/service-icon-7.png"
import icon8 from "media/services/service-icon-8.png"
import icon9 from "media/services/service-icon-9.png"
import icon10 from "media/services/service-icon-10.png"
import icon11 from "media/services/service-icon-11.png"
import icon12 from "media/services/service-icon-12.png"
import icon13 from "media/services/service-icon-13.png"
import icon14 from "media/services/service-icon-14.png"
import icon15 from "media/services/service-icon-15.png"
import icon16 from "media/services/service-icon-16.png"
import icon17 from "media/services/service-icon-17.png"
import icon18 from "media/services/service-icon-18.png"
import icon19 from "media/services/service-icon-19.png"
import icon20 from "media/services/service-icon-20.png"
import icon21 from "media/services/service-icon-21.png"

const Banner = ({ content }) => {
    // const { title, desc } = content;
    const [checkboxes, setCheckboxes] = useState([]);
    const [ip, setIP] = useState('');
    const [pagenewurl, setPagenewurl] = useState('');
    const [score, setScore] = useState('Sign Me Up');
    const [isDisabled, setIsDisabled] = useState(false);

    // Creating function to load IP address from the API

    const getIPData = async () => {
        try {
            const response = await fetch('https://ipinfo.io/?token=229b1c3fa2e54c');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setIP(data);
        } catch (error) {
            console.error('Error fetching IP data:', error);
        }
    };

    useEffect(() => {
        getIPData();
        setPagenewurl(window.location.href);
    }, []);

    const handleOptionChange3 = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCheckboxes([...checkboxes, value]);
        } else {
            setCheckboxes(checkboxes.filter((checkbox) => checkbox !== value));
        }
    };

    const router = usePathname();
    const currentRoute = router;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true);

        const currentdate = new Date().toLocaleString();
        const data = {
            page_url: pagenewurl,
            user_ip: `${ip.ip}`,
            lead_data: {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                message: e.target.comment.value,
                checkboxesdata: checkboxes.join(),
            }
        }
        const JSONdata = JSON.stringify(data);
        setScore('Sending Data');

        // First API call to your server
        await fetch('https://brandsapi.cryscampus.com/api/v1/leads', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSONdata
        }).then((res) => {
            console.log(`Response received ${res}`);
            if (res.status === 200) {
                console.log(`Response Successed ${res}`);
            }
        });

        // Second API call to SheetDB
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": "Bearer ke2br2ubssi4l8mxswjjxohtd37nzexy042l2eer",
            "Content-Type": "application/json"
        };
        let bodyContent = JSON.stringify({
            "IP": `${ip.ip} - ${ip.city} - ${ip.country}`,
            "Brand": "Bitswits",
            "Page": `${currentRoute}`,
            "Date": currentdate,
            "Time": currentdate,
            "JSON": JSONdata,
        });
        await fetch("https://sheetdb.io/api/v1/71sd48ae8vab6", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        // Third API call to another endpoint
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "fields": [
                {
                    "objectTypeId": "0-1",
                    "name": "email",
                    "value": e.target.email.value
                },
                {
                    "objectTypeId": "0-1",
                    "name": "name",
                    "value": e.target.name.value
                },
                {
                    "objectTypeId": "0-1",
                    "name": "phone",
                    "value": e.target.phone.value
                },
                {
                    "objectTypeId": "0-1",
                    "name": "message",
                    "value": e.target.comment.value
                }
            ],
            "context": {
                "ipAddress": ip.IPv4,
                "pageUri": pagenewurl,
                "pageName": pagenewurl
            },
            "legalConsentOptions": {
                "consent": {
                    "consentToProcess": true,
                    "text": "I agree to allow Example Company to store and process my personal data.",
                    "communications": [
                        {
                            "value": true,
                            "subscriptionTypeId": 999,
                            "text": "I agree to receive marketing communications from Example Company."
                        }
                    ]
                }
            }
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        await fetch("https://api.hsforms.com/submissions/v3/integration/submit/46084502/ea92327e-cdf7-4b04-9538-8d0c0e92cd9e", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        const { pathname } = router;
        if (pathname == pathname) {
            window.location.href = '/thank-you';
        }
    }
    // Moving Icons Code 
    useEffect(() => {
        const bannerSection = document.querySelector(`.${styles.bannerSec}`);
        const moveLogos = document.querySelector(`.${styles.moveLogos}`);

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX / window.innerWidth) * 40 - 30; // Adjust movement range
            const moveY = (clientY / window.innerHeight) * 40 - 30; // Adjust movement range

            moveLogos.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        bannerSection.addEventListener('mousemove', handleMouseMove);

        return () => {
            bannerSection.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className={`${styles.bannerSec} ${styles.bannerOne} pt-140`}>
            <div className="tools">
                <div className={styles.moveLogos}>
                    <div className={styles._rows1}>
                        <Image src={icon1} alt='Services' />
                        <Image src={icon2} alt='Services' />
                        <Image src={icon3} alt='Services' />
                        <Image src={icon4} alt='Services' />
                        <Image src={icon5} alt='Services' />
                    </div>
                    <div className={styles._rows2}>
                        <Image src={icon5} alt='Services' />
                        <Image src={icon6} alt='Services' />
                        <Image src={icon7} alt='Services' />
                        <Image src={icon8} alt='Services' />
                        <Image src={icon9} alt='Services' />
                        <Image src={icon21} alt='Services' />
                    </div>
                    <div className={styles._rows3}>
                        <Image src={icon10} alt='Services' />
                        <Image src={icon11} alt='Services' />
                        <Image src={icon12} alt='Services' />
                        <Image src={icon13} alt='Services' />
                        <Image src={icon14} alt='Services' />
                    </div>
                    <div className={styles._rows4}>
                        <Image src={icon15} alt='Services' />
                        <Image src={icon16} alt='Services' />
                        <Image src={icon17} alt='Services' />
                        <Image src={icon18} alt='Services' />
                        <Image src={icon19} alt='Services' />
                        <Image src={icon20} alt='Services' />
                    </div>
                </div>
            </div>
            <Container>
                <Row className='align-items-center'>
                    <Col lg={7} xl={6} className='p-lg-0'>
                        <div className="txt">
                            <Typing
                                className={`mb-2 ${styles.firstPara} manrope fw200`}
                                text='Timely – Trusted – Trailblazing'
                                speed={100}
                                eraseDelay={200}
                                typingDelay={100}
                            />
                            <h1 className='text-black mb-3 mb-lg-4 manrope font-bold'>3D Game <span className='newfycolr'>Development Company</span></h1>
                            <p className='font16 text-black font-medium mt-2 mt-xl-3 mb-3 mb-xl-4 mb-0 manrope'>BitsWits is a premium-grade 3D game development company that creates immersive 3D games for PC, consoles, mobile, and VR/AR. Utilizing Unity and Unreal Engine, our results-driven 3D game development services ensure exceptional visuals and implement monetization strategies to boost engagement and drive ROI by 30%.</p>
                            <div className="btn d-flex align-items-center gap-4 px-0">
                                <a href="#href" className={`${styles.demoBtn} font-bold manrope`}>
                                    Let’s Talk!
                                </a>
                                <a href="#href" className={`${styles.portfolioBtn} font-bold manrope`}>
                                    See Portfolio
                                </a>
                            </div>
                        </div>
                        <div className="logos pb-4 pb-lg-0 pt-4 pt-lg-5">
                            <Image src={logos} alt='Bitswits' className='img-fluid' />
                        </div>
                    </Col>
                    <Col lg={5} xl={6}>
                        <form id='BannerForm' className={styles.your} onSubmit={handleSubmit}>
                            <h3 className='manrope'>Share Your Requirements</h3>
                            <p className='text-white text-center manrope font-regular mb-3'>To help our experts understand your business objectives and create your customized plan.!</p>
                            <input type='text' minLength="4" name='name' required className='form-control' placeholder="Full Name"></input>
                            <input type="tel" minLength="10" maxLength="13" pattern="[0-9]*" name='phone' required className='form-control mt-2 mt-xxl-3' placeholder="Phone Number"></input>
                            <input type='email' name='email' required className='form-control mt-2 mt-xxl-3' placeholder="Email Address"></input>
                            <textarea placeholder='Description' name='comment' className='form-control mt-2 mt-xxl-3'></textarea>
                            <div className='d-sm-flex align-items-center mt-3 mt-xxl-4'>
                                <input className={styles.vehicle1} type='checkbox' name='vehicle1' checked={checkboxes.includes('Share Non Disclosure Agreement')} onChange={handleOptionChange3} value='Share Non Disclosure Agreement' />
                                <label className='form-check-label' htmlFor='flexCheckDefault'>Sign Non-Disclosure Agreement </label>
                                <button className={`pink ${styles.value} mt-4 mt-sm-0 blackPulse bitsForm`} type='submit' disabled={isDisabled}>
                                    <Image src={formImg} className='img-fluid' alt='BitsWits' />
                                    {score}
                                </button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner

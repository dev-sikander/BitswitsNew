"use client"
import styles from '@/styles/components/common/contactfrom.module.scss'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


const ContactFrom = ({ idea, appidea, discussion, popup, contactpage }) => {
    // const { title, desc } = content;
    const [checkboxes, setCheckboxes] = useState([]);
    const [ip, setIP] = useState('');
    const [pagenewurl, setPagenewurl] = useState('');
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
            "Brand": "BitsWits",
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



    return (
        <form onSubmit={handleSubmit}>
            <div className={`${styles.commonFrom} ${idea ? styles.ideaFrom : ''} ${appidea ? styles.appideaFrom : ''} ${discussion ? styles.discussionFrom : ''} ${popup ? styles.popupFrom : ''}  ${contactpage ? styles.contactPage : ''}`}>
                <div className={styles.fieldBox}>
                    <input type="text" name="name" placeholder='Your Name' required />
                </div>
                <div className={styles.fieldBox}>
                    <input type="email" name="email" placeholder='Your Email' required />
                </div>
                <div className={styles.fieldBox}>
                    <input type="tel" name="phone" placeholder='Your Phone Number' required />
                </div>

                {discussion ?
                    null
                    :
                    <>
                        <div className={styles.fieldBox}>
                            <textarea name="comment" placeholder='Tell us about your Project'></textarea>
                        </div>
                        {popup || contactpage ?
                            null
                            :
                            <>
                                <div className={`${styles.fieldBox} ${styles.checkBox} `}>
                                    <input type="checkbox" id="check" name="nda" checked={checkboxes.includes('Share Non Disclosure Agreement')} onChange={handleOptionChange3} value='Share Non Disclosure Agreement' />
                                    <label htmlFor="check" className={styles.checkTxt}>Share Non Disclosure Agreement</label>
                                </div>
                            </>
                        }

                    </>
                }
                {contactpage ?
                    <p className={styles.paraTxt}>We take your privacy seriously. Read our <Link href="#" className="txtColor">Privacy Policy</Link></p>
                    :
                    ""
                }

                <div className={styles.buttonBox}>
                    <button type="submit" disabled={isDisabled}>{idea === 'yes' ? 'Get Free Consultation' : 'Submit'}</button>
                </div>

            </div>
        </form>
    )
}

export default ContactFrom
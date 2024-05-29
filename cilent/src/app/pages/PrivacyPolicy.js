import React, { useEffect } from 'react'
import Dpointlogo from '../assets/logo/Dpointlogo1.png'

export default function PrivacyPolicy() {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    return (
        <div className='bg-gray-100 '>
            <div className="max-w-4xl mx-auto p-4">
                <header className="flex items-center space-x-2 mb-4">
                    <img src={Dpointlogo} alt="logo" className="w-12 h-12" />
                    <h1 className="text-xl font-semibold">Privacy Policy</h1>
                </header>
                <section>
                    <p className='font-medium'>Last updated on 3rd February, 2024</p>
                    <p>This Privacy Policy (“Policy”) describes the policies and procedures on the collection, use, disclosure and protection of your information when you use our website located at DeliveryPoint.com, or the DeliveryPoint mobile application (collectively, “DeliveryPoint Platform”) made available by Bundl Technologies Private Limited ("DeliveryPoint", “Company”, “we”, “us” and “our”), a private company established under the laws of India having its registered office at No.23 Sy No.8-12, Ground Floor, I&J Block, Embassy Tech Village, Outer Ring Road, Rajkot, Gujarat - 360003</p> <br/>
                    <p>The terms “you” and “your” refer to the user of the DeliveryPoint Platform. The term “Services” refers to any services offered by DeliveryPoint whether on the DeliveryPoint Platform or otherwise.</p>
                    <p>Please read this Policy before using the DeliveryPoint Platform or submitting any personal information to DeliveryPoint. This Policy is a part of and incorporated within, and is to be read along with, the Terms of Use.</p>  <br/>
                    <h2 className='font-medium'>YOUR CONSENT</h2>
                    <p>By using the DeliveryPoint Platform and the Services, you agree and consent to the collection, transfer, use, storage, disclosure and sharing of your information as described and collected by us in accordance with this Policy. If you do not agree with the Policy, please do not use or access the DeliveryPoint Platform.</p><br/>
                    <h2 className='font-medium'>POLICY CHANGES</h2>
                    <p>We may occasionally update this Policy and such changes will be posted on this page. If we make any significant changes to this Policy we will endeavour to provide you with reasonable notice of such changes, such as via prominent notice on the DeliveryPoint Platform or to your email address on record and where required by applicable law, we will obtain your consent. To the extent permitted under the applicable law, your continued use of our Services after we publish or send a notice about our changes to this Policy shall constitute your consent to the updated Policy.</p>
                </section>
            </div>
        </div>
    )
}


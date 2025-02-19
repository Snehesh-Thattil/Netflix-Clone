import React from 'react'
import './Footer.css'
import GetStarted from '../GetStarted/GetStarted'
import Languages from '../LangsDropdown/Languages'

function Footer({ mainViewRef, setSignIn, loggedIn }) {
    return (
        <section className='Footer'>
            {!loggedIn && <div className="description-wrapper">
                <GetStarted mainViewRef={mainViewRef} setSignIn={setSignIn} isFooter />
            </div>}
            <h4>Questions? Call <a href="000-800-919-1743" type='Call'>000-800-919-1743</a></h4>
            <div className="links">
                <div className="box">
                    <a href="https://help.netflix.com/support/412">FAQ</a>
                    <a href="http://ir.netflix.com/">Investor Relations</a>
                    <a href="https://help.netflix.com/legal/privacy">Privacy</a>
                    <a href="https://fast.com/">Speed Test</a>
                </div>
                <div className="box">
                    <a href="https://help.netflix.com/">Help Centre</a>
                    <a href="https://jobs.netflix.com/jobs">Jobs</a>
                    <a href="https://www.netflix.com/in/#">Cookie Preferences</a>
                    <a href="https://help.netflix.com/legal/notices">Legal Notices</a>
                </div>
                <div className="box">
                    <a href="https://www.netflix.com/youraccount">Account</a>
                    <a href="https://www.netflix.com/watch">Ways to Watch</a>
                    <a href="https://help.netflix.com/legal/corpinfo">Corporate Information</a>
                    <a href="https://www.netflix.com/in/browse/genre/839338">Only on Netflix</a>
                </div>
                <div className="box">
                    <a href="https://media.netflix.com/">Media Centre</a>
                    <a href="https://help.netflix.com/legal/termsofuse">Terms of Use</a>
                    <a href="https://help.netflix.com/contactus">Contact Us</a>
                </div>
            </div>
            <Languages />
            <p className='end'>Netflix India</p>
        </section>
    )
}

export default Footer


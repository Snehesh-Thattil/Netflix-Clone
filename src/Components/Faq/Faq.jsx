import React, { useState } from 'react'
import './Faq.css'

function Faq() {
    const [activeFaq, setActiveFaq] = useState()

    const faqsList = [
        { question: "What is Netflix?", answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!" },
        { question: "How much does Netflix cost?", answer: "Netflix pricing varies by plan. Visit the the profile page after login for complete details." },
        { question: "Where can I watch?", answer: "You can watch Netflix anywhere, on any device with an internet connection." },
        { question: "How do I cancel?", answer: "Cancel anytime in your account settings." },
        { question: "What can I watch on Netflix?", answer: "Netflix has a huge library of movies, TV shows, and original content." }
    ]

    // Rendering
    return (
        <section className='Faqs-wrapper'>
            <h1>Frequently Asked Questions</h1>

            {faqsList.map((faq, index) => {
                return (
                    <div key={index} className="faq">
                        <div className="question" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                            <p>{faq.question}</p>
                            <span className={activeFaq === index ? 'icon open' : 'icon'}>✖</span>
                        </div>

                        <div className={activeFaq === index ? 'answer open' : 'answer'}>
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                )
            })}

        </section>
    )
}

export default Faq

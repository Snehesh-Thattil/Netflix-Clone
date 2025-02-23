import { addDoc, collection, getDocs, query, where, onSnapshot, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase-config'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import Loader from '../Loader/Loader'
import './Plans.css'

function Plans() {
  const [plans, setPlans] = useState([])
  const { user } = useSelector((state) => state.user)
  const [subscription, setSubscription] = useState([])
  const [isLoader, setIsLoader] = useState(false)

  // Fetching user subscription from firebase
  useEffect(() => {
    const payementsCollRef = collection(db, "customers", user.userId, "payments")

    getDocs(payementsCollRef)
      .then((payemntsSnap) => {

        const subscriptionsArray = payemntsSnap.docs.map((paymentDoc) => {
          return {
            role: paymentDoc.data().payment_method_options.card.mandate_options.description,
            current_period_start: paymentDoc.data().payment_method_options.card.mandate_options.start_date,
            current_period_end: paymentDoc.data().payment_method_options.card.mandate_options.end_date
          }
        })
        setSubscription(subscriptionsArray);
      })
  }, [user])

  // Fetching all the subscription plans from firebase 
  useEffect(() => {
    const servicesCollQuery = query(
      collection(db, 'services'),
      where("active", "==", true)
    )

    getDocs(servicesCollQuery)
      .then(async (servicesSnap) => {
        const services = {}

        await Promise.all(
          servicesSnap.docs.map(async (serviceDoc) => {
            services[serviceDoc.id] = { ...serviceDoc.data() }

            const priceCollRef = collection(serviceDoc.ref, "prices")

            const pricesSnap = await getDocs(priceCollRef)

            pricesSnap.docs.forEach((priceDoc) => {
              services[serviceDoc.id].prices = {
                priceId: priceDoc.id,
                ...priceDoc.data()
              }
            })

          })
        )
        setPlans(services)
      })

  }, [])

  // Handle subscription of a plan
  async function handleSubscribe(priceId) {
    setIsLoader(true)
    const checkoutCollRef = collection(db, "customers", user.userId, "checkout_sessions")

    const checkoutDocRef = await addDoc(checkoutCollRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: `${window.location.origin}/profile`
    })

    onSnapshot(doc(db, "customers", user.userId, "checkout_sessions", checkoutDocRef.id), async (snap) => {
      const { error, sessionId } = snap.data()
      if (error) {
        alert(`An error occured : ${error.message}`)
      }
      if (sessionId) {
        const stripe = await loadStripe("pk_test_51OeaO0SEmuqBAHaT48vffcPbZw0c9EZy9sqtF8t6be2pusSi9pGE2yCSjVFtBY9gGFC6PFAt1STd1R6NmKYbpbK3002726ciMX")
        stripe.redirectToCheckout({ sessionId })
      }
    })
  }

  // Rendering
  return (
    <div className='plans-wrapper'>
      {isLoader && <Loader />}

      <h3>( Current Plan: {subscription[subscription.length - 1]?.role || 'Not Subscribed'} )</h3>
      {subscription.length !== 0 && <p>Renewal date: {new Date(subscription[subscription.length - 1]?.current_period_start * 1000 + 29 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>}

      {Object.entries(plans).map(([planId, planData]) => {
        const isCurrentPlan = planData.name?.toLowerCase().includes(subscription[subscription.length - 1]?.role.toLowerCase())
        return (
          <div className="plan" key={planId} >
            <div className="info">
              <h4>{planData.name}</h4>
              <h5>{planData.description}</h5>
            </div>
            <button className={isCurrentPlan ? 'active' : ''} onClick={() => !isCurrentPlan && handleSubscribe(planData.prices.priceId)}>{isCurrentPlan ? 'Current plan' : 'Subscribe'}</button>
          </div>
        )
      })}

    </div>
  )
}

export default Plans

import { addDoc, collection, getDocs, query, where, onSnapshot, doc } from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase-config'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import Loader from '../Loader/Loader'
import './Plans.css'
import { sendEmailVerification } from 'firebase/auth'

function Plans() {
  const [plans, setPlans] = useState([])
  const { user } = useSelector((state) => state.user)
  const [subscription, setSubscription] = useState([])
  const [isLoader, setIsLoader] = useState(false)

  // Fetching user subscription from firebase
  useEffect(() => {
    if (!user?.userId) return;
    const fetchSubscription = async () => {
      try {
        const payementsCollRef = collection(db, "customers", user.userId, "payments")
        const paymentsSnap = await getDocs(payementsCollRef)

        const subscriptionsArray = paymentsSnap.docs.map((paymentDoc) => {
          const paymentData = paymentDoc.data()?.payment_method_options?.card?.mandate_options
          return paymentData ?
            {
              role: paymentData.description,
              current_period_start: paymentData.start_date,
              current_period_end: paymentData.end_date,
            }
            : null
        }).filter(Boolean)
        setSubscription(subscriptionsArray);
      } catch (err) {
        console.log("Error fetching user subscription:", err.message)
      }
    }
    fetchSubscription()
  }, [user])

  // Fetching subscription plans from firebase 
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const servicesCollQuery = query(
          collection(db, 'services'),
          where("active", "==", true)
        )

        const servicesSnap = await getDocs(servicesCollQuery)
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
      } catch (err) {
        console.log("Error fetching plans:", err.message)
      }
    }
    fetchPlans()
  }, [])

  // Handle subscription of a plan
  const handleSubscribe = useCallback(async (priceId) => {
    setIsLoader(true)
    if (!user.emailVerified) { //verify user first
      try {
        await sendEmailVerification(user)
        alert('Oops, your email is not verified...');
        alert('Email verification sent ✅, check your email');
      } catch (err) {
        alert('Something went wrong! Try again later.');
        console.error("Error sending verification email:", err);
      } finally {
        setIsLoader(false)
        return;
      }
    }
    // After verifying user...
    try {
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
          return
        }
        if (sessionId) {
          const stripe = await loadStripe("pk_test_51OeaO0SEmuqBAHaT48vffcPbZw0c9EZy9sqtF8t6be2pusSi9pGE2yCSjVFtBY9gGFC6PFAt1STd1R6NmKYbpbK3002726ciMX")
          await stripe.redirectToCheckout({ sessionId })
        }
      })
    } catch (err) {
      console.log("Error handling subscription:", err)
    } finally {
      setIsLoader(false)
    }
  }, [user])

  // Rendering
  if (isLoader) return <Loader />
  return (
    <div className='plans-wrapper'>
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
            <p>Rs.{Math.floor(planData.prices.unit_amount / 100)}</p>
            <button className={isCurrentPlan ? 'active' : ''} onClick={() => !isCurrentPlan && handleSubscribe(planData.prices.priceId)}>{isCurrentPlan ? 'Current plan' : 'Subscribe'}</button>
          </div>
        )
      })}

    </div>
  )
}

export default Plans

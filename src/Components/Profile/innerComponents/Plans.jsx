import { addDoc, collection, getDocs, query, where, onSnapshot, doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../Firebase/firebase-config'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'

function Plans() {
  const [plans, setPlans] = useState([])
  const { user } = useSelector((state) => state.user)

  // Fetching subscription plans from firebase 
  useEffect(() => {
    const productsCollQuery = query(
      collection(db, 'products'),
      where("active", "==", true)
    )

    getDocs(productsCollQuery)
      .then(async (productsSnap) => {
        const products = {}

        await Promise.all(
          productsSnap.docs.map(async (productDoc) => {
            products[productDoc.id] = { ...productDoc.data() }

            const priceCollRef = collection(productDoc.ref, "prices")

            const pricesSnap = await getDocs(priceCollRef)

            pricesSnap.docs.forEach((priceDoc) => {
              products[productDoc.id].prices = {
                priceId: priceDoc.id,
                ...priceDoc.data()
              }
            })

          })
        )
        setPlans(products)
      })

  }, [])

  // Handle subscription of a plan
  async function handleSubscribe(priceId) {
    const checkoutCollRef = collection(db, "customers", user.userId, "checkout_sessions")

    const checkoutDocRef = await addDoc(checkoutCollRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    })

    onSnapshot(doc(db, "customers", user.userId, "checkout_sessions", checkoutDocRef.id), async (snap) => {
      const { error, sessionId } = snap.data()
      if (error) {
        alert(`An error occured : ${error.message}`)
      }
      if (sessionId) {
        const stripe = await loadStripe("sk_test_51OeaO0SEmuqBAHaTBdFZ2J35PQkQSOw9kaVZwUboiTQ5JJAAPLl2UxCCSDEOYjb3OaQS6efzYGWdzYweavdfUZul00KO7o0vu4")
      }
    })
  }

  // Rendering
  return (
    <div className='plans-wrapper'>

      {Object.entries(plans).map(([planId, planData]) => {
        return (
          <div className="plan" key={planId} >
            <div className="info">
              <h4>{planData.name}</h4>
              <h5>{planData.description}</h5>
            </div>

            <button onClick={() => handleSubscribe(planData.prices.priceId)}>Subscribe</button>
          </div>
        )
      })}

    </div>
  )
}

export default Plans

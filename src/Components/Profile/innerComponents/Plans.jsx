import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { db } from '../../../Firebase/firebase-config'

function Plans() {
  // const [plans, setPlans] = useState([])
  const productsCollQuery = query(
    collection(db, 'products'),
    where("active", "==", true)
  )

  useEffect(() => {
    getDocs(productsCollQuery)
      .then((snapshot) => {
        const products = {}
        snapshot.docs.forEach((productDoc) => {
          // console.log(productDoc.data())
          products[productDoc.id] = productDoc.data()
          // I want to also include product price details in the products object
        })
        console.log("|| products obj : ", products)
      })
  }, [productsCollQuery])

  // Rendering
  return (
    <div className='plans-wrapper'>

      {/* {plans.map((plan) => {
        return (
          <div className="plan">
            <div className="info">
              <h4>Premium</h4>
              <h5>4k + HDR</h5>
            </div>

            <button>Subscribe</button>
          </div>
        )
      })} */}

      {/* 2 */}
      <div className="plan">
        <div className="info">
          <h4>Premium</h4>
          <h5>4k + HDR</h5>
        </div>

        <button>Subscribe</button>
      </div>

      {/* 3 */}
      <div className="plan">
        <div className="info">
          <h4>Premium</h4>
          <h5>4k + HDR</h5>
        </div>

        <button>Subscribe</button>
      </div>

    </div>
  )
}

export default Plans

import React, {Suspense, lazy} from "react"
import Spinner from "./spinner/Spinner"

export const Async = Component => props => (
  <Suspense fallback={<Spinner />}>
    <Component {...props} />
  </Suspense>
)

export const lazyImport = url => lazy(() => import(`${url}`))

import React from 'react'

export default function BusinessDescription({business}) {
  return (
    <div className="mb-8">
        <h2 className="font-bold text-lg">Description</h2>
        <p className="mt-4 text-lg text-gray-500">{business?.about}</p>
    </div>
  )
}

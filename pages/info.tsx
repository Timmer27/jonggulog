import React from 'react'
type Props = {}

export default function info({}: Props) {
  return (
    <div>
        <div className='text-blue-500 text-4xl'>info test</div>
        <div className="text-red-500 text-xl font-bold">Hello, React!</div>
        <p className="text-lg font-medium">Hello, Typescript!</p>
    </div>
  )
}
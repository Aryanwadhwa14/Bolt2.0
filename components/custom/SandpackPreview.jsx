import { SandpackProvider } from '@codesandbox/sandpack-react/index'
import React from 'react'



function SandpackPreview() {
  return (
    <div>
      <SandpackProvider/>
      <div className="flex flex-col h-full p-4"></div>
      <h1 className="text-2xl font-bold mb-4">Tailwind CSS with Sandpack</h1>
      <div className="flex-1 border border-gray-300 rounded-lg p-4">
    <h2 className="text-xl font-semibold mb-2"> Component</h2>
    <p className="mb-4">This is a simple example of a component styled with Tailwind CSS.</p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Click Me
    </button>
  </div>
  <div className="mt-4">
    <h2 className="text-xl font-semibold mb-2">Another Section</h2>
    <ul className="list-disc pl-5">
      <li className="mb-2">Item 1</li>
      <li className="mb-2">Item 2</li>
      <li className="mb-2">Item 3</li>
      <li className="mb-2">Item 4</li>
    </ul>
  </div>
  <div className="mt-4">
    <h2 className="text-xl font-semibold mb-2">Form Example</h2>
    <form className="flex flex-col">
      <label className="mb-2" htmlFor="name">Name:</label>
      <input className="border border-gray-300 rounded p-2 mb-4" type="text" id="name" />
      <label className="mb-2" htmlFor="email">Email:</label>
      <input className="border border-gray-300 rounded p-2 mb-4" type="email" id="email" />
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Submit
      </button>
    </form>
  </div>
  <div className="mt-4">
    <h2 className="text-xl font-semibold mb-2">Grid Example</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="border border-gray-300 rounded p-4">Grid Item 1</div>
      <div className="border border-gray-300 rounded p-4">Grid Item 2</div>
      <div className="border border-gray-300 rounded p-4">Grid Item 3</div>
      <div className="border border-gray-300 rounded p-4">Grid Item 4</div>
      <div className="border border-gray-300 rounded p-4">Grid Item 5</div>
      <div className="border border-gray-300 rounded p-4">Grid Item 6</div>
    </div>
</div>
</div>
)
} 

export default SandpackPreview
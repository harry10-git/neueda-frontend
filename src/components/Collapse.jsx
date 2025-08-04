import React from 'react'

const Collapse = () => {
  return (
    <div>
        <div className="bg-base-100 border-base-300 collapse border">
  <input type="checkbox" className="peer" />
  <div
    className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
  >
    How do I create an account?
  </div>
  <div
    className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
  >
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </div>
</div>
    </div>
  )
}

export default Collapse
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './store/user/user.reducer'
import './App.css'

function App(): JSX.Element {
  const dispatch = useDispatch()
  const [count, setCount] = useState<number>(0)
  const userObj = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    isAdmin: true,
  }
  useEffect(() => {
    dispatch(setUser(userObj))
  }, [])
  return (
    <>
      <h1>Heading</h1>
      <div className="card">
        <button onClick={() => setCount((prevCount: number) => prevCount + 1)}>
          count is {count}
        </button>
        {/* <p>{userObj.firstName}</p>
        <p>{userObj.lastName}</p>
        <p>{userObj.age}</p> */}
      </div>
      <p className="read-the-docs">
        This should work
      </p>
    </>
  )
}

export default App

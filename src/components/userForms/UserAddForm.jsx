import { useState } from 'react';
import PropTypes from 'prop-types';
import './UserForms.scss';

export default function UserAddForms({userData, closeShowUser = () => {}, addUser = () => {}}) {
  const initInputState = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
  }
  const [inputState, setInputState] = useState(initInputState)

  const handleChange = (e) => {
    setInputState(prevState => prevState = {...prevState, [e.target.name]: e.target.value})
  }
  return (
    <form onSubmit={e => e.preventDefault()} className='wrapper'>
      <div className='user-descr'>
        <div className='user-descr__close' onClick={closeShowUser}>✖</div>
        <h3 className='user-descr__title'>Adding a user</h3>
        <input 
          type="text" 
          className='user-descr__input' 
          name='first_name' 
          value={inputState.first_name} 
          placeholder='First name'
          onChange={e => handleChange(e)} 
        />
        <input 
          type="text" 
          className='user-descr__input' 
          name='last_name' 
          value={inputState.last_name} 
          placeholder='Last name'
          onChange={e => handleChange(e)} 
        />
        <input 
          type="email" 
          className='user-descr__input' 
          name='email' 
          value={inputState.email} 
          placeholder='Email'
          onChange={e => handleChange(e)} 
        />
        <div className='user-descr__footer'>
          <button onClick={closeShowUser}>Cancel</button>
          <button type='submit' onClick={() => addUser(inputState)}>Add</button>
        </div>
      </div>
    </form>  
  )
}

UserAddForms.propTypes = {
  userData: PropTypes.object.isRequired,
  closeShowUser: PropTypes.func,
  addUser: PropTypes.func
}

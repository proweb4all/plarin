import { useState } from 'react';
import PropTypes from 'prop-types';
import './UserForms.scss';

export default function UserUpdateForms({userData, closeShowUser = () => {}, deleteUser = () => {}, updateUser = () => {}}) {
  const styleImg = {
    backgroundImage: `url(${userData.avatar})` 
  }
  const initInputState = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
  }
  const [inputState, setInputState] = useState(initInputState)

  const handleChange = (e) => {
    setInputState(prevState => prevState = {...prevState, [e.target.name]: e.target.value})
  }
  const saveUser = () => {
    updateUser(userData.id, {...userData, ...inputState})
  }
  return (
    <form onSubmit={e => e.preventDefault()} className='wrapper'>
      <div className='user-descr'>
        <div className='user-descr__close' onClick={closeShowUser}>✖</div>
        <h3 className='user-descr__title'>Editing a user</h3>
        <div className='user-descr__img' style={styleImg}></div>
        <input 
          type="text" 
          className='user-descr__input' 
          name='first_name' 
          value={inputState.first_name} 
          onChange={e => handleChange(e)} 
        />
        <input 
          type="text" 
          className='user-descr__input' 
          name='last_name' 
          value={inputState.last_name} 
          onChange={e => handleChange(e)} 
        />
        <input 
          type="email" 
          className='user-descr__input' 
          name='email' 
          value={inputState.email} 
          onChange={e => handleChange(e)} 
        />
        <div className='user-descr__footer'>
          <button onClick={() => deleteUser(userData.id)}>Remove</button>
          <button type='submit' onClick={saveUser}>Save</button>
        </div>
      </div>
    </form>  
  )
}

UserUpdateForms.propTypes = {
  userData: PropTypes.object.isRequired,
  closeShowUser: PropTypes.func,
  deleteUser: PropTypes.func,
  updateUser: PropTypes.func
}

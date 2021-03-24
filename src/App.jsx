import React, {useEffect, useState} from 'react';
import ApiCall from './api/apiCall';
import CardList from './components/cardList/CardList';
import UserUpdateForm from './components/userForms/UserUpdateForm';
import UserAddForm from './components/userForms/UserAddForm';

const App = () => {
  const [userData, setUserData] = useState({form: null})
  const [usersState, setUsersState] = useState({})

  const initState = async () => {
      const result = await ApiCall.get('')
      setUsersState((prevState) => prevState = result)
  }

  useEffect(() => {
    initState()
  }, [])

  const getNPage = async (page) => {
    const result = await ApiCall.get(`?page=${page}`)
    setUsersState((prevState) => prevState = result)
  }

  const showUserUpdateForm = async (id) => {
    const user = await ApiCall.get(id)
    user.data.form = 'update'
    setUserData((prevState) => prevState = user.data)
  }

  const deleteUser = async (id) => {
    await ApiCall.delete(id)
    setUserData((prevState) => prevState = {form: null})
    const result = await ApiCall.get(`?page=${usersState.page}`)
    setUsersState((prevState) => prevState = result)
  }

  const updateUser = async (id, payload) => {
    await ApiCall.put(id, payload)
    setUserData((prevState) => prevState = {form: null})
    const result = await ApiCall.get(`?page=${usersState.page}`)
    setUsersState((prevState) => prevState = result)
  }

  const closeShowUser = () => {
    setUserData((prevState) => prevState = {form: null})
  }

  const showUserAddForm = () => {
    setUserData((prevState) => prevState = {
        first_name: '',
        last_name: '',
        email: '',
        form: 'add',
      }
    )
  }

  const addUser = async (payload) => {
    await ApiCall.post('', payload)
    setUserData((prevState) => prevState = {form: null})
    const result = await ApiCall.get(`?page=${usersState.page}`)
    setUsersState((prevState) => prevState = result)
  }

  const isEmpty = val => val === null || !(Object.keys(val) || val).length;

  return (
    <div className="App">
      {!isEmpty(usersState) 
        ? <CardList 
            usersState={usersState} 
            showUserUpdateForm={showUserUpdateForm} 
            showUserAddForm={showUserAddForm}
            getNPage={getNPage}
          /> 
        : <h2>The list of users is empty</h2>
      }
      {(userData.form === 'update') &&
        <UserUpdateForm 
          userData={userData} 
          closeShowUser={closeShowUser} 
          deleteUser={deleteUser}
          updateUser={updateUser}
        />
      }
      {(userData.form === 'add') &&
        <UserAddForm 
          userData={userData} 
          closeShowUser={closeShowUser} 
          addUser={addUser}
        />
      }
    </div>
  )
}

export default App
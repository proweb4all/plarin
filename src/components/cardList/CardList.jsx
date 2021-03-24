import PropTypes from 'prop-types';
import UserCard from '../userCard/UserCard';
import './CardList.scss';

const CardList = ({usersState, showUserUpdateForm = () => {}, showUserAddForm = () => {}, getNPage = () => {}}) => {

  const {page, total_pages} = usersState

  const usersList = usersState.data.map(user => 
    <UserCard 
      key={user.id} 
      data={user} 
      showUserUpdateForm={showUserUpdateForm}
    />
  )

  const pagination = Array(total_pages).fill('').map((_el, ind) => {
    let classes = 'pagination__btn'
    if ((ind + 1) === page) classes += ' pagination__btn_active'
    return <button key={ind} className={classes} onClick={() => getNPage(ind + 1)}>{ind + 1}</button>
  })

  return (
    <main className='container'>
      <h1 className="title">Users</h1>
      <ul className="card-list">
        {usersList}
        <li 
          className='user-card user-card_add'
          onClick={showUserAddForm}>
            <span>+</span>
        </li>
      </ul>
      <div className='pagination'>
        {pagination}
      </div>
    </main>
  )
}

CardList.propTypes = {
  usersState: PropTypes.object.isRequired,
  showUserUpdateForm: PropTypes.func,
  showUserAddForm: PropTypes.func,
  getNPage: PropTypes.func
}

export default CardList
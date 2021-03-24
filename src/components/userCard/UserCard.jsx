import PropTypes from 'prop-types';
import './UserCard.scss';

export default function UserCard({data, showUserUpdateForm = () => {}}) {
  const styleImg = {
    backgroundImage: `url(${data.avatar})` 
  }
  return (
    <div key={data.id} className='user-card' style={styleImg} onClick={() => showUserUpdateForm(data.id)}>
      <h3 className='user-card__name'>{data.first_name}</h3>
    </div>
  )
}

UserCard.propTypes = {
  data: PropTypes.object.isRequired,
  showUserUpdateForm: PropTypes.func
}
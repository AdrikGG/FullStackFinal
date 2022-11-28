import ProfileBox from '../components/ProfileBox';
import MainButton from '../components/MainButton';
import EasyEdit, { Types } from 'react-easy-edit';
import Row from 'react-bootstrap/Row';

const Profile = () => {
  return (
    <div className='p-5'>
      <Row>
        <ProfileBox></ProfileBox>
        <MainButton text='Edit Profile' type='button' />
      </Row>
    </div>
  );
};
export default Profile;

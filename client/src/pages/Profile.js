import ProfileBox from '../components/ProfileBox';
import ProfileBoxEdit from '../components/ProfileBoxEdit';

import EasyEdit, { Types } from 'react-easy-edit';
import Row from 'react-bootstrap/Row';

const Profile = () => {
  let editMode = true;

  if (editMode) {
  } else {
  }

  return (
    <div className='p-5'>
      <Row>
        <ProfileBox></ProfileBox>
        <ProfileBoxEdit></ProfileBoxEdit>
      </Row>
    </div>
  );
};
export default Profile;

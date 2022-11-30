import ProfileBox from '../components/ProfileBox';
import ProfileBoxEdit from '../components/ProfileBoxEdit';
import Row from 'react-bootstrap/Row';

const Profile = () => {
  let editMode = true;

  if (editMode) {
  } else {
  }

  return (
    <div className="p-5">
      <Row>
        <ProfileBox></ProfileBox>
        <ProfileBoxEdit></ProfileBoxEdit>
      </Row>
    </div>
  );
};
export default Profile;

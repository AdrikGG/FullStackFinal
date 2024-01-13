import React, { useState } from 'react';
import ProfileBox from '../components/ProfileBox';
import ProfileBoxEdit from '../components/ProfileBoxEdit';
import MainButton from '../components/MainButton';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const setEditModeTrue = () => {
    setIsEdit(true);
  };

  const setEditModeFalse = () => {
    setIsEdit(false);
  };
  return (
    <Container className="my-3 bg-light border rounded w-50">
      <Row className="my-3 d-flex text-center">
        {!isEdit && (
          <div>
            <ProfileBox></ProfileBox>
            <MainButton
              text="Edit Profile"
              type="button"
              looks={{ width: 150 }}
              onClick={setEditModeTrue}
            />
          </div>
        )}
        {isEdit && (
          <div>
            <ProfileBoxEdit></ProfileBoxEdit>
            <MainButton
              text="Exit Edit Mode"
              type="button"
              looks={{ width: 150 }}
              onClick={setEditModeFalse}
            />
          </div>
        )}
      </Row>
    </Container>
  );
};
export default Profile;

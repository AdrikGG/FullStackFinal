import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();

  const state = {
    user: useSelector((state) => state.user),
    previewSource: '',
    message: '',
    fileTypes: ['jpg', 'png', 'jpeg', 'image/jpg', 'image/png', 'image/jpeg'],
  };

  // const user = useSelector((state) => state.user);

  const changeAvatar = () => {
    // pop-up dialog for changing avatar
    // replace current avatar image with new image
    console.log('change avatar');
  };

  useEffect(() => {
    getUser();
  });

  const getUser = () => {
    console.log('get user');
    let id = localStorage.getItem('_ID');
    if (!id) {
      console.log('invalid path: no user logged in');
      localStorage.clear();
      navigate('/dashboard');
    }
    axios.get('/api/users/' + id).then((res) => {
      state.user = res.data.user;
    });
  };

  const handleFileInputChange = (e) => {
    console.log('handle file input change');
    const file = e.target.files[0];
    if (!state.fileTypes.includes(file.type)) {
      state.message = 'Must be either jpg, pdf, or png';
    } else {
      state.message = '';
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    console.log('preview file');
    if (file.size > 10000000) {
      state.message = 'File size too big';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      state.previewSource = reader.result;
    };
  };

  const handleSubmitFile = (e) => {
    console.log('handle submit file');
    e.preventDefault();
    if (
      state.message.length > 0 ||
      !state.previewSource ||
      Object.keys(state.user) < 1
    )
      return;
    axios
      .post(
        '/api/users/upload-image',
        JSON.stringify({
          data: state.previewSource,
          _id: state.user._id,
        })
      )
      .then((res) => {
        if (res.data && res.data.message) {
          state.message = res.data.message;
          state.fileInput = '';
          state.previewSource = '';
          state.showPopup = true;
        } else {
          state.message = 'Success';
          state.fileInput = '';
          state.previewSource = '';
          state.showPopup = true;
        }
        getUser();
      })
      .catch((err) => {
        console.log(err);
        state.showPopup = true;
        state.message = 'Something went wrong uploading image';
      });
  };

  let userInfo;
  if (state.user) {
    userInfo = (
      <div>
        <div
          className="avatar"
          style={{
            backgroundImage:
              state.user.avatar ||
              `url(https://icon-library.com/images/avatar-png-icon/avatar-png-icon-9.jpg)`,
            backgroundSize: '400px 400px',
            width: '400px',
            height: '400px',
          }}
          onClick={changeAvatar}
        ></div>
        <div className="img-uploader">
          <div>Upload Avatar Image</div>
          <div className="upload-box">
            <input onChange={(e) => handleFileInputChange(e)} type="file" />
            {state.previewSource ? (
              <img
                className="display-image"
                alt="selescted"
                src={state.previewSource}
              />
            ) : state.user.avatar && state.user.avatar.url ? (
              <img
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '20px auto 0 25px',
                  width: '25vw',
                  height: '25vw',
                }}
                className="display-image"
                alt="display"
                src={state.user.avatar.url}
              />
            ) : (
              <img
                className="display-image"
                alt="display"
                src={state.previewSource}
              />
            )}
          </div>
          <div
            style={{
              color: state.message === 'Success' ? 'green' : 'red',
              fontSize: '.8em',
              margin: '20px 0',
            }}
          >
            {state.message}
          </div>
          <button
            className="image-btn"
            style={{ marginTop: '20px' }}
            onClick={(e) => handleSubmitFile(e)}
          >
            Save
          </button>
        </div>
        <div className="username-wrapper">
          <div className="username">{state.user.username}</div>
          <button>Change Username</button>
        </div>
        <div className="password-wrapper">
          <button>Change Password</button>
        </div>
      </div>
    );
  } else {
    userInfo = (
      <div>
        <div>Loading</div>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <h1>Profile Page</h1>
      <div>{userInfo}</div>
    </div>
  );
};

export default Profile;

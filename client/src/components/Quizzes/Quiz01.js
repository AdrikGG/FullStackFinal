const Quiz01 = () => {
  const state = {
    gameOptions: {
      rotation: false,
    },
  };

  return (
    <div className="quiz-wrapper">
      <h1>Country Silhouettes</h1>
      <div className="options">
        <h4>Game Options</h4>
        <div className="checkbox">
          <input
            type="checkbox"
            id="rotation"
            onClick={(e) => {
              state.gameOptions.rotation = e.target.checked;
              console.log('rotation: ', state.gameOptions.rotation);
            }}
          ></input>
          <label htmlFor="rotation">Random Rotation</label>
        </div>
      </div>
    </div>
  );
};

export default Quiz01;

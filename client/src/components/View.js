import React from "react";

const View = props => {
  return (
    <div>
      {props.data.map(user => (
        <div>
          <h2>{user.id}</h2>
          <h2>{user.username}</h2>
          <h2>{user.password}</h2>
        </div>
      ))}
    </div>
  );
};

export default View;

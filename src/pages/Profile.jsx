import { useSelector } from "react-redux";

function Profile() {
  // the logged in user, found in the users list
  var user = useSelector((state) =>
    state.Auth.users.find(
      (obj) => state.Auth.session && obj.userId == state.Auth.session.userId,
    ),
  );

  if (!user) return null;

  return (
    <div className="container py-4" style={{ maxWidth: "640px" }}>
      <h3 className="fw-bold mb-4">My Profile</h3>
      <div className="summary">
        <p className="mb-2">
          <span className="text-muted">Name: </span>
          {user.name}
        </p>
        <p className="mb-2">
          <span className="text-muted">Email: </span>
          {user.email}
        </p>
        <p className="mb-0">
          <span className="text-muted">Mobile: </span>
          {user.phone}
        </p>
      </div>
    </div>
  );
}
export default Profile;

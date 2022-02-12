import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUser } from "../users";

const User = () => {

  const params = useParams();
  const navigate = useNavigate();

  const user = getUser(parseInt(params.userId));
  /* console.log(user); */

  const handleDelete = () => {
    deleteUser(user.id);
    navigate("/users");
  }

  if(!user){
    return <div><h2>El usuario no existe</h2></div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <div>
        <strong>Phone: </strong> {user.phone}
      </div>
      <div>
        <strong>Website: </strong> {user.website}
      </div>
      <br />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default User;

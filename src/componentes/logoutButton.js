import { useAuth0 } from "@auth0/auth0-react";
import '../App.css';

const LogoutButton = () => {
    const { logout, isAuthenticated, user } = useAuth0();
    let roles;
    let user_metadata;
    if (user) {
        roles = user['https://tgp.me/roles']; // Si no es admin, devuelve un arreglo vacío
        user_metadata = user['https://tgp.me/user_metadata'];
        console.log('user_metadata: ', user_metadata);
  }
    
    return (
        isAuthenticated && (
            <div className="tarjeta-profile">
                <h3 className="profile-title">¡Hola {user_metadata['name']}! <button className="logout-button" onClick={() => logout()}>LOG OUT</button></h3>    
            </div>
        )
    );
}

export default LogoutButton;
import { useAuth0 } from "@auth0/auth0-react";
import '../App.css';

const LogoutButton = () => {
    const { logout, isAuthenticated, user } = useAuth0();
    
    return (
        isAuthenticated && (
            <div className="tarjeta-profile">
                <button className="logout-button" onClick={() => logout()}>
                    LOG OUT
                </button>
            </div>
        )
    );
}

export default LogoutButton;
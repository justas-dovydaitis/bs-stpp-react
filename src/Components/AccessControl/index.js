import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import refreshToken from '../../Actions/refreshToken';

const AccessControll = (props) => {
    if (props.rolesAllowed.includes(UserRoles.all))
        return props.children;
    const token = localStorage.getItem('accessToken');
    let role = UserRoles.guest;
    if (token) {
        role = UserRoles.standard;
        const decoded = jwt_decode(token);
        let now = new Date().getTime();
        if (decoded.exp > now - 10000) {
            refreshToken();
        }
        else {
            role = decoded.role;
        }
    }
    const accessAllowed = props.rolesAllowed.includes(role);
    // console.log('accessAllowed:', accessAllowed, props.children)
    return accessAllowed ? props.children : props.noAccessComponent;
};

AccessControll.propTypes = {
    rolesAllowed: PropTypes.arrayOf(PropTypes.oneOf(["GUEST", "ADMIN", "STANDARD", "ALL"])).isRequired,
};

export default AccessControll;
export const UserRoles = {
    admin: "ADMIN",
    guest: "GUEST",
    standard: "STANDARD",
    all: "ALL"
}

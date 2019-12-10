import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import refreshToken from '../../Actions/refreshToken';
import Cookie from 'js-cookie';

const AccessControll = (props) => {
    if (props.rolesAllowed.includes(UserRoles.all))
        return props.children;
    const token = localStorage.getItem('accessToken');
    let jwt = Cookie.getJSON('refreshToken');
    let role = UserRoles.guest;
    // debugger;
    if (token && jwt) {
        role = UserRoles.standard;
        let decoded = jwt_decode(token);
        decoded.exp *= 1000;
        const jwtExp = jwt_decode(jwt).exp * 1000;
        let now = new Date().getTime();
        console.group();
        console.log('refresh expires', new Date(jwtExp));
        console.log('access expires', new Date(decoded.exp));
        console.groupEnd();
        if (jwtExp > now) {
            if (decoded.exp < now - 10000) {
                refreshToken();
            }
            else {
                role = decoded.role;
            }
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

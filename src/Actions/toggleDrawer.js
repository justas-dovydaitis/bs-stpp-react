import { actionTypes } from './index';

const toggleDrawer = (state) => {
    console.log(state)
    return {
        type: actionTypes.TOGGLE_DRAWER,
        payload: state
    };
};

export default toggleDrawer;
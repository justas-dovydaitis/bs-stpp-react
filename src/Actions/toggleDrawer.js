import { actionTypes } from './index';

const toggleDrawer = (state) => {
    console.log(state)
    return {
        type: actionTypes.TOGGLE_DRAWER,
        payload: state
    };
};
const updateDrawer = () => {
    return {
        type: actionTypes.UPDATE_DRAWER,
    }
}

export default toggleDrawer;
export { updateDrawer };
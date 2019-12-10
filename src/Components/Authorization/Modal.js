import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import setJWTexpiredVisibility from '../../Actions/setJWTexpiredVisibility'
import signoutUser from '../../Actions/signOut';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const mapStateToProps = (state) => {
    return { open: state.modal.open }
}
const mapDispatchToProps = dispatch => ({
    setJWTexpiredVisibility: (open) => dispatch(setJWTexpiredVisibility(open)),
})

const ErrorModal = (props) => {
    const classes = useStyles();
    return (
        <Modal
            aria-labelledby="JWT expired"
            aria-describedby="Your authorization token expired"
            className={classes.modal}
            open={props.open}
            onClose={() => props.setJWTexpiredVisibility(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Your token expired</h2>
                    <p id="transition-modal-description">You should login again too reach non-guest features</p>
                    <button className='btn btn-primary' onClick={
                        () => {
                            props.setJWTexpiredVisibility(false)
                            debugger;
                            signoutUser()
                        }

                    }>Close</button>
                </div>
            </Fade>
        </Modal>

    )
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
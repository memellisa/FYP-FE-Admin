import React, { useEffect, useState } from "react";
import { Box, Link, Card, Stack, Typography, Button } from '@mui/material';
import { deletePostByID } from "src/utils/api/article.api";


const ConfirmDeletePopup = props => {
    const deletePostHandler = () => {
        console.log(props.postID)
        deletePostByID(props.postID).then(res => (
            props.handleClose()
        ))  
    }


    return (
        <div style={styles.popupBox}>
            <div style={styles.box}>
                {/* <span style={styles.closeIcon} onClick={props.handleClose}>x</span> */}
                <Typography variant="h4" gutterBottom style={styles.title}>
                    Are you sure you want to delete this post?
                </Typography>
                <Typography gutterBottom style={styles.content}>
                    postID: {props.postID}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Button style={styles.submitButton} variant="text" disableElevation color='error' onClick={deletePostHandler}>
                        Yes 
                    </Button>
                    <Button style={styles.submitButton}  variant="text" disableElevation onClick={props.handleClose}>
                        Cancel 
                    </Button>
                </Stack>
            </div>
        </div>
    )
}

const styles = {
    popupBox: {
        position: 'fixed',
        background: '#00000050',
        width: '100%',
        height: '200vh',
        top: 0,
        left: 0,
        zIndex: 100000,
    },
       
    box: {
        position: 'relative',
        width: '30%',
        margin: '0 auto',
        height: '250px',
        marginTop: 'calc(100vh - 65vh - 20px)',
        background: '#fff',
        borderRadius: '15px',
        padding: '20px',
        border: '1px #999',
        overflow: 'auto',
        zIndex: 1000000, 
    },
       
    closeIcon: {
        content: 'x',
        cursor: 'pointer',
        position: 'absolute',
        right: 10,
        top: 10,
        background: '#ededed',
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        lineHeight: '20px',
        textAlign: 'center',
        border: '1px solid #999',
        fontSize: '20px',
        zIndex:1000
    },

    content: {
        fontSize: 16,
        textAlign: 'justify',
        // flexWrap: 'wrap',
        // borderBottomColor: '#D3D3D3',
        // borderBottomWidth: 1,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 20,
    },

    submitButton: {
        // position: 'absolute',
        // left: '45%',
        // bottom: 20,
    },

    info: {
        color: 'grey',
        fontSize: 14,
        textAlign: 'left',
    },
};

export default ConfirmDeletePopup;
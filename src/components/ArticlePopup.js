import React, { useEffect, useState } from "react";
import { FormControl, Container, Button, FormLabel, MenuItem, Typography, TextField, FormHelperText } from '@mui/material';
import { getPostByID } from "src/utils/api/article.api";

const ArticlePopup = props => {
    const [postInfo, setPostInfo] = useState({})

    const fetchPost = async () => {
        getPostByID(props.postID).then(res => {
            console.log("WHAT IS HERE" + res.data)
            setPostInfo(res.data)
        })
    }

    useEffect(() => {
        fetchPost()
    }, []) 

    return (
        <div style={styles.popupBox}>
            <div style={styles.box}>
                <span style={styles.closeIcon} onClick={props.handleClose}>x</span>
                <img
                    style={{margin: "5px auto", borderRadius: 10}}
                    src={postInfo.img}
                    alt={`POST IMAGE`}
                    loading="lazy"
                />
                <Typography variant="h4" gutterBottom style={styles.title}>
                    {postInfo.title}
                </Typography>
                <Typography gutterBottom style={styles.content}>
                    {postInfo.content}
                </Typography>

                <Typography style={{...styles.info, paddingBottom: 65}}>
                    Written By: {postInfo.author}
                    <br></br>
                    {postInfo.date}
                </Typography>
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
        zIndex: 100,
    },
       
    box: {
        position: 'relative',
        width: '60%',
        margin: '0 auto',
        height: '650px',
        marginTop: 'calc(100vh - 85vh - 20px)',
        background: '#fff',
        borderRadius: '15px',
        padding: '20px',
        border: '1px #999',
        overflow: 'auto',
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

    inputContainer: {
        // flexDirection: 'row',
        position: 'relative',
        marginTop: 40,
        marginHorizontal: 0,
        left: 0,
        width: '100%',
        // alignItems: 'center'
    },

    inputContentContainer: {
        // flexDirection: 'row',
        position: 'relative',
        marginTop: 25,
        marginHorizontal: 0,
        left: 0,
        width: '100%',
        // alignItems: 'center'
    },

    inputContentBox: {
        // flexDirection: 'row',
        position: 'relative',
        marginTop: 25,
        marginHorizontal: 0,
        left: 0,
        width: '100%',
        // alignItems: 'center'
    },

    inputOptionTitle: {
        width: 140, 
        alignItems: 'flex-start'
    },

    inputBox: {
        height: 10,
        alignItems: 'flex-start',
        
    },

    title: {
        flexGrow: 1,
        textAlign: 'center',
        marginTop: 10,
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
        position: 'absolute',
        left: '45%',
        bottom: 20,
    },

    info: {
        color: 'grey',
        fontSize: 14,
        textAlign: 'left',
    },
};

export default ArticlePopup;
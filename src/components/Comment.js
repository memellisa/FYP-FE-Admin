import React, { useEffect, useState } from "react";
import { Avatar, Paper, Typography } from '@mui/material';
import { getUserByUID } from "src/utils/api/article.api";
import { fDate } from "src/utils/formatTime";

const Comment = ({comment}) => {
    const [userInfoArray, setUserInfoArray] = useState([])

    const renderAllUserComment = async () => {
        let temp = []
        await Promise.all(comment.map(async (comm) => {
            const result = await getUserByUID(comm.user_id);
            if (!result.error){
                temp.push({"avatar": result.data.info.img, "name": result.data.info.firstName + " " + result.data.info.lastName})
            } else {
            // Alert.alert('Something went wrong getting Activities. Please try again')
                temp.push({"avatar": "", "name": ""})
            }
        }))
        setUserInfoArray(temp)
    }


    useEffect(() => {
        renderAllUserComment();
    }, [])

    return(
        <div>
            {userInfoArray.map((comp, idx) => {
                return (
                    <div style={{marginBottom: 10}}>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <Avatar
                                sx={{ width: 30, height: 30, mb: 1 }}
                                src={comp.avatar ? comp.avatar : "https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png" }
                                style={{display: "inline-block"}}

                            />
                            <Typography style={{...styles.userName, display: "inline-block"}}>{comp.name}</Typography>
                        </div>
                        <div style={styles.commentContent}>
                            <Paper variant="outlined" containerstyle={styles.commentContainer} sx={{ pl: 2 }}>
                                {/* <Text style={styles.commentText}>{comment.content}</Text> */}
                                <Typography style={styles.commentText}>
                                    {comment[idx].content}
                                </Typography>
                            </Paper>
                        </div>
                        <Typography style={styles.commentLikes}>{fDate(comment[idx].date)}</Typography> 
                    </div>)
            })}
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

    userName: {
        color: 'grey',
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 5,
    },

    commentContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    commentContainer: {
        marginTop: 5,
        marginRight: 5,
        paddingLeft: 40,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15
    },
    
    commentLikes: {
        color: 'grey',
        fontSize: 13,
        paddingLeft: 20,
    }
};

export default Comment
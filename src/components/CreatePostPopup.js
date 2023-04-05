import React, { useEffect, useState } from "react";
import { FormControl, Container, Button, FormLabel, MenuItem, Typography, TextField, FormHelperText } from '@mui/material';
import { useFilePicker } from 'use-file-picker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createPost, getAllArticleFromDB, uploadPostImage } from "src/utils/api/article.api";
 
const CreatePostPopup = props => {
    const [fileName, setFileName] = useState('')
    const [groupSelection, setGroupSelection] = useState('')
    const [groups, setGroups] = useState([])

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
    });

    const imageHandling = () => {
        openFileSelector()
    }

    const handleChange = (event) => {
        setGroupSelection(event.target.value);
    };

    const submitCreatePost = async () => {
        let payloadPost = JSON.stringify({ 'author': author, 'content': content, "forum": groupSelection, "title": title })
        createPost(payloadPost).then(res => {
            let response = res.data
            let postID = Object.entries(response)[0][0]
            let payloadIMG = JSON.stringify({ 'img': filesContent[0].content.substring(filesContent[0].content.indexOf(',')+1), 'postID': postID })
            uploadPostImage(payloadIMG)
            props.handleClose()
        })
    }

    const fetchArticle = async () => {
        let groups = []
        let response;
        getAllArticleFromDB().then(res => {
          response = res.data
          response.forEach((json) => {
            {Object.entries(json).map((group) => {
                groups.push(group[0])
            })}
          })
          setGroups(groups)
        })
    }

    useEffect(() => {
        fetchArticle()
    }, [])

    useEffect(() => {
        if (filesContent[0]) {
            setFileName(filesContent[0].name)
            
        }
    }, [fileName, filesContent]);

    return (
    <div style={styles.popupBox}>
      <div style={styles.box}>
        <span style={styles.closeIcon} onClick={props.handleClose}>x</span>
        <b>Create Post</b>
            <FormControl style={{left: 0, position: 'absolute', width: '100%'}}>
                <Container style={styles.inputContainer}>
                    {/* <Container style={styles.inputOptionTitle}>
                        <Typography style={styles.inputOptionTitleText}>Author</Typography>
                    </Container> */}
                    <FormLabel style={{top: 8, marginRight: 12}}>Author</FormLabel>
                    <TextField style={styles.inputBox} variant="outlined" size="small"  onChange={(event) => setAuthor(event.target.value)} />
                </Container>

                <Container style={styles.inputContainer}>
                    <FormLabel style={{top: 0, marginRight: 12}}>Image</FormLabel>
                    <button onClick={() => imageHandling()}>Select image file </button>
                    <Typography>{fileName}</Typography>
                </Container>

                <Container style={styles.inputContainer}>
                    {/* <Container style={styles.inputOptionTitle}>
                        <Typography style={styles.inputOptionTitleText}>Author</Typography>
                    </Container> */}
                    <FormLabel style={{top: 0, marginRight: 12}}>Groups</FormLabel>
                    <Select
                        value={groupSelection}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        size="small" 
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {Object.entries(groups).map((group) => {
                            return <MenuItem key={group[1]} value={group[1]}>{group[1]}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText id="my-helper-text">If you can't find a suitable group, please add a new group first before creating the post.</FormHelperText>
                </Container>

                <Container style={styles.inputContainer}>
                    {/* <Container style={styles.inputOptionTitle}>
                        <Typography style={styles.inputOptionTitleText}>Author</Typography>
                    </Container> */}
                    <FormLabel style={{top: 8, marginRight: 12}}>Title</FormLabel>
                    <TextField style={styles.inputBox} variant="outlined" size="small"  onChange={(event) => setTitle(event.target.value)} />
                </Container>

                <Container style={styles.inputContentContainer}  >
                    {/* <Container style={styles.inputOptionTitle}>
                        <Typography style={styles.inputOptionTitleText}>Author</Typography>
                    </Container> */}
                    <FormLabel style={{top: 8, marginRight: 12}}>Content</FormLabel>
                    <TextField style={styles.inputContentBox} variant="outlined" multiline rows={8} size="small" onChange={(event) => setContent(event.target.value)} />
                </Container>
                {/* <InputLabel htmlFor="my-input">Author</InputLabel>
                <TextField fullWidth id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>

            <Button style={styles.submitButton} disabled={fileName && groupSelection && author && title && content ? false : true} onClick={submitCreatePost} variant="contained" disableElevation>
                Submit 
            </Button>
      </div>
    </div>
  );
};

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
        width: '40%',
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
        alignItems: 'flex-start'
    },

    valueText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        width: 195,
        flexWrap: 'wrap',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginLeft: 10,
    },

    submitButton: {
        position: 'absolute',
        left: '45%',
        bottom: 20,
    }
};
 
export default CreatePostPopup;

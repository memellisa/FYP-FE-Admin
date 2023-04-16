import { flaskURL } from "../constants";
import axios from "axios";

const getAllArticleFromDB = async () => {
    try {
        const response = await axios.get(`${flaskURL}/community/`,{
            headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
            }
        });
        console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
};

const createPost = async (groupName, payload) => {
    try {
        const response = await axios.post(`${flaskURL}/community/${groupName}`, payload,{
            headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
            }
        });
        console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
};

const getPostByID = async (postID) => {
    try {
        const response = await axios.get(`${flaskURL}/community/post/${postID}`,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        });
        console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
};

const createGroup = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/community/`, payload,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        });
        // console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
};

const deletePostByID = async (postID) => {
    try {
        const response = await axios.delete(`${flaskURL}/community/post/${postID}`,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        });
        console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
}

const deleteGroup = async (group) => {
    try {
        const response = await axios.delete(`${flaskURL}/community/${group}`,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        });
        console.log('RESP',response)
        return { data: response.data, error: null }
    } catch (error) {
        // console.log(payload)
        // console.log('RESP',error.response)
        return { data: null, error }
    } 
}

const getUserByUID = async (uid) => {
    try {
        const response = await axios.get(`${flaskURL}/user/${uid}`);
        return { data: response.data, error: null }
    } catch (error) {
        return { data: null, error }
    } 
};

export { getAllArticleFromDB, createPost, getPostByID, createGroup, deletePostByID, deleteGroup, getUserByUID }
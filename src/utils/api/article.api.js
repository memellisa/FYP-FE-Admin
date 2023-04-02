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

const getPostsInForums = async (name) => {
    try {
        const response = await axios.get(`${flaskURL}/community/post/${name}`,{
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

const uploadPostImage = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/imagePosts`, payload,{
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

const createPost = async (payload) => {
    try {
        const response = await axios.post(`${flaskURL}/community/post`, payload,{
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

export { getAllArticleFromDB, getPostsInForums, uploadPostImage, createPost }
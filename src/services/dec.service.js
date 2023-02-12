import axios from 'axios';

const URL = "https://dsbalico.pythonanywhere.com"

export async function classifyDogEmotion(data) {
    return await axios.post(`${URL}/ai/classification/dogemotion`, data);
}

export async function checkIfDog(data) {
    return await axios.post(`${URL}/ai/classification/dogvsnotdog`, data);
}
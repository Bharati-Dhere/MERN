import axios from "axios";

export const bookBaseURL=axios.create({
    baseURL:"http://localhost:8000/book"
})
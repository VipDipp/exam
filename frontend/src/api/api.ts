import axios_config, { AxiosInstance } from "axios";

const axios = axios_config.create({
    baseURL: 'http://localhost:8085'
});

const setUpBearerHeader = (axios : AxiosInstance) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;
}
  
const removeBearerHeader = (axios : AxiosInstance) => {
    axios.defaults.headers.common['Authorization'] = "";
}

async function SignUp(email: string, password: string) {
    try {
        await axios.post('/user/signup', {
            email,
            password
        })
    } catch(err) {
        console.log(err);
        return false;
    }
    return SignIn(email, password)
}

export async function SignIn(email: string, password: string) {
    try {
      const response = await axios.post('/user/signin', {
        email,
        password
      });
      
      if (typeof window !== "undefined") {
        localStorage.setItem("email", email);
        localStorage.setItem("jwt", response.data);
      }
      setUpBearerHeader(axios);
      return true;
  
    } catch (error) {
      console.log(error);
      return false;
    }
}

export async function SignOut() {
  if (typeof window !== "undefined"){
    localStorage.removeItem("email");
    localStorage.removeItem("jwt");
  }

  removeBearerHeader(axios);
}

export async function addList(list_name: string) {
  setUpBearerHeader(axios)
  try {
    const response = await axios.post('/todo/lists', {
        list_name
    })
    return response
  } catch(err) {
    console.log(err);
    return false;
  }
}

export async function updateList(name: string,id: number) {
  
}

export async function deleteList(id: number) {
  setUpBearerHeader(axios)
  try {
    const response = await axios.delete('/todo/lists/' + id, {})
    console.log(response)
  } catch(err) {
    console.log(err);
    return false;
  }
} 

export async function getLists() {
  setUpBearerHeader(axios)
  try {
    return (await (await axios.get('/todo/lists', {})).data)
  } catch(err) {
    console.log(err);
    return false;
  }
  
}

export async function addTask(name: string) {

}

export async function updateTask(name: string,id: number) {

}

export async function deleteTask(id: number) {

} 

export async function getTasks() {

}

export default SignUp
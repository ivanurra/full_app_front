  
import axios from "axios";


class MangaService {

  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true
    });


    this.service = service;
  }

  leidos = (mangaID, userID) => {
    return this.service.post("/leidos", {mangaID, userID})
    .then(response => response.data)
  }

  leyendo = (mangaID, userID) => {
    return this.service.post("/leyendo", {mangaID, userID})
    .then(response => response.data)
  }

  porLeer = (mangaID, userID) => {
    return this.service.post("/porLeer", {mangaID, userID})
    .then(response => response.data)
  }

  getUser = (userID) => {
    return this.service.get(`/getUser/${userID}`, {userID})
    .then(response => response.data)
  }

//   login = (username, password) => {
//     return this.service.post("/login", {username, password})
//     .then(response => response.data)
//   }

//   loggedin = () =>{
//     return this.service.get("/loggedin")
//     .then(response => response.data)
//   }

//   logout = () =>{
//     return this.service.post("/logout", {})
//     .then(response => response.data)
//   }
}

export default MangaService;
//DATOS DEL USUARIO EN LA API REQRES

// "id": 3,
// "email": "emma.wong@reqres.in",
// "first_name": "Emma",
// "last_name": "Wong",
// "avatar": "https://reqres.in/img/faces/3-image.jpg"



export class Usuario {
    
    constructor(
        public id:number,
        public first_name:string, 
        public last_name:string, 
        public avatar:string){}

}
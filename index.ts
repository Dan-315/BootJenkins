import axios from 'axios'


let host="https://apprende-ws.herokuapp.com/graphql"
// let host="http://localhost:3000/graphql"
let values=[null,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,"Daniel","David ",3];
let numPeticiones=100;

let query=`query($user: UserInput){
    getUser(user: $user) {
      id,
      nombre,
      apePat,
      apeMat,
      telefono,
      email,
      pasword
    }  
  }`

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Usuario{
    id?: any,
    nombre?: any,
    apePat?: any,
    apeMat?: any,
    telefono?: any,
    email?: any,
    pasword?: any
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function init(){
    console.log(`
        ////////////////////////////////////////////////////////////////////////////////////////////
            Iniciando peticiones a ${host}
        ////////////////////////////////////////////////////////////////////////////////////////////
    `);

    let PeticionesExitosas=0;
    let PeticionesFracasadas=0;
    let ArrayErrores:any[]=[];

    for(let i=0;i<numPeticiones;i++){
    
        let user:Usuario={
            id:getValue(),
            nombre:getValue(),
            apePat:getValue(),
            apeMat:getValue(),
            telefono:getValue(),
            email:getValue(),
            pasword:getValue()
        }
        // console.log(user);
        
        await peticion(user).then((res)=>{
            // console.log(res);
            if(res.status){
                PeticionesExitosas+=1;
            }else{
                PeticionesFracasadas+=1;
                ArrayErrores.push(res);
            }
        })
    }
    console.log("Errores");
    console.log(ArrayErrores);
    
    console.log(`
        ----------------------------------------------------------------------------------------
            Peticiones Exitosas: ${PeticionesExitosas}
            Peticiones Fracasadas: ${PeticionesFracasadas}
    `);
}

function getValue() {
    let value=Math.trunc(Math.random() * (values.length - 0))
    // console.log(value);
    return values[value];
}

async function peticion(user:Usuario){
    return await axios.post(host, {
        query,
        variables: {user}
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res)=>{
        let respons={
          status:true,
          message:"OK",
          data:res.data.data.getUser
        }
        return respons;
      }).catch((error:Error)=>{
        let respons={
          status:false,
          message:error.message,
          error:true,
          errorData:error
        }
        return respons;
      })
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
init();



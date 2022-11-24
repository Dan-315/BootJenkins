"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let host = "https://apprende-ws.herokuapp.com/graphql";
// let host="http://localhost:3000/graphql"
let values = [null, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Daniel", "David ", 3];
let numPeticiones = 100;
let query = `query($user: UserInput){
    getUser(user: $user) {
      id,
      nombre,
      apePat,
      apeMat,
      telefono,
      email,
      pasword
    }  
  }`;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`
        ////////////////////////////////////////////////////////////////////////////////////////////
            Iniciando peticiones a ${host}
        ////////////////////////////////////////////////////////////////////////////////////////////
    `);
        let PeticionesExitosas = 0;
        let PeticionesFracasadas = 0;
        let ArrayErrores = [];
        for (let i = 0; i < numPeticiones; i++) {
            let user = {
                id: getValue(),
                nombre: getValue(),
                apePat: getValue(),
                apeMat: getValue(),
                telefono: getValue(),
                email: getValue(),
                pasword: getValue()
            };
            // console.log(user);
            yield peticion(user).then((res) => {
                // console.log(res);
                if (res.status) {
                    PeticionesExitosas += 1;
                }
                else {
                    PeticionesFracasadas += 1;
                    ArrayErrores.push(res);
                }
            });
        }
        console.log("Errores");
        console.log(ArrayErrores);
        console.log(`
        ----------------------------------------------------------------------------------------
            Peticiones Exitosas: ${PeticionesExitosas}
            Peticiones Fracasadas: ${PeticionesFracasadas}
    `);
    });
}
function getValue() {
    let value = Math.trunc(Math.random() * (values.length - 0));
    // console.log(value);
    return values[value];
}
function peticion(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios_1.default.post(host, {
            query,
            variables: { user }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            let respons = {
                status: true,
                message: "OK",
                data: res.data.data.getUser
            };
            return respons;
        }).catch((error) => {
            let respons = {
                status: false,
                message: error.message,
                error: true,
                errorData: error,
                dataSend: user
            };
            return respons;
        });
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
init();

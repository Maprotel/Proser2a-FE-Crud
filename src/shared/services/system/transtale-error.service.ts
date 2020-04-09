import { Injectable } from "@angular/core";

@Injectable({
providedIn: "root"
})
export class TranslateErrorService {
constructor() {}

translateErrorNumber(error: number) {
let result = "Error desconocido";

if (error === 401) {
result = "Usuario no autorizado";
return result;
} else if (error === 404) {
result = "No se encontró esta ruta";
return result;
} else if (error === 0) {
result = "No hay conexión con el backend";
return result;
} else {
return result;
}
}
}

import { Datoconsulta } from "./datoconsulta";

export class Equifax {
    id!: number;
    nombres!: string;
    apellidos!: string;
    dni!: string;
    ocupacion!: string;
    nacionalidad!: string;
    datosConsulta!: Datoconsulta[];
}

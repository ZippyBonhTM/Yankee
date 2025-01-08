import { stsiAlunoMenu } from "./aluno.js";
import { stsiBreveMainMenu } from "./breve.js";
import { stsiMainMenu } from "./main.js";
import { stsiMatriculaMenu } from "./matricula.js";
import { navMenu } from "./nav.js";


export const stsiMenu = {
    nav: navMenu,
    main: stsiMainMenu,
    breve: {
        main: stsiBreveMainMenu,
        matricula: stsiMatriculaMenu,
        aluno: stsiAlunoMenu
    }
}
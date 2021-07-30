import { ALL_ROLES, Roles } from './roles.enum';

export const Permissions = {
    //AUTH
    GET_ME: ALL_ROLES,
    CHANGE_PASSWORD: ALL_ROLES,

    //USER
    MANAGE_USERS: [Roles.CHIEF],

    //MEMBER
    CREATE_MEMBER: [Roles.ASSIST, Roles.ASSOC, Roles.CHECKOUT, Roles.REF, Roles.CHIEF],
    READ_MEMBER: [Roles.ASSIST, Roles.ASSOC, Roles.CHECKOUT, Roles.REF, Roles.CHIEF],
    UPDATE_MEMBER: [Roles.ASSIST, Roles.ASSOC, Roles.CHECKOUT, Roles.REF, Roles.CHIEF],
    DELETE_MEMBER: [Roles.ASSIST, Roles.ASSOC, Roles.CHECKOUT, Roles.REF, Roles.CHIEF],

    //EMPLOYEE
    CREATE_EMPLOYEE: [Roles.CHIEF, Roles.ASSOC, Roles.ASSIST],
    READ_EMPLOYEE: [Roles.CHIEF, Roles.ASSOC, Roles.ASSIST],
    UPDATE_EMPLOYEE: [Roles.CHIEF, Roles.ASSOC, Roles.ASSIST],
    DELETE_EMPLOYEE: [Roles.CHIEF, Roles.ASSOC, Roles.ASSIST],

    //BOOK
    CREATE_BOOK: [Roles.ASSIST, Roles.ASSOC, Roles.CHECKOUT, Roles.REF, Roles.CHIEF],
    READ_BOOK: ALL_ROLES,
    UPDATE_BOOK: [Roles.ASSIST, Roles.ASSOC, Roles.CHECKOUT, Roles.REF, Roles.CHIEF],
    DELETE_BOOK: [Roles.ASSIST, Roles.ASSOC, Roles.CHECKOUT, Roles.REF, Roles.CHIEF],

    //LOAN
    CREATE_LOAN: [Roles.LIB, Roles.PROF, Roles.STUDENT],
    READ_LOAN: ALL_ROLES,
    RETURN_BOOK: [Roles.LIB, Roles.PROF, Roles.STUDENT],
    FINISH_LOAN: [Roles.LIB, Roles.PROF, Roles.STUDENT],
};

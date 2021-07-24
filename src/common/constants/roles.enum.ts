export enum Roles {
    STUDENT = 'Student',
    PROF = 'Professor',
    LIB = 'Library',
    CHIEF = 'Chief librarian',
    ASSOC = 'Departmental associate librarian',
    ASSIST = 'Library assistant',
    CHECKOUT = 'Check-out staff',
    REF = 'Reference librarian',
}

// export const ALL_ROLES = [
//     'Student',
//     'Professor',
//     'Library',
//     'Chief librarian',
//     'Departmental associate librarian',
//     'Library assistant',
//     'Check-out staff',
//     'Reference librarian',
// ];

export const ALL_ROLES = [
    Roles.STUDENT,
    Roles.PROF,
    Roles.LIB,
    Roles.CHIEF,
    Roles.ASSOC,
    Roles.ASSIST,
    Roles.CHECKOUT,
    Roles.REF,
];

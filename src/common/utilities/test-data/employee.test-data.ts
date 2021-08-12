import { Roles } from '../../../rbac/constants/roles.enum';
import { UpdateEmployeeDto } from '../../../employee/dto/update-employee.dto';

export const create_employee_dto = {
    user: {
        username: 'testmanager',
        password: 'test',
    },
    role: {
        name: Roles.ASSOC,
    },
    home_address: {
        street: 'Testrup Kirkevej',
        house_number: '77',
        city: {
            zip: '7777',
            city: 'Testrup',
        },
    },
};

export const employee_single = {
    user_id: '1530b45a-b315-43e5-b312-78ed69a0c7e7',
    role: {
        name: 'Departmental associate librarian',
    },
    home_address: {
        id: '4736634a-cd87-4e9a-8e4a-52fd71d9261a',
        street: 'Thierer Road',
        house_number: '38652',
        city: {
            zip: '10160',
            city: 'New York City',
        },
    },
};

export const employee_list = [
    {
        user_id: '0567ae73-5861-4b63-92b8-3ddf0cf94e71',
        role: {
            name: 'Library assistant',
        },
        home_address: {
            id: '36494fe4-5708-4ed8-bfd5-d2dd87783a30',
            street: 'Farmco Alley',
            house_number: '24445',
            city: {
                zip: '18763',
                city: 'Wilkes Barre',
            },
        },
    },
    {
        user_id: '1530b45a-b315-43e5-b312-78ed69a0c7e7',
        role: {
            name: 'Departmental associate librarian',
        },
        home_address: {
            id: '4736634a-cd87-4e9a-8e4a-52fd71d9261a',
            street: 'Thierer Road',
            house_number: '38652',
            city: {
                zip: '10160',
                city: 'New York City',
            },
        },
    },
    {
        user_id: '2e3095b6-22ce-44f2-a131-e78780a96b8b',
        role: {
            name: 'Library assistant',
        },
        home_address: {
            id: '69b6c5aa-4f66-4a9e-be3a-58a25c15db3d',
            street: 'Merrick Way',
            house_number: '19',
            city: {
                zip: '10160',
                city: 'New York City',
            },
        },
    },
    {
        user_id: '58118655-bd90-482e-8577-17dfa5c34f04',
        role: {
            name: 'Check-out staff',
        },
        home_address: {
            id: '4625774b-e1fd-47d0-ac14-8057cf5fdbf0',
            street: 'Namekagon Court',
            house_number: '777',
            city: {
                zip: '90055',
                city: 'Los Angeles',
            },
        },
    },
];

export const employee_id = 'UUID';

const update_employee_dto: UpdateEmployeeDto = {
    role: {
        name: Roles.CHIEF,
    },
};

export const update_employee = {
    id: employee_id,
    body: update_employee_dto,
};

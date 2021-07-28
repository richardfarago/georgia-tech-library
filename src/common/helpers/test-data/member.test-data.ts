import { CreateMemberDto } from "src/member/dto/create-member.dto";
import { UpdateMemberDto } from "src/member/dto/update-member.dto";
import { Member } from "src/member/entities/member.entity";

export const create_lib: CreateMemberDto = {
    phone_number: "+4550226649",
    loan_permission: {
        name: "Test library",
        book_limit: 10,
        loan_period: 50,
        grace_period: 20
    },
    school_member: null,
    user: {
        username: "testlib",
        password: "test"
    },
    library: {
        name: "Test library"
    },
    campus_address: {
        street: "Testrup Kirkevej",
        house_number: "77",
        city: {
            zip: "7777",
            city: "Testrup"
        }
    }
}

export const create_student: CreateMemberDto = {
    phone_number: "+4550226649",
    loan_permission: {
        name: "Student",
        book_limit: 5,
        loan_period: 21,
        grace_period: 7
    },
    library: null,
    user: {
        username: "mariatestova",
        password: "test"
    },
    school_member: {
        ssn: "777-777-777",
        first_name: "Maria",
        last_name: "Testova",
        home_address: {
            street: "Testrupvej",
            house_number: "17",
            city: {
                zip: "7777",
                city: "Testrup"
            }
        }
    },
    campus_address: {
        street: "Testrup Kirkevej",
        house_number: "77",
        city: {
            zip: "7777",
            city: "Testrup"
        }
    }
}


export const member_single: Member = {
    user_id: "000919ad-582f-4f8c-93f5-bbb285953b0a",
    phone_number: "+86 (408) 898-0340",
    library: null,
    campus_address: {
        id: "d4665dcc-8e91-4ce5-8ffc-5e0e59bddba7",
        street: "Kensington Way",
        house_number: "56",
        city: {
            zip: "78225",
            city: "San Antonio"
        }
    },
    user: {
        id: "000919ad-582f-4f8c-93f5-bbb285953b0a",
        username: "lflipsener",
        password: "zZRgDkQXBMq"
    },
    member_card: {
        number: "63-585-9618",
        photo_url: "http://dummyimage.com/171x142.png/5fa2dd/ffffff",
        issuedAt: "2018-10-22T07:46:56.000Z"
    },
    loan_permission: {
        name: "Student",
        book_limit: 5,
        loan_period: 21,
        grace_period: 7
    },
    school_member: {
        ssn: "278-33-0575",
        first_name: "Laurie",
        last_name: "Flipsen",
        home_address: {
            id: "cffc8cd0-d010-483d-bffe-dc5b044223d0",
            street: "Oak Valley Parkway",
            house_number: "32422",
            city: {
                zip: "20057",
                city: "Washington"
            }
        }
    }

}

export const member_list: Member[] = [
    {
        user_id: "00005591-6afb-4c47-b010-e64350bffbd8",
        phone_number: "+504 (788) 213-8332",
        library: null,
        campus_address: {
            id: "dbd67b55-ef1f-4455-bf18-6ce403080768",
            street: "Buhler Terrace",
            house_number: "28",
            city: {
                zip: "80243",
                city: "Denver"
            }
        },
        user: {
            id: "00005591-6afb-4c47-b010-e64350bffbd8",
            username: "nilchenko4r"
        },
        member_card: {
            number: "85-785-3299",
            photo_url: "http://dummyimage.com/101x196.png/ff4444/ffffff",
            issuedAt: "2020-04-30T11:27:10.000Z"
        },
        loan_permission: {
            name: "Student",
            book_limit: 5,
            loan_period: 21,
            grace_period: 7
        },
        school_member: {
            ssn: "418-43-6907",
            first_name: "Nataline",
            last_name: "Ilchenko",
            home_address: {
                id: "5cb0b387-4012-4c01-b22a-733f266c94cc",
                street: "Fairfield Court",
                house_number: "62",
                city: {
                    zip: "80045",
                    city: "Aurora"
                }
            }
        }
    },
    {
        user_id: "0003950f-d088-47d7-8e10-7384d503fd30",
        phone_number: "+976 (227) 759-3160",
        library: null,
        campus_address: {
            id: "61b64558-e3e7-482f-a0a4-a5aa01b05818",
            street: "Dorton Parkway",
            house_number: "3005",
            city: {
                zip: "55446",
                city: "Minneapolis"
            }
        },
        user: {
            id: "0003950f-d088-47d7-8e10-7384d503fd30",
            username: "gbardema"
        },
        member_card: {
            number: "40-546-8476",
            photo_url: "http://dummyimage.com/217x151.png/dddddd/000000",
            issuedAt: "2019-01-09T01:53:56.000Z"
        },
        loan_permission: {
            name: "Student",
            book_limit: 5,
            loan_period: 21,
            grace_period: 7
        },
        school_member: {
            ssn: "659-50-7109",
            first_name: "Garfield",
            last_name: "Barde",
            home_address: {
                id: "a11fb221-556f-4f6b-af13-a83692af3736",
                street: "Goodland Lane",
                house_number: "20",
                city: {
                    zip: "24048",
                    city: "Roanoke"
                }
            }
        }
    },
    {
        user_id: "0006ed9f-50fa-491e-88d7-03d646ea6ace",
        phone_number: "+62 (873) 338-5992",
        library: null,
        campus_address: {
            id: "5b17633a-6e76-4ad8-b33b-e9b9f92f388f",
            street: "Sloan Circle",
            house_number: "8786",
            city: {
                zip: "10160",
                city: "New York City"
            }
        },
        user: {
            id: "0006ed9f-50fa-491e-88d7-03d646ea6ace",
            username: "charbincc"
        },
        member_card: {
            number: "88-111-5090",
            photo_url: "http://dummyimage.com/113x122.png/cc0000/ffffff",
            issuedAt: "2017-08-26T12:20:31.000Z"
        },
        loan_permission: {
            name: "Student",
            book_limit: 5,
            loan_period: 21,
            grace_period: 7
        },
        school_member: {
            ssn: "598-08-2407",
            first_name: "Carleton",
            last_name: "Harbin",
            home_address: {
                id: "c1c73137-633e-4808-979d-3aae61c6b39d",
                street: "Waywood Point",
                house_number: "85",
                city: {
                    zip: "78225",
                    city: "San Antonio"
                }
            }
        }
    },
    {
        user_id: "000919ad-582f-4f8c-93f5-bbb285953b0a",
        phone_number: "+4560371289",
        library: null,
        campus_address: {
            id: "d4665dcc-8e91-4ce5-8ffc-5e0e59bddba7",
            street: "Kensington Way",
            house_number: "56",
            city: {
                zip: "78225",
                city: "San Antonio"
            }
        },
        user: {
            id: "000919ad-582f-4f8c-93f5-bbb285953b0a",
            username: "lflipsener"
        },
        member_card: {
            number: "63-585-9618",
            photo_url: "http://dummyimage.com/171x142.png/5fa2dd/ffffff",
            issuedAt: "2018-10-22T07:46:56.000Z"
        },
        loan_permission: {
            name: "Student",
            book_limit: 5,
            loan_period: 21,
            grace_period: 7
        },
        school_member: {
            ssn: "278-33-0575",
            first_name: "Laurie",
            last_name: "Flipsen",
            home_address: {
                id: "cffc8cd0-d010-483d-bffe-dc5b044223d0",
                street: "Oak Valley Parkway",
                house_number: "32422",
                city: {
                    zip: "20057",
                    city: "Washington"
                }
            }
        }
    },
    {
        user_id: "00098a50-cbd0-455e-9cf1-5164d1661ced",
        phone_number: "+34 (490) 119-0676",
        library: null,
        campus_address: {
            id: "cdc27864-84e1-4427-a340-33c9ce943304",
            street: "Heath Terrace",
            house_number: "34668",
            city: {
                zip: "63143",
                city: "Saint Louis"
            }
        },
        user: {
            id: "00098a50-cbd0-455e-9cf1-5164d1661ced",
            username: "kgrasner2s"
        },
        member_card: {
            number: "98-179-0343",
            photo_url: "http://dummyimage.com/109x135.png/dddddd/000000",
            issuedAt: "2020-05-26T16:24:21.000Z"
        },
        loan_permission: {
            name: "Student",
            book_limit: 5,
            loan_period: 21,
            grace_period: 7
        },
        school_member: {
            ssn: "133-48-3639",
            first_name: "Karina",
            last_name: "Grasner",
            home_address: {
                id: "8bf98127-227c-4ece-8a7e-954fa878a630",
                street: "Buena Vista Trail",
                house_number: "6329",
                city: {
                    zip: "65110",
                    city: "Jefferson City"
                }
            }
        }
    },
    {
        user_id: "000adf36-1d16-45c1-8482-ce2b7bedf274",
        phone_number: "+856 (874) 499-8820",
        library: null,
        campus_address: {
            id: "2927b182-9066-4ba1-818b-bcf1b8e29661",
            street: "Rigney Center",
            house_number: "521",
            city: {
                zip: "63131",
                city: "Saint Louis"
            }
        },
        user: {
            id: "000adf36-1d16-45c1-8482-ce2b7bedf274",
            username: "nslarkep9"
        },
        member_card: {
            number: "42-239-4077",
            photo_url: "http://dummyimage.com/214x181.png/ff4444/ffffff",
            issuedAt: "2020-09-18T11:20:11.000Z"
        },
        loan_permission: {
            name: "Student",
            book_limit: 5,
            loan_period: 21,
            grace_period: 7
        },
        school_member: {
            ssn: "173-31-0902",
            first_name: "Noak",
            last_name: "Slarke",
            home_address: {
                id: "c32bc38c-0ffc-410f-94c1-c5819e06ec2b",
                street: "Twin Pines Avenue",
                house_number: "88281",
                city: {
                    zip: "79705",
                    city: "Midland"
                }
            }
        }
    },
    {
        user_id: "0013eeab-9d5f-4030-8d01-6f45afe5943a",
        phone_number: "+61 (854) 679-6798",
        library: null,
        campus_address: {
            id: "fc60737e-41ca-479b-a99a-781bcbf1e90e",
            street: "Menomonie Alley",
            house_number: "2132",
            city: {
                zip: "11054",
                city: "Port Washington"
            }
        },
        user: {
            id: "0013eeab-9d5f-4030-8d01-6f45afe5943a",
            username: "dmcane72"
        },
        member_card: {
            number: "58-351-2598",
            photo_url: "http://dummyimage.com/210x200.png/dddddd/000000",
            issuedAt: "2018-05-22T05:00:54.000Z"
        },
        loan_permission: {
            name: "Student",
            book_limit: 5,
            loan_period: 21,
            grace_period: 7
        },
        school_member: {
            ssn: "667-27-2825",
            first_name: "Devin",
            last_name: "McAne",
            home_address: {
                id: "7e0e3c09-e462-4259-9e68-d069fb56299b",
                street: "Warrior Alley",
                house_number: "720",
                city: {
                    zip: "20430",
                    city: "Washington"
                }
            }
        }
    }
]

const update_body: UpdateMemberDto = {
    phone_number: "+4560371289",
    loan_permission: {
        name: "Professor"
    }
}

export const update_member = {
    id: '000919ad-582f-4f8c-93f5-bbb285953b0a',
    body: update_body
}

export const member_id = 'UUID'
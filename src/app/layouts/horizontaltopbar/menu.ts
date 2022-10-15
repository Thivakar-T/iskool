import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Administration',

        subItems: [
            {
                id: 2,
                label: 'User',
                link: 'administration/user',
                parentId: 1
            },
            // {
            //     id: 3,
            //     label: 'Role',
            //     link: 'administration/role',
            //     parentId: 1
            // },
            // {
            //     id: 4,
            //     label: 'Page Policy',
            //     link: 'administration/page-policy',
            //     parentId: 1
            // },
            {
                id: 5,
                label: 'Calendar',
                link: 'administration/calendar',
                parentId: 1
            },
            {
                id: 5,
                label: 'Holiday Calendar',
                link: 'administration/holiday-calendar',
                parentId: 1
            },
        ]
    },
    {
        id: 2,
        label: 'Admission',

        subItems: [
            {
                id: 2,
                label: 'New Admission',
                link: 'admission/new',
            },
            // {
            //     id: 3,
            //     label: 'University Registration Number',
            //     link: 'admission/university-registration',
            // },
            // {
            //     id: 4,
            //     label: 'Student Branch Transfer',
            //     link: 'admission/student-transferlist',
            // },

            {
                id: 5,
                label: 'Admission Record',
                link: 'admission/admission-record',
            },
            {
                id: 6,
                label: 'Student Academic Record',
                link: 'admission/student-academic-record',
            },
            // {
            //     id: 7,
            //     label: 'Student Academic View',
            //     link: 'admission/student-academic-view',
            // },
            {
                id: 5,
                label: 'Admission Cancellation',
                link: 'admission/cancellation-list',
            },
          
            {
                id: 8,
                label: 'Section Allotment',
                parentId: 6,
                link: 'subject/section-allotment',
            },
            {
                id: 9,
                label: 'Section Roll Number Allotment',
                parentId: 6,
                link: 'subject/roll-number-allotment',
            },
            {
                id: 2,
                label: 'Admission  Report',
                parentId: 3,
                subItems: [
        
        
                    {
                        id: 1,
                        label: ' Roll Number Report',
                        link: 'admission/roll-number-report',
                    },
                    {
                        id: 2,
                        label: 'Admission Cancelled Report',
                        link: 'admission/admission-report',
                    },
                    {
                        id: 3,
                        label: 'Student Address Report',
                        link: 'admission/student-address-report',
                    },
        
        
                ]
            },
        ]
    },
    {
        id: 3,
        label: 'Masters',
        subItems: [

            {
                id: 2,
                label: 'Academic Master',
                parentId: 3,
                subItems: [
                    {
                        id: 20,
                        label: 'Academic Year',
                        link: 'academic-master/academic-year',
                        parentId: 3,

                    },
                    {
                        id: 1,
                        label: 'Admission Category',
                        link: 'academic-master/admisson-category',
                        parentId: 3,

                    },
                    // {
                    //     id: 2,
                    //     label: 'Academic Session',
                    //     link: 'academic-master/academic-session-list',
                    //     parentId: 3,

                    // },
                    // {
                    //     id: 3,
                    //     label: 'Academic Batch',
                    //     link: 'academic-master/academic-batch',
                    //     parentId: 2,

                    // },    
                    {
                        id: 4,
                        label: 'Board',
                        link: 'academic-master/board',
                        parentId: 3,

                    },
                    // {
                    //     id: 5,
                    //     label: 'Branch',
                    //     link: 'academic-master/branch',
                    //     parentId: 2,

                    // },
                    // {
                    //     id: 6,
                    //     label: 'Batch',
                    //     link: 'academic-master/batch',
                    //     parentId: 2,

                    // },
                    {
                        id: 7,
                        label: 'Class Room',
                        link: 'academic-master/class-room',
                        parentId: 2,

                    },
                    {
                        id: 8,
                        label: 'Day Master',
                        link: 'academic-master/day-master-list',
                        parentId: 2,

                    },
                    // {
                    //     id: 9,
                    //     label: 'Degree',
                    //     link: 'academic-master/degree',
                    //     parentId: 2,

                    // },

                    {
                        id: 10,
                        label: 'Standard',
                        link: 'common-master/standard',
                        parentId: 3,

                    },
                    {
                        id: 11,
                        label: 'Section',
                        link: 'common-master/section',
                        parentId: 3,

                    },
                    // {
                    //     id: 12,
                    //     label: 'Semester',
                    //     link: 'academic-master/semesterlist',
                    //     parentId: 2,

                    // },
                    {
                        id: 13,
                        label: 'Subject',
                        link: 'academic-master/subject',
                        parentId: 2,

                    },
                    // {
                    //     id: 14,
                    //     label: 'Scheme',
                    //     link: 'academic-master/scheme',
                    //     parentId: 2,

                    // },
                    {
                        id: 15,
                        label: 'Session',
                        link: 'academic-master/session',
                        parentId: 2,

                    },
                    {
                        id: 16,
                        label: 'Session Type',
                        link: 'academic-master/session-type',
                        parentId: 2,
                    },
                    {
                        id: 17,
                        label: 'Exam',
                        link: 'academic-master/exam',
                        parentId: 2,
                    },
                    // {
                    //     id: 17,
                    //     label: 'Shift',
                    //     link: 'academic-master/shift',
                    //     parentId: 2,

                    // },
                    // {
                    //     id: 18,
                    //     label: 'Term',
                    //     link: 'academic-master/term',
                    //     parentId: 2,
                    // },
                    // {
                    //     id: 19,
                    //     label: 'Year',
                    //     link: 'academic-master/yearlist',
                    //     parentId: 2,

                    // }, 
                ]

            },
            {
                id: 3,
                label: 'Common Master',
                parentId: 3,
                subItems: [

                    {
                        id: 18,
                        label: 'Admission Common Document',
                        link: 'common-master/addmission-common-document',
                        parentId: 3,

                    },

                    {
                        id: 2,
                        label: 'Blood Group',
                        link: 'common-master/blood-group',
                        parentId: 3,

                    },
                    {
                        id: 3,
                        label: 'Category',
                        link: 'common-master/category',
                        parentId: 3,

                    },
                    {
                        id: 4,
                        label: 'Caste',
                        link: 'common-master/caste',
                        parentId: 3,

                    },
                    {
                        id: 5,
                        label: 'Country',
                        link: 'common-master/country',
                        parentId: 3,

                    },
                    {
                        id: 6,
                        label: 'City',
                        link: 'common-master/city',
                        parentId: 3,

                    },
                    {
                        id: 7,
                        label: 'Document',
                        link: 'common-master/document',
                        parentId: 3,

                    },
                    {
                        id: 8,

                        label: 'Department',
                        link: 'common-master/department',
                        parentId: 3,

                    },
                    {
                        id: 9,

                        label: 'Grading',
                        link: 'common-master/grade-list',
                        parentId: 3,

                    },
                    {
                        id: 10,

                        label: 'Holiday',
                        link: 'common-master/holiday-list',
                        parentId: 3,

                    },
                    {
                        id: 11,
                        label: 'Job Type',
                        link: 'common-master/job-type',
                        parentId: 3,

                    },
                    {
                        id: 12,
                        label: 'Location',
                        link: 'common-master/location',
                        parentId: 3,

                    },
                    {
                        id: 13,
                        label: 'Mother Tongue',
                        link: 'common-master/mother-tongue',
                        parentId: 3,

                    },
                    {
                        id: 14,
                        label: 'Occupation',
                        link: 'common-master/occupation',
                        parentId: 3,

                    },
                    {
                        id: 15,
                        label: 'Religion',
                        link: 'common-master/religion',
                        parentId: 3,

                    },
                    {
                        id: 16,
                        label: 'State',
                        link: 'common-master/state',
                        parentId: 3,

                    },
                ]
            },
            {
                id: 4,
                label: 'Transport',
                parentId: 3,
                subItems: [
                    {
                        id: 3,
                        label: 'Vehicle',
                        parentId: 5,
                        link: 'transport/vehicle',
                    },

                    {
                        id: 4,
                        label: 'Drivers',
                        parentId: 5,
                        link: 'transport/drivers',
                    },

                ]
            },
        ]
    },
    {
        id: 4,
        label: 'Finance',
        subItems: [

            {
        id: 2,
        label: 'Master',
        parentId: 3,
        subItems: [


            {
                id: 1,
                label: 'Fee Master',
                parentId: 3,
                link: 'finance/fee-list',
            },

            {
                id: 2,
                label: 'Standard Fee',
                link: 'standard/new',
                parentId: 3,
            },

            {
                id: 3,
                label: 'Academic Fee Master',
                link: 'standard/acadamic-fee',
                parentId: 3,
            },


        ]
    },

    {
        id: 4,
        label: 'Fee Collection',
        parentId: 3,
        link: 'fee/fee-collection',
    },
    {
        id: 5,
        label: 'Fee Collection Report',
        parentId: 3,
        link: 'fee/fee-collection-report',
    },
    {
        id: 6,
        label: 'Fee Collection Counter',
        link: 'common-master/fee-collection-counter',
        parentId: 3,

    },
    {
        id: 7,
        label: 'Outstanding Fee Report',
        link: 'admission/outstanding-fee-report',
        parentId: 3,

    },
    {
        id: 8,
        label: 'Term Fee Report',
        link: 'admission/term-fee-report',
        parentId: 3,

    },
]
},

    {
        id: 5,
        label: 'Transport',
        subItems: [
            {
                id: 1,
                label: 'Route',
                parentId: 5,
                link: 'transport/route-list',
            },
            // {
            //     id: 3,
            //     label: 'Route Mapping',
            //     parentId: 5,
            //     link: 'transport/busroutemap',

            // },

            {
                id: 5,
                label: 'Route Allotment',
                parentId: 5,
                link: 'transport/route-allotment',

            },


        ]
    },

    {
        id: 6,
        label: 'Subject',
        subItems: [
            {
                id: 1,
                label: 'Subject Offering',
                parentId: 6,
                link: 'subject/subject-offering',
            },
            // {
            //     id: 2,
            //     label: 'Time Table',
            //     parentId: 6,
            //     link: 'subject/timetable',
            // },
            // {
            //     id: 3,
            //     label: 'Student Mark Entry',
            //     parentId: 6,
            //     link: 'subject/student-mark-entry',
            // },
            // {
            //     id: 4,
            //     label: 'Exam Allotment',
            //     parentId: 6,
            //     link: 'subject/exam-entry',
            // },


        ]
    },
    
    {
        id: 7,
        label: 'Exam',
        subItems: [
            {
                id: 1,
                label: 'Exam Schedule',
                parentId: 7,
                link: 'exam/exam-schedule',
            },
            {
                id: 2,
                label: 'Manage Exam Time Table',
                parentId: 6,
                link: 'exam/manage-exam-time-table',
            },
            {
                id: 3,
                label: 'Student Mark Entry',
                parentId: 6,
                link: 'exam/mark-entry',
            },
            {
                id: 4,
                label: 'Result Publish',
                parentId: 6,
                link: 'exam/result-publish',
            },
            {
                id: 5,
                label: 'Student Promotion',
                parentId: 7,
                link: 'exam/student-promotion',
            },
          


        ]
    },
{
    id:8,
    label: 'Notification',
    link:'notification/notification-list'
},


];





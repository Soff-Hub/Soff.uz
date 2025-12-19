// Mock data - in a real app, this would come from a database
const mockChats = [
    {
        chat_id: 3146,
        opponent_id: 25367,
        opponent_name: 'Oddiy Bola',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/ChatGPT_Image_Nov_18_2025_11_45_31_PM.png',
        last_message: {
            content:
                'Assalomu alaykum sizga taqdimot yasab beraymi sizga qaysi mavzudagi taqdimot kerak mavzusini yozsangiz siz xohlaganingizdek qilib yasab beraman',
            created_at: '2025-12-15T21:00:57.201698+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 563,
        opponent_id: 193695,
        opponent_name: "Abdumo'min Abdurasulov",
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/ChatGPT_Image_Jul_4_2025_09_40_35_PM_wRbcqfd.png',
        last_message: {
            content: "yo' wassup",
            created_at: '2025-12-15T10:22:44.808018+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 3126,
        opponent_id: 2448,
        opponent_name: 'Lutsifer Seller',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/1000107484.png',
        last_message: {
            content:
                'Mustaqil ish, referat, kurs ishlari buyicha yotdamlar kerak bulsa aytingizar',
            created_at: '2025-12-15T09:45:14.773221+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 3144,
        opponent_id: 37352,
        opponent_name: 'Asadbek Sharifjonov',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/542a61acc76e4ceda1a40bf6273b3a08.jpg',
        last_message: {
            content: 'Men hech kimga yozmadimku',
            created_at: '2025-12-14T12:36:10.073515+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 3121,
        opponent_id: 299174,
        opponent_name: 'Sotuvchi 299174',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/d13c63ff-e27c-434b-9c4b-1c8736a89258.jpg',
        last_message: {
            content: 'ha tushunarli',
            created_at: '2025-12-13T18:01:35.723516+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 1229,
        opponent_id: 171024,
        opponent_name: 'Islombek',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/1e8cc1c7-6b7f-4082-9de0-bd1c6021cb89.jpg',
        last_message: {
            content:
                '███████╗   ██████╗   ███████╗███████╗\n██╔════╝██╔═══██╗ ██╔════╝██╔════╝\n███████╗██║        ██║ █████╗  █████╗  \n   ════██║██║        ██║ ██╔══╝  ██╔══╝  \n███████║╚██████╔╝  ██║     ██║     ',
            created_at: '2025-12-10T10:00:21.804196+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 1325,
        opponent_id: 216402,
        opponent_name: 'Muhammadamin Rahimjonov',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/7c142b03-091e-445e-96bf-9862475f9edd.jpg',
        last_message: {
            content: 'Аха хўп',
            created_at: '2025-11-20T09:34:16.123293+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 1327,
        opponent_id: 189805,
        opponent_name: 'Fotima Jamolova',
        opponent_photo_url: null,
        last_message: {
            content: 'sakjs',
            created_at: '2025-11-20T06:36:00.997850+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 949,
        opponent_id: 148,
        opponent_name: 'Sotuvchi 911 vor zakon',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/IMG_0005.JPG',
        last_message: {
            content: null,
            created_at: '2025-11-07T05:38:28.088325+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 441,
        opponent_id: 30,
        opponent_name: 'Zufarbek Abdurakhmonov',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/2024-03-21_19.44.12.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 1429,
        opponent_id: 104373,
        opponent_name: 'Islomjon Referatlar olami',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/1000047145.png',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 1430,
        opponent_id: 91515,
        opponent_name: 'Khayatova M.',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/5a8d74e5-05c7-4c02-855f-6bbfae502b02.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 1431,
        opponent_id: 3178,
        opponent_name: 'Kompyuter Xizmatlari',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/3873da32-c98a-412d-b256-b8b711b2cc88.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 1427,
        opponent_id: 152555,
        opponent_name: 'Mohinur Yahyoxonova',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/d16e0e37-c520-4067-9f96-a2d92864bd88.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3106,
        opponent_id: 209443,
        opponent_name: 'Shohjaxon Mamajonov',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/5f2c16bb-0082-4e34-9a4b-2fba2c02f4fa.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3111,
        opponent_id: 144952,
        opponent_name: 'Begimov Farshed',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/23e5c720-9768-406d-8a61-c5c657f019b5.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3112,
        opponent_id: 268309,
        opponent_name: 'Akobir Normurodov',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/30813ed7-de9a-4b35-bff5-c7dc95c5743a.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3124,
        opponent_id: 231314,
        opponent_name: 'Shohruh Abdugʻaniyev',
        opponent_photo_url: null,
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3153,
        opponent_id: 164,
        opponent_name: 'Farzona 164',
        opponent_photo_url: null,
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3324,
        opponent_id: 8262,
        opponent_name: 'Soff Talaba 6',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/images_Hz41f4d.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3472,
        opponent_id: 224921,
        opponent_name: 'Nilufar Axmedova',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/d0027bd2-e88f-4d3a-a1fb-d92e479fdfd5.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3473,
        opponent_id: 101345,
        opponent_name: 'DURDONA 101345',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/scale_1200.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3474,
        opponent_id: 1388,
        opponent_name: 'Odilbek Nazarovich 1388',
        opponent_photo_url:
            'https://d2co7bxjtnp5o.cloudfront.net/media/users/1000017405.jpg',
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 3757,
        opponent_id: 45,
        opponent_name: 'Shoira Xursandova',
        opponent_photo_url: null,
        last_message: {
            content: null,
            created_at: null,
        },
        unread_count: 0,
    },
    {
        chat_id: 4,
        opponent_id: 163672,
        opponent_name: "Abdumo'min NaN",
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/ChatGPT_Image_Jul_4_2025_09_40_35_PM_XsDlPsg.png',
        last_message: {
            content: 'asd',
            created_at: '2025-12-16T06:33:26.274829+00:00',
        },
        unread_count: 5,
    },
    {
        chat_id: 5,
        opponent_id: 152,
        opponent_name: 'Sotuvchi 152',
        opponent_photo_url: null,
        last_message: {
            content: 'nima gapla',
            created_at: '2025-12-13T10:02:54.107388+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 6,
        opponent_id: 148,
        opponent_name: 'Sotuvchi 911 vor zakon',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/ChatGPT_Image_Jul_4_2025_09_40_35_PM_oD6vo7B.png',
        last_message: {
            content: "unaqa qimmat bo'midide",
            created_at: '2025-12-13T10:01:49.317146+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 7,
        opponent_id: 200,
        opponent_name: 'John Doe',
        opponent_photo_url: null,
        last_message: {
            content: 'Hello, how are you?',
            created_at: '2025-12-15T08:20:10.123456+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 8,
        opponent_id: 201,
        opponent_name: 'Jane Smith',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar1.png',
        last_message: {
            content: 'Thanks for your help!',
            created_at: '2025-12-14T14:15:30.456789+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 9,
        opponent_id: 202,
        opponent_name: 'Bob Johnson',
        opponent_photo_url: null,
        last_message: {
            content: 'Can we meet tomorrow?',
            created_at: '2025-12-12T09:45:20.789012+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 10,
        opponent_id: 203,
        opponent_name: 'Alice Williams',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar2.png',
        last_message: {
            content: 'The project looks great!',
            created_at: '2025-12-11T16:30:45.234567+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 11,
        opponent_id: 204,
        opponent_name: 'Charlie Brown',
        opponent_photo_url: null,
        last_message: {
            content: 'See you later!',
            created_at: '2025-12-10T11:20:15.345678+00:00',
        },
        unread_count: 3,
    },
    {
        chat_id: 12,
        opponent_id: 205,
        opponent_name: 'Diana Prince',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar3.png',
        last_message: {
            content: 'Perfect timing!',
            created_at: '2025-12-09T13:55:30.567890+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 13,
        opponent_id: 206,
        opponent_name: 'Edward Norton',
        opponent_photo_url: null,
        last_message: {
            content: "Let's discuss this further",
            created_at: '2025-12-08T10:10:10.678901+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 14,
        opponent_id: 207,
        opponent_name: 'Fiona Apple',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar4.png',
        last_message: {
            content: "I'll send it soon",
            created_at: '2025-12-07T15:25:40.789012+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 15,
        opponent_id: 208,
        opponent_name: 'George Lucas',
        opponent_photo_url: null,
        last_message: {
            content: 'Great idea!',
            created_at: '2025-12-06T09:40:25.890123+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 16,
        opponent_id: 209,
        opponent_name: 'Helen Mirren',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar5.png',
        last_message: {
            content: 'Thanks a lot!',
            created_at: '2025-12-05T12:15:50.901234+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 17,
        opponent_id: 210,
        opponent_name: 'Ian McKellen',
        opponent_photo_url: null,
        last_message: {
            content: 'Looking forward to it',
            created_at: '2025-12-04T14:30:15.012345+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 18,
        opponent_id: 211,
        opponent_name: 'Julia Roberts',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar6.png',
        last_message: {
            content: 'Sounds good!',
            created_at: '2025-12-03T11:45:30.123456+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 19,
        opponent_id: 212,
        opponent_name: 'Kevin Spacey',
        opponent_photo_url: null,
        last_message: {
            content: "I'll check it out",
            created_at: '2025-12-02T16:20:45.234567+00:00',
        },
        unread_count: 4,
    },
    {
        chat_id: 20,
        opponent_id: 213,
        opponent_name: 'Laura Dern',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar7.png',
        last_message: {
            content: 'Perfect!',
            created_at: '2025-12-01T10:10:20.345678+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 21,
        opponent_id: 214,
        opponent_name: 'Michael Fassbender',
        opponent_photo_url: null,
        last_message: {
            content: 'Let me know when ready',
            created_at: '2025-11-30T13:35:55.456789+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 22,
        opponent_id: 215,
        opponent_name: 'Natalie Portman',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar8.png',
        last_message: {
            content: 'I agree completely',
            created_at: '2025-11-29T09:25:40.567890+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 23,
        opponent_id: 216,
        opponent_name: 'Oscar Isaac',
        opponent_photo_url: null,
        last_message: {
            content: 'That works for me',
            created_at: '2025-11-28T15:50:25.678901+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 24,
        opponent_id: 217,
        opponent_name: 'Sarah Connor',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar9.png',
        last_message: {
            content: 'Can you help me with this?',
            created_at: '2025-11-27T10:20:15.123456+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 25,
        opponent_id: 218,
        opponent_name: 'Tom Hanks',
        opponent_photo_url: null,
        last_message: {
            content: 'Thanks for everything!',
            created_at: '2025-11-26T14:45:30.234567+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 26,
        opponent_id: 219,
        opponent_name: 'Emma Watson',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar10.png',
        last_message: {
            content: 'I need more information',
            created_at: '2025-11-25T09:30:45.345678+00:00',
        },
        unread_count: 3,
    },
    {
        chat_id: 27,
        opponent_id: 220,
        opponent_name: 'Chris Evans',
        opponent_photo_url: null,
        last_message: {
            content: 'When can we schedule?',
            created_at: '2025-11-24T16:15:20.456789+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 28,
        opponent_id: 221,
        opponent_name: 'Scarlett Johansson',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar11.png',
        last_message: {
            content: 'Perfect, thank you!',
            created_at: '2025-11-23T11:50:10.567890+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 29,
        opponent_id: 222,
        opponent_name: 'Robert Downey Jr',
        opponent_photo_url: null,
        last_message: {
            content: 'Let me think about it',
            created_at: '2025-11-22T13:25:35.678901+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 30,
        opponent_id: 223,
        opponent_name: 'Jennifer Lawrence',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar12.png',
        last_message: {
            content: 'I will get back to you',
            created_at: '2025-11-21T08:40:50.789012+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 31,
        opponent_id: 224,
        opponent_name: 'Leonardo DiCaprio',
        opponent_photo_url: null,
        last_message: {
            content: 'Sounds like a plan',
            created_at: '2025-11-20T15:10:25.890123+00:00',
        },
        unread_count: 4,
    },
    {
        chat_id: 32,
        opponent_id: 225,
        opponent_name: 'Margot Robbie',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar13.png',
        last_message: {
            content: 'Looking forward to it',
            created_at: '2025-11-19T10:55:40.901234+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 33,
        opponent_id: 226,
        opponent_name: 'Ryan Gosling',
        opponent_photo_url: null,
        last_message: {
            content: 'Can we discuss this?',
            created_at: '2025-11-18T12:30:15.012345+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 34,
        opponent_id: 227,
        opponent_name: 'Gal Gadot',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar14.png',
        last_message: {
            content: 'I appreciate your help',
            created_at: '2025-11-17T09:15:30.123456+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 35,
        opponent_id: 228,
        opponent_name: 'Brad Pitt',
        opponent_photo_url: null,
        last_message: {
            content: 'That makes sense',
            created_at: '2025-11-16T14:20:45.234567+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 36,
        opponent_id: 229,
        opponent_name: 'Angelina Jolie',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar15.png',
        last_message: {
            content: 'I need to check something',
            created_at: '2025-11-15T11:45:20.345678+00:00',
        },
        unread_count: 3,
    },
    {
        chat_id: 37,
        opponent_id: 230,
        opponent_name: 'Will Smith',
        opponent_photo_url: null,
        last_message: {
            content: 'Thanks for the update',
            created_at: '2025-11-14T16:10:35.456789+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 38,
        opponent_id: 231,
        opponent_name: 'Zendaya',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar16.png',
        last_message: {
            content: 'Perfect timing!',
            created_at: '2025-11-13T08:25:50.567890+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 39,
        opponent_id: 232,
        opponent_name: 'Tom Cruise',
        opponent_photo_url: null,
        last_message: {
            content: 'I will review it',
            created_at: '2025-11-12T13:50:15.678901+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 40,
        opponent_id: 233,
        opponent_name: 'Nicole Kidman',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar17.png',
        last_message: {
            content: 'Let me know your thoughts',
            created_at: '2025-11-11T10:35:30.789012+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 41,
        opponent_id: 234,
        opponent_name: 'Matt Damon',
        opponent_photo_url: null,
        last_message: {
            content: 'I agree with you',
            created_at: '2025-11-10T15:20:45.890123+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 42,
        opponent_id: 235,
        opponent_name: 'Anne Hathaway',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar18.png',
        last_message: {
            content: 'That sounds great',
            created_at: '2025-11-09T09:55:10.901234+00:00',
        },
        unread_count: 4,
    },
    {
        chat_id: 43,
        opponent_id: 236,
        opponent_name: 'Chris Hemsworth',
        opponent_photo_url: null,
        last_message: {
            content: 'Can you send me details?',
            created_at: '2025-11-08T12:40:25.012345+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 44,
        opponent_id: 237,
        opponent_name: 'Charlize Theron',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar19.png',
        last_message: {
            content: 'I will do that',
            created_at: '2025-11-07T14:15:40.123456+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 45,
        opponent_id: 238,
        opponent_name: 'Hugh Jackman',
        opponent_photo_url: null,
        last_message: {
            content: 'Thanks for understanding',
            created_at: '2025-11-06T11:30:55.234567+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 46,
        opponent_id: 239,
        opponent_name: 'Cate Blanchett',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar20.png',
        last_message: {
            content: 'I need more time',
            created_at: '2025-11-05T08:45:20.345678+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 47,
        opponent_id: 240,
        opponent_name: 'Jake Gyllenhaal',
        opponent_photo_url: null,
        last_message: {
            content: 'That works for me',
            created_at: '2025-11-04T16:20:35.456789+00:00',
        },
        unread_count: 3,
    },
    {
        chat_id: 48,
        opponent_id: 241,
        opponent_name: 'Amy Adams',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar21.png',
        last_message: {
            content: 'I appreciate it',
            created_at: '2025-11-03T10:55:50.567890+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 49,
        opponent_id: 242,
        opponent_name: 'Ryan Reynolds',
        opponent_photo_url: null,
        last_message: {
            content: 'Let me check',
            created_at: '2025-11-02T13:10:15.678901+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 50,
        opponent_id: 243,
        opponent_name: 'Jessica Chastain',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar22.png',
        last_message: {
            content: 'I will get back to you',
            created_at: '2025-11-01T09:25:30.789012+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 51,
        opponent_id: 244,
        opponent_name: 'Idris Elba',
        opponent_photo_url: null,
        last_message: {
            content: 'Sounds perfect',
            created_at: '2025-10-31T15:40:45.890123+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 52,
        opponent_id: 245,
        opponent_name: "Lupita Nyong'o",
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar23.png',
        last_message: {
            content: 'I need your help',
            created_at: '2025-10-30T11:15:10.901234+00:00',
        },
        unread_count: 4,
    },
    {
        chat_id: 53,
        opponent_id: 246,
        opponent_name: 'Benedict Cumberbatch',
        opponent_photo_url: null,
        last_message: {
            content: 'That is interesting',
            created_at: '2025-10-29T14:50:25.012345+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 54,
        opponent_id: 247,
        opponent_name: 'Tilda Swinton',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar24.png',
        last_message: {
            content: 'I will consider it',
            created_at: '2025-10-28T08:35:40.123456+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 55,
        opponent_id: 248,
        opponent_name: 'Michael B. Jordan',
        opponent_photo_url: null,
        last_message: {
            content: 'Thanks for the info',
            created_at: '2025-10-27T12:20:55.234567+00:00',
        },
        unread_count: 3,
    },
    {
        chat_id: 56,
        opponent_id: 249,
        opponent_name: 'Viola Davis',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar25.png',
        last_message: {
            content: 'I understand now',
            created_at: '2025-10-26T10:45:20.345678+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 57,
        opponent_id: 250,
        opponent_name: 'Keanu Reeves',
        opponent_photo_url: null,
        last_message: {
            content: 'That is helpful',
            created_at: '2025-10-25T16:10:35.456789+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 58,
        opponent_id: 251,
        opponent_name: 'Saoirse Ronan',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar26.png',
        last_message: {
            content: 'I will try that',
            created_at: '2025-10-24T09:55:50.567890+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 59,
        opponent_id: 252,
        opponent_name: 'Timothée Chalamet',
        opponent_photo_url: null,
        last_message: {
            content: 'Let me know when ready',
            created_at: '2025-10-23T13:30:15.678901+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 60,
        opponent_id: 253,
        opponent_name: 'Florence Pugh',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar27.png',
        last_message: {
            content: 'I agree completely',
            created_at: '2025-10-22T11:15:30.789012+00:00',
        },
        unread_count: 5,
    },
    {
        chat_id: 61,
        opponent_id: 254,
        opponent_name: 'Adam Driver',
        opponent_photo_url: null,
        last_message: {
            content: 'That makes sense',
            created_at: '2025-10-21T14:40:45.890123+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 62,
        opponent_id: 255,
        opponent_name: 'Anya Taylor-Joy',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar28.png',
        last_message: {
            content: 'I will check it out',
            created_at: '2025-10-20T08:25:10.901234+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 63,
        opponent_id: 256,
        opponent_name: 'Paul Rudd',
        opponent_photo_url: null,
        last_message: {
            content: 'Thanks for everything',
            created_at: '2025-10-19T15:50:25.012345+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 64,
        opponent_id: 257,
        opponent_name: 'Rachel McAdams',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar29.png',
        last_message: {
            content: 'I need more details',
            created_at: '2025-10-18T10:35:40.123456+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 65,
        opponent_id: 258,
        opponent_name: 'Mark Ruffalo',
        opponent_photo_url: null,
        last_message: {
            content: 'That is perfect',
            created_at: '2025-10-17T12:20:55.234567+00:00',
        },
        unread_count: 3,
    },
    {
        chat_id: 66,
        opponent_id: 259,
        opponent_name: 'Elizabeth Olsen',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar30.png',
        last_message: {
            content: 'I will do that',
            created_at: '2025-10-16T09:45:20.345678+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 67,
        opponent_id: 260,
        opponent_name: 'Jeremy Renner',
        opponent_photo_url: null,
        last_message: {
            content: 'Let me think about it',
            created_at: '2025-10-15T14:10:35.456789+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 68,
        opponent_id: 261,
        opponent_name: 'Brie Larson',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar31.png',
        last_message: {
            content: 'I appreciate your help',
            created_at: '2025-10-14T11:55:50.567890+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 69,
        opponent_id: 262,
        opponent_name: 'Don Cheadle',
        opponent_photo_url: null,
        last_message: {
            content: 'That sounds good',
            created_at: '2025-10-13T16:30:15.678901+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 70,
        opponent_id: 263,
        opponent_name: 'Tessa Thompson',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar32.png',
        last_message: {
            content: 'I will review it',
            created_at: '2025-10-12T08:15:30.789012+00:00',
        },
        unread_count: 4,
    },
    {
        chat_id: 71,
        opponent_id: 264,
        opponent_name: 'Anthony Mackie',
        opponent_photo_url: null,
        last_message: {
            content: 'Thanks for the update',
            created_at: '2025-10-11T13:40:45.890123+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 72,
        opponent_id: 265,
        opponent_name: 'Letitia Wright',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar33.png',
        last_message: {
            content: 'I need to check something',
            created_at: '2025-10-10T10:25:10.901234+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 73,
        opponent_id: 266,
        opponent_name: 'Sebastian Stan',
        opponent_photo_url: null,
        last_message: {
            content: 'That works for me',
            created_at: '2025-10-09T15:50:25.012345+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 74,
        opponent_id: 267,
        opponent_name: 'Karen Gillan',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar34.png',
        last_message: {
            content: 'I will get back to you',
            created_at: '2025-10-08T09:35:40.123456+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 75,
        opponent_id: 268,
        opponent_name: 'Dave Bautista',
        opponent_photo_url: null,
        last_message: {
            content: 'Perfect timing!',
            created_at: '2025-10-07T12:20:55.234567+00:00',
        },
        unread_count: 3,
    },
    {
        chat_id: 76,
        opponent_id: 269,
        opponent_name: 'Pom Klementieff',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar35.png',
        last_message: {
            content: 'I understand now',
            created_at: '2025-10-06T08:45:20.345678+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 77,
        opponent_id: 270,
        opponent_name: 'Tom Holland',
        opponent_photo_url: null,
        last_message: {
            content: 'That is helpful',
            created_at: '2025-10-05T14:10:35.456789+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 78,
        opponent_id: 271,
        opponent_name: 'Zoe Saldana',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar36.png',
        last_message: {
            content: 'I will try that',
            created_at: '2025-10-04T11:55:50.567890+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 79,
        opponent_id: 272,
        opponent_name: 'Bradley Cooper',
        opponent_photo_url: null,
        last_message: {
            content: 'Let me know your thoughts',
            created_at: '2025-10-03T16:30:15.678901+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 80,
        opponent_id: 273,
        opponent_name: 'Lady Gaga',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar37.png',
        last_message: {
            content: 'I agree with you',
            created_at: '2025-10-02T09:15:30.789012+00:00',
        },
        unread_count: 5,
    },
    {
        chat_id: 81,
        opponent_id: 274,
        opponent_name: 'Rami Malek',
        opponent_photo_url: null,
        last_message: {
            content: 'That sounds great',
            created_at: '2025-10-01T13:40:45.890123+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 82,
        opponent_id: 275,
        opponent_name: 'Emma Stone',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar38.png',
        last_message: {
            content: 'Can you send me details?',
            created_at: '2025-09-30T10:25:10.901234+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 83,
        opponent_id: 276,
        opponent_name: 'Andrew Garfield',
        opponent_photo_url: null,
        last_message: {
            content: 'I will do that',
            created_at: '2025-09-29T15:50:25.012345+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 84,
        opponent_id: 277,
        opponent_name: 'Rachel Zegler',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar39.png',
        last_message: {
            content: 'Thanks for understanding',
            created_at: '2025-09-28T08:35:40.123456+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 85,
        opponent_id: 278,
        opponent_name: 'Jacob Elordi',
        opponent_photo_url: null,
        last_message: {
            content: 'I need more time',
            created_at: '2025-09-27T12:20:55.234567+00:00',
        },
        unread_count: 3,
    },
    {
        chat_id: 86,
        opponent_id: 279,
        opponent_name: 'Sydney Sweeney',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar40.png',
        last_message: {
            content: 'That works for me',
            created_at: '2025-09-26T09:45:20.345678+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 87,
        opponent_id: 280,
        opponent_name: 'Barry Keoghan',
        opponent_photo_url: null,
        last_message: {
            content: 'I appreciate it',
            created_at: '2025-09-25T14:10:35.456789+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 88,
        opponent_id: 281,
        opponent_name: 'Ayo Edebiri',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar41.png',
        last_message: {
            content: 'Let me check',
            created_at: '2025-09-24T11:55:50.567890+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 89,
        opponent_id: 282,
        opponent_name: 'Paul Mescal',
        opponent_photo_url: null,
        last_message: {
            content: 'I will get back to you',
            created_at: '2025-09-23T16:30:15.678901+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 90,
        opponent_id: 283,
        opponent_name: 'Jenna Ortega',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar42.png',
        last_message: {
            content: 'Sounds perfect',
            created_at: '2025-09-22T08:15:30.789012+00:00',
        },
        unread_count: 4,
    },
    {
        chat_id: 91,
        opponent_id: 284,
        opponent_name: 'Pedro Pascal',
        opponent_photo_url: null,
        last_message: {
            content: 'I need your help',
            created_at: '2025-09-21T13:40:45.890123+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 92,
        opponent_id: 285,
        opponent_name: 'Bella Ramsey',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar43.png',
        last_message: {
            content: 'That is interesting',
            created_at: '2025-09-20T10:25:10.901234+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 93,
        opponent_id: 286,
        opponent_name: 'Oscar Kightley',
        opponent_photo_url: null,
        last_message: {
            content: 'I will consider it',
            created_at: '2025-09-19T15:50:25.012345+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 94,
        opponent_id: 287,
        opponent_name: 'Rhys Darby',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar44.png',
        last_message: {
            content: 'Thanks for the info',
            created_at: '2025-09-18T09:35:40.123456+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 95,
        opponent_id: 288,
        opponent_name: 'Taika Waititi',
        opponent_photo_url: null,
        last_message: {
            content: 'I understand now',
            created_at: '2025-09-17T12:20:55.234567+00:00',
        },
        unread_count: 3,
    },
    {
        chat_id: 96,
        opponent_id: 289,
        opponent_name: 'Jemaine Clement',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar45.png',
        last_message: {
            content: 'That is helpful',
            created_at: '2025-09-16T08:45:20.345678+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 97,
        opponent_id: 290,
        opponent_name: 'Bret McKenzie',
        opponent_photo_url: null,
        last_message: {
            content: 'I will try that',
            created_at: '2025-09-15T14:10:35.456789+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 98,
        opponent_id: 291,
        opponent_name: "Conan O'Brien",
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar46.png',
        last_message: {
            content: 'Let me know when ready',
            created_at: '2025-09-14T11:55:50.567890+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 99,
        opponent_id: 292,
        opponent_name: 'Stephen Colbert',
        opponent_photo_url: null,
        last_message: {
            content: 'I agree completely',
            created_at: '2025-09-13T16:30:15.678901+00:00',
        },
        unread_count: 1,
    },
    {
        chat_id: 100,
        opponent_id: 293,
        opponent_name: 'Jimmy Fallon',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar47.png',
        last_message: {
            content: 'That makes sense',
            created_at: '2025-09-12T09:15:30.789012+00:00',
        },
        unread_count: 4,
    },
    {
        chat_id: 101,
        opponent_id: 294,
        opponent_name: 'John Oliver',
        opponent_photo_url: null,
        last_message: {
            content: 'I will check it out',
            created_at: '2025-09-11T13:40:45.890123+00:00',
        },
        unread_count: 0,
    },
    {
        chat_id: 102,
        opponent_id: 295,
        opponent_name: 'Trevor Noah',
        opponent_photo_url:
            'https://test-soffuz.s3.amazonaws.com/media/users/avatar48.png',
        last_message: {
            content: 'Thanks for everything',
            created_at: '2025-09-10T10:25:10.901234+00:00',
        },
        unread_count: 2,
    },
    {
        chat_id: 103,
        opponent_id: 296,
        opponent_name: 'Samantha Bee',
        opponent_photo_url: null,
        last_message: {
            content: 'I need more details',
            created_at: '2025-09-09T15:50:25.012345+00:00',
        },
        unread_count: 0,
    },
];

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get query parameters
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Validate pagination parameters
        if (page < 1) {
            return res
                .status(400)
                .json({ error: 'Page must be greater than 0' });
        }
        if (limit < 1 || limit > 100) {
            return res
                .status(400)
                .json({ error: 'Limit must be between 1 and 100' });
        }

        // Filter by search term (case-insensitive)
        let filteredChats = mockChats;
        if (search) {
            const searchLower = search.toLowerCase();
            filteredChats = mockChats.filter(
                (chat) =>
                    chat.opponent_name.toLowerCase().includes(searchLower) ||
                    chat.last_message.content
                        .toLowerCase()
                        .includes(searchLower)
            );
        }

        // Calculate pagination
        const total = filteredChats.length;
        const totalPages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const results = filteredChats.slice(startIndex, endIndex);

        // Determine pagination flags
        const has_next_page = page < totalPages;
        const has_previous_page = page > 1;

        // Return paginated response
        return res.status(200).json({
            total,
            page,
            limit,
            has_next_page,
            has_previous_page,
            results,
        });
    } catch (error) {
        console.error('Chats API error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

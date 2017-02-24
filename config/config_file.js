var cloudinary = require('cloudinary');
var config = {

    homepage_sections: [

        {

            title: 'Sightseeing',
            categories: [{
                title: 'Historic Sites',
                category: 'Historic_Sites',
                image: '/dist/finalImages/sightseeing/historical_sites.jpg'
            }, {
                title: 'Religious Sites',
                category: 'Religious_sites',
                image: '/dist/finalImages/sightseeing/religious_sites.jpg'
            }, {
                title: 'Art Galleries & Museums',
                category: 'Art_Galleries_Museums',
                image: '/dist/finalImages/sightseeing/museums.jpg'
            }, {
                title: 'Landmarks',
                category: 'Landmarks',
                image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,w_450/v1484334025/landmarks_generic_lc8mjo.png'
            }, {
                title: 'Village',
                category: 'Villages',
                image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,w_450/v1484334318/villages_generic_nxl2g9.png'
            }],
            sub_cat: [{
                    title: 'Featured in Sightseeing',
                    content: [{
                            title: 'Tanah Lot Temple',
                            url: "/activity/588094299ab25c109837256b",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484039308/tanah_lot_temple_k0a48h.png'
                        }, {
                            title: 'Uluwatu Temple',
                            url: "/activity/588094299ab25c109837256f",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484039306/uluwatu_temple_ecvtpy.png'
                        }, {
                            title: 'Ulun Danu Bratan Temple',
                            url: "/activity/588094299ab25c1098372579",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484039285/prambanan_temples_z1c7hz.png'
                        }, {
                            title: 'Borobudur Temple',
                            url: "/activity/5880942a9ab25c10983725e9",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484039251/borobudur_temple_pxah8h.png'
                        }, {
                            title: 'Elephant Cave Ubud / Goa Gaja Cave Temple',
                            url: "/activity/587f6615a48174316b357515",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484039277/elephant_cave_temple_bhers4.png'
                        }, {
                            title: 'Besakih Temple',
                            url: "/activity/5880942a9ab25c109837258e",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484039294/pura_besakih_temple_1_bfomly.png'
                        }, {
                            title: 'Tamansari Water Castle',
                            url: "/activity/587a66ec7cd5de5aab19a224",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484040568/tamansari_water_castle_zs8gda.png'
                        }, {
                            title: 'Kraton Yogyakarta',
                            url: "/activity/587a66ec7cd5de5aab19a228",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484040531/kraton_yogyakarta_misuts.png'
                        }, {
                            title: 'Ujung Water Palace',
                            url: "/activity/587a66ec7cd5de5aab19a221",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484040568/ujung_water_palace_uvchnf.png'
                        }, {
                            title: 'Puri Saren Palace (Ubud Palace)',
                            url: "/activity/587a66ec7cd5de5aab19a22d",
                            // description: 'asfaf asfa sfsf sd',
                            image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484040550/puri_saren_palace_b0ppgn.png'
                        },

                    ]
                }

            ]

        }, {
            title: 'Nature',
            categories: [{
                title: 'Beach',
                // description: 'asfaf asfa sfsf sd',
                category: 'beach',
                image: '/dist/finalImages/nature/beaches.jpg'
            }, {
                title: 'Mountains & Volcanoes',
                // description: 'asfaf asfa sfsf sd',
                category: 'Mountain_volcano',
                image: '/dist/finalImages/nature/mountains.jpg'
            }, {
                title: 'Lakes',
                // description: 'asfaf asfa sfsf sd',
                category: 'Lakes',
                image: '/dist/finalImages/nature/lakes.jpg'
            }, {
                title: 'Caves',
                category: 'Caves',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/nature/caves.jpg'
            }, {
                title: 'Waterfalls',
                category: 'Waterfall',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/nature/waterfall.jpg'
            }, {
                title: 'Canyons',
                category: 'Canyon',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/nature/canyons.jpg'
            }, {
                title: 'Wildlife',
                category: 'Wildlife',
                image: '/dist/finalImages/sightseeing/wildlife.jpg'
            }],
            sub_cat: [{
                    title: 'Featured in Nature',
                    content: [{
                        title: 'Mount Bromo',
                        url: "/activity/587a64627cd5de5aab19a197",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484327625/mount-bromo_z6knmi.png'
                    }, {
                        title: 'Kuta Beach, Bali',
                        url: "/activity/587a63a37cd5de5aab19a078",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484492257/kuta_beach_q21ras.png'
                    }, {
                        title: 'Mount Batur',
                        url: "/activity/587a64637cd5de5aab19a1af",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484327625/mount-batur_j7rch1.png'
                    }, {
                        title: 'Lake Toba',
                        url: "/activity/587a64117cd5de5aab19a16e",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484407618/lake_toba_csj5y1.png'
                    }, {
                        title: 'White Crater Lake',
                        url: "/activity/587a64117cd5de5aab19a168",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484407659/white_crater_lake_cnc9n2.png'
                    }, {
                        title: 'Sanur Beach',
                        url: "/activity/587a63a37cd5de5aab19a07d",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484421153/sanur_beach_htrxsk.png'
                    }, {
                        title: 'Nusa Dua Beach',
                        url: "/activity/587a63a37cd5de5aab19a08c",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484421116/nusa_dua_beach_xhxufe.png'
                    }, {
                        title: 'Tangkuban Perahu',
                        url: "/activity/587a64627cd5de5aab19a199",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484327622/tangkuban_perahu_mr0f2m.png'
                    }, {
                        title: 'Seminyak Beach',
                        url: "/activity/587a63a37cd5de5aab19a081",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484421161/seminyak_beach_wuakuw.png'
                    }, {
                        title: 'Sekumpul Waterfalls',
                        url: "/activity/587a63397cd5de5aab199f16",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484410994/Sekumpul_waterfall_rcgrux.png'
                    }, {
                        title: 'Lake Beratan',
                        url: "/activity/587a640f7cd5de5aab19a131",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484421161/seminyak_beach_wuakuw.png'
                    }, {
                        title: 'Merapi Volcano',
                        url: "/activity/587a64627cd5de5aab19a1a0",
                        // description: 'asfaf asfa sfsf sd',
                        image: 'https://res.cloudinary.com/tripshire-solutions-pvt-ltd/image/upload/c_scale,f_auto,q_auto,w_450/v1484327535/merapi_volcano_qch7s1.png'
                    }]
                }

            ]

        },{

            title: 'Adventure sports',
            categories: [{
                title: 'Scuba Diving',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/adventure_sports/scuba_diving.jpg'
            }, {
                title: 'Surfing',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/adventure_sports/surfing.jpg'
            }, {
                title: 'Cycling & MTB',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/adventure_sports/cycling.jpg'
            }, {
                title: 'Trekking',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/adventure_sports/trekking.jpg'
            }, {
                title: 'White Water Rafting',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/adventure_sports/rafting.jpg'
            }, {
                title: 'Abseiling',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/adventure_sports/abseiling.jpg'
            }, {
                title: 'Caving',
                // description: 'asfaf asfa sfsf sd',
                image: '/dist/finalImages/adventure_sports/caving.jpg'
            }],
            sub_cat: [{
                    title: 'Featured in Adventure Sports',
                    content: [{
                        title: 'Mount Batur Sunrise Trekking',
                        // description: 'asfaf asfa sfsf sd',
                        image: '/dist/finalImages/nature_featured/mount_bromo.jpg'
                    }, {
                        title: 'Cycle from Mt. Batur Crater to Ubud',
                        // description: 'asfaf asfa sfsf sd',
                        image: '/dist/finalImages/nature_featured/mount_agung.jpg'
                    }, {
                        title: 'Mount Batur',
                        // description: 'asfaf asfa sfsf sd',
                        image: '/dist/finalImages/nature_featured/mount_batur.jpg'
                    }]
                }

            ]

        },

    ]

};

module.exports = config;
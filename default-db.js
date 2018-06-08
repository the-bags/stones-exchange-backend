const Inventory = require("./models/Inventory");
const Stone = require("./models/Stone");
const User = require("./models/User");

const mongoose = require('mongoose');
const _ = require('underscore');

require('dotenv').config();

const stones = [
    { name: 'Marble', color: 'rgb(100,254,230)'},
    { name: 'Sandstone', color: 'rgb(200,50,60)'},
    { name: 'Ruby', color: 'rgb(240,50,50)'},
    { name: 'Anyolite', color: 'rgb(0,100,10)'},
    { name: 'Amethyst', color: 'rgb(153,102,204)'},
    { name: 'Moonstone', color: 'rgb(115,169,194)'},
    { name: 'Obsidian', color: 'rgb(39,0,37)'},
    { name: 'Pyrite', color: 'rgb(149,131,101)'},
    { name: 'Alkali-feldpar syenite', color: 'rgb(244, 60, 108)'},
    { name: 'Alkali-feldspar granite', color: 'rgb(255, 209, 220)'},
    { name: 'Alkali-feldspar rhyolite', color: 'rgb(254, 220, 126)'},
    { name: 'Alkali-feldspar trachyte', color: 'rgb(254, 183, 134)'},
    { name: 'Alkalic intrusive rock', color: 'rgb(255, 111, 145)'},
    { name: 'Alkalic volcanic rock', color: 'rgb(194, 65, 0)'},
    { name: 'Alkaline basalt', color: 'rgb(169, 101, 55)'},
    { name: 'Alluvial fan', color: 'rgb(255, 255, 183)'},
    { name: 'Alluvial terrace', color: 'rgb(250, 238, 122)'},
    { name: 'Alluvium', color: 'rgb(255, 255, 137)'},
    { name: 'Amphibole schist', color: 'rgb(150, 150, 150)'},
    { name: 'Amphibolite', color: 'rgb(123, 0, 156)'},
    { name: 'Andesite', color: 'rgb(177, 72, 1)'},
    { name: 'Anorthosite', color: 'rgb(255, 149, 174)'},
    { name: 'Aplite', color: 'rgb(255, 193, 183)'},
    { name: 'Arenite', color: 'rgb(166, 252, 170)'},
    { name: 'Argillite', color: 'rgb(225, 240, 216)'},
    { name: 'Arkose', color: 'rgb(105, 207, 156)'},
    { name: 'Ash-flow tuff', color: 'rgb(255, 239, 217)'},
    { name: 'Augen gneiss', color: 'rgb(136, 127, 80)'},
    { name: 'Basalt', color: 'rgb(221, 179, 151)'},
    { name: 'Beach sand', color: 'rgb(228, 216, 190)'},
    { name: 'Bentonite', color: 'rgb(192, 208, 192)'},
    { name: 'Bimodal suite', color: 'rgb(255, 193, 111)'},
    { name: 'Biogenic rock', color: 'rgb(247, 243, 161)'},
    { name: 'Biotite gneiss', color: 'rgb(200, 134, 254)'},
    { name: 'Black shale', color: 'rgb(219, 254, 188)'},
    { name: 'Blueschist', color: 'rgb(192, 192, 192)'},
    { name: 'Calc-silicate rock', color: 'rgb(70, 0, 140)'},
    { name: 'Calc-silicate schist', color: 'rgb(182, 182, 206)'},
    { name: 'Calcarenite', color: 'rgb(154, 206, 254)'},
    { name: 'Carbonate rock', color: 'rgb(86, 224, 252)'},
    { name: 'Cataclasite', color: 'rgb(136, 127, 80)'},
    { name: 'Chemical sedimentary rock', color: 'rgb(205, 222, 255)'},
    { name: 'Chert', color: 'rgb(154, 191, 192)'},
    { name: 'Clastic rock', color: 'rgb(217, 253, 211)'},
    { name: 'Clay or mud', color: 'rgb(255, 219, 103)'},
    { name: 'Claystone', color: 'rgb(213, 230, 204)'},
    { name: 'Coal', color: 'rgb(130, 0, 65)'},
    { name: 'Coarse-grained mixed clastic rock', color: 'rgb(165, 170, 173)'},
    { name: 'Colluvium', color: 'rgb(225, 227, 195)'},
    { name: 'Conglomerate', color: 'rgb(183, 217, 204)'},
    { name: 'Coral', color: 'rgb(255, 204, 153)'},
    { name: 'Dacite', color: 'rgb(254, 205, 172)'},
    { name: 'Debris flow', color: 'rgb(211, 202, 159)'},
    { name: 'Delta', color: 'rgb(255, 250, 200)'},
    { name: 'Diabase', color: 'rgb(214, 0, 0)'},
    { name: 'Diorite', color: 'rgb(255, 51, 23)'},
    { name: 'Dolostone', color: 'rgb(107, 195, 255)'},
    { name: 'Dune sand', color: 'rgb(224, 210, 180)'},
    { name: 'Dunite', color: 'rgb(176, 0, 42)'},
    { name: 'Eclogite', color: 'rgb(206, 157, 255)'},
    { name: 'Eolian material', color: 'rgb(224, 197, 158)'},
    { name: 'Evaporite', color: 'rgb(1, 156, 205)'},
    { name: 'Exhalite', color: 'rgb(217, 194, 163)'},
    { name: 'Felsic gneiss', color: 'rgb(224, 188, 254)'},
    { name: 'Felsic metavolcanic rock', color: 'rgb(255, 141, 255)'},
    { name: 'Felsic volcanic rock', color: 'rgb(244, 139, 0)'},
    { name: 'Fine-grained mixed clastic rock', color: 'rgb(149, 255, 202)'},
    { name: 'Flaser gneiss', color: 'rgb(100, 2, 11)'},
    { name: 'Flood plain', color: 'rgb(255, 255, 213)'},
    { name: 'Gabbro', color: 'rgb(233, 147, 190)'},
    { name: 'Gabbroid', color: 'rgb(172, 0, 0)'},
    { name: 'Glacial drift', color: 'rgb(191, 167, 67)'},
    { name: 'Glacial outwash sediment', color: 'rgb(255, 223, 133)'},
    { name: 'Glacial-marine sediment', color: 'rgb(254, 219, 46)'},
    { name: 'Glaciolacustrine sediment', color: 'rgb(254, 226, 88)'},
    { name: 'Glassy volcanic rock', color: 'rgb(255, 195, 228)'},
    { name: 'Gneiss', color: 'rgb(236, 214, 254)'},
    { name: 'Granite', color: 'rgb(249, 181, 187)'},
    { name: 'Granitic gneiss', color: 'rgb(213, 164, 254)'},
    { name: 'Granitoid', color: 'rgb(221, 41, 114)'},
    { name: 'Granodiorite', color: 'rgb(233, 121, 166)'},
    { name: 'Granofels', color: 'rgb(163, 55, 253)'},
    { name: 'Granulite', color: 'rgb(106, 0, 106)'},
    { name: 'Gravel', color: 'rgb(236, 180, 0)'},
    { name: 'Graywacke', color: 'rgb(184, 234, 195)'},
    { name: 'Greenschist', color: 'rgb(237, 237, 243)'},
    { name: 'Greenstone', color: 'rgb(0, 128, 0)'},
    { name: 'Greisen', color: 'rgb(164, 73, 255)'},
    { name: 'Hawaiite', color: 'rgb(198, 128, 80)'},
    { name: 'Hornblendite', color: 'rgb(163, 1, 9)'},
    { name: 'Hornfels', color: 'rgb(234, 175, 255)'},
    { name: 'Ignimbrite', color: 'rgb(255, 229, 195)'},
    { name: 'Intermediate metavolcanic rock', color: 'rgb(255, 0, 0)'},
    { name: 'Intermediate volcanic rock', color: 'rgb(235, 96, 1)'},
    { name: 'Intrusive carbonatite', color: 'rgb(117, 1, 7)'},
    { name: 'Iron formation', color: 'rgb(185, 149, 152)'},
    { name: 'Keratophyre', color: 'rgb(254, 103, 0)'},
    { name: 'Kimberlite', color: 'rgb(193, 1, 10)'},
    { name: 'Lahar', color: 'rgb(220, 213, 180)'},
    { name: 'Lake or marine sediment', color: 'rgb(244, 239, 228)'},
    { name: 'Lampophyre', color: 'rgb(228, 88, 145)'},
    { name: 'Landslide', color: 'rgb(201, 190, 137)'},
    { name: 'Latite', color: 'rgb(254, 117, 24)'},
    { name: 'Lava flow', color: 'rgb(255, 162, 39)'},
    { name: 'Levee', color: 'rgb(255, 250, 233)'},
    { name: 'Limestone', color: 'rgb(67, 175, 249)'},
    { name: 'Loess', color: 'rgb(245, 225, 189)'},
    { name: 'Mafic gneiss', color: 'rgb(204, 183, 255)'},
    { name: 'Mafic metavolcanic rock', color: 'rgb(185, 59, 104)'},
    { name: 'Mafic volcanic rock', color: 'rgb(147, 60, 1)'},
    { name: 'Mass wasting material', color: 'rgb(207, 187, 143)'},
    { name: 'Medium-grained mixed clastic rock', color: 'rgb(144, 165, 101)'},
    { name: 'Melange', color: 'rgb(187, 192, 197)'},
    { name: 'Meta-argillite', color: 'rgb(201, 255, 201)'},
    { name: 'Metabasalt', color: 'rgb(135, 43, 76)'},
    { name: 'Metaconglomerate', color: 'rgb(233, 255, 233)'},
    { name: 'Metaluminous granite', color: 'rgb(255, 179, 197)'},
    { name: 'Metamorphic rock', color: 'rgb(167, 167, 255)'},
    { name: 'Metarhyolite', color: 'rgb(255, 167, 255)'},
    { name: 'Metasedimentary rock', color: 'rgb(125, 255, 125)'},
    { name: 'Metavolcanic rock', color: 'rgb(255, 87, 255)'},
    { name: 'Mica schist', color: 'rgb(177, 177, 177)'},
    { name: 'Migmatite', color: 'rgb(159, 0, 202)'},
    { name: 'Mixed carbonate/clastic rock', color: 'rgb(56, 180, 177)'},
    { name: 'Mixed coal and clastic rock', color: 'rgb(110, 73, 9)'},
    { name: 'Mixed volcanic/clastic rock', color: 'rgb(96, 204, 191)'},
    { name: 'Monzodiorite', color: 'rgb(255, 169, 157)'},
    { name: 'Monzogabbro', color: 'rgb(227, 119, 173)'},
    { name: 'Monzonite', color: 'rgb(255, 39, 90)'},
    { name: 'Moraine', color: 'rgb(255, 238, 191)'},
    { name: 'Mud flat', color: 'rgb(228, 208, 190)'},
    { name: 'Mudflow', color: 'rgb(229, 219, 179)'},
    { name: 'Mudstone', color: 'rgb(207, 239, 223)'},
    { name: 'Mylonite', color: 'rgb(109, 80, 51)'},
    { name: 'Nepheline syenite', color: 'rgb(255, 27, 81)'},
    { name: 'Norite', color: 'rgb(255, 214, 209)'},
    { name: 'Novaculite', color: 'rgb(192, 174, 182)'},
    { name: 'Oil shale', color: 'rgb(187, 255, 221)'},
    { name: 'Olistostrome', color: 'rgb(141, 190, 205)'},
    { name: 'Orthogneiss', color: 'rgb(179, 149, 255)'},
    { name: 'Orthoquartzite', color: 'rgb(203, 239, 206)'},
    { name: 'Paragneiss', color: 'rgb(144, 99, 255)'},
    { name: 'Peat', color: 'rgb(255, 207, 129)'},
    { name: 'Pegmatite', color: 'rgb(255, 239, 243)'},
    { name: 'Pelitic schist', color: 'rgb(202, 202, 220)'},
    { name: 'Peralkaline granite', color: 'rgb(252, 82, 98)'},
    { name: 'Peraluminous granite', color: 'rgb(248, 190, 174)'},
    { name: 'Peridotite', color: 'rgb(206, 0, 49)'},
    { name: 'Phonolite', color: 'rgb(95, 57, 31)'},
    { name: 'Phosphorite', color: 'rgb(191, 227, 220)'},
    { name: 'Phyllite', color: 'rgb(180, 207, 228)'},
    { name: 'Phyllonite', color: 'rgb(172, 127, 80)'},
    { name: 'Playa', color: 'rgb(241, 229, 223)'},
    { name: 'Plutonic rock', color: 'rgb(252, 110, 124)'},
    { name: 'Porphyry', color: 'rgb(255, 225, 232)'},
    { name: 'Pumice', color: 'rgb(255, 229, 243)'},
    { name: 'Pyroclastic', color: 'rgb(255, 224, 222)'},
    { name: 'Pyroxenite', color: 'rgb(148, 0, 35)'},
    { name: 'Quartz diorite', color: 'rgb(232, 28, 0)'},
    { name: 'Quartz gabbro', color: 'rgb(237, 167, 202)'},
    { name: 'Quartz latite', color: 'rgb(254, 135, 54)'},
    { name: 'Quartz monzodiorite', color: 'rgb(255, 129, 159)'},
    { name: 'Quartz monzogabbro', color: 'rgb(255, 111, 91)'},
    { name: 'Quartz monzonite', color: 'rgb(255, 99, 136)'},
    { name: 'Quartz syenite', color: 'rgb(251, 35, 56)'},
    { name: 'Quartz-feldspar schist', color: 'rgb(162, 162, 192)'},
    { name: 'Quartzite', color: 'rgb(159, 255, 159)'},
    { name: 'Residuum', color: 'rgb(255, 227, 137)'},
    { name: 'Rhyodacite', color: 'rgb(254, 198, 42)'},
    { name: 'Rhyolite', color: 'rgb(254, 204, 104)'},
    { name: 'Sand', color: 'rgb(255, 203, 35)'},
    { name: 'Sand sheet', color: 'rgb(219, 204, 169)'},
    { name: 'Schist', color: 'rgb(219, 219, 231)'},
    { name: 'Sedimentary breccia', color: 'rgb(167, 186, 134)'},
    { name: 'Sedimentary rock', color: 'rgb(146, 220, 183)'},
    { name: 'Serpentinite', color: 'rgb(0, 92, 0)'},
    { name: 'Shale', color: 'rgb(172, 228, 200)'},
    { name: 'Silt', color: 'rgb(255, 211, 69)'},
    { name: 'Siltstone', color: 'rgb(214, 254, 154)'},
    { name: 'Skarn', color: 'rgb(129, 3, 255)'},
    { name: 'Slate', color: 'rgb(230, 205, 255)'},
    { name: 'Spilite', color: 'rgb(201, 85, 126)'},
    { name: 'Stratified glacial sediment', color: 'rgb(255, 229, 157)'},
    { name: 'Sub/supra-glacial sediment', color: 'rgb(254, 230, 112)'},
    { name: 'Subaluminous granite', color: 'rgb(255, 111, 107)'},
    { name: 'Syenite', color: 'rgb(244, 26, 135)'},
    { name: 'Talus', color: 'rgb(188, 175, 108)'},
    { name: 'Tectonic breccia', color: 'rgb(176, 167, 120)'},
    { name: 'Tectonic melange', color: 'rgb(208, 203, 176)'},
    { name: 'Tectonite', color: 'rgb(132, 97, 62)'},
    { name: 'Tephrite', color: 'rgb(133, 79, 43)'},
    { name: 'Terrace', color: 'rgb(255, 246, 217)'},
    { name: 'Tholeite', color: 'rgb(211, 157, 121)'},
    { name: 'Till', color: 'rgb(210, 194, 124)'},
    { name: 'Tonalite', color: 'rgb(252, 182, 182)'},
    { name: 'Trachyandesite', color: 'rgb(201, 82, 1)'},
    { name: 'Trachybasalt', color: 'rgb(236, 213, 198)'},
    { name: 'Trachyte', color: 'rgb(254, 160, 96)'},
    { name: 'Troctolite', color: 'rgb(255, 191, 206)'},
    { name: 'Trondhjemite', color: 'rgb(255, 167, 188)'},
    { name: 'Tuff', color: 'rgb(249, 211, 211)'},
    { name: 'Ultramafic intrusive rock', color: 'rgb(232, 0, 55)'},
    { name: 'Ultramafitite', color: 'rgb(160, 53, 0)'},
    { name: 'Unconsolidated material', color: 'rgb(253, 244, 63)'},
    { name: 'Vitrophyre', color: 'rgb(255, 195, 248)'},
    { name: 'Volcanic ash', color: 'rgb(224, 176, 158)'},
    { name: 'Volcanic breccia', color: 'rgb(255, 213, 157)'},
    { name: 'Volcanic carbonatite', color: 'rgb(110, 37, 0)'},
    { name: 'Volcanic rock', color: 'rgb(255, 183, 222)'},
    { name: 'Wacke', color: 'rgb(189, 219, 241)'},
    { name: 'Welded tuff', color: 'rgb(255, 243, 201)'}
];


async function run(){
    try {
        await mongoose.connect(process.env.DB_URL);
        await mongoose.connection.db.dropCollection('stones', (err) => err ? console.log(err) : console.log('drop stones'));
        
        for (let i=0; i<stones.length; i++) {
            const stone = new Stone(stones[i]);
            await stone.save();
        };
        console.log('put stones');
        // create Users
        let user = await User.findOne({ name: 'Admin' });
        if (user) {
            console.log('remove admin');
            await user.remove();
        }
        user = new User();
        user.name = 'Admin',
        user.email = 'admin@test.com';
        user.password = await user.encryptPassword('password');
        await user.save();
        console.log('create admin');

        // Create Inventory
        await mongoose.connection.db.dropCollection('inventories', (err) => err ? console.log(err) : console.log('drop inventories'));
        const inventory = new Inventory();
        inventory.userId = user._id;
        inventory.stones = await initStonesForInventory();
        await inventory.save();
        console.log('put invetories');
        mongoose.connection.close();

        console.log('Write to db is successfully!');
    } catch (err) {
        console.log(err);
    }
}

async function initStonesForInventory(){
    // sample - produce a random sample from the list. 
    // pluck - get only _id
    return  _.sample(_.pluck(await Stone.find({},'_id'), '_id'), 7);
}
run();
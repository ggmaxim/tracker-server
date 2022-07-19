"use strict";

const {
        mongo,
        contact_users,
    } = require("../resources/environment"),
    mongodb = require("mongodb");

async function updateUser (user_id, email, role, cnp, full_name, password) {
    const query = {
        _id: mongodb.ObjectID(user_id),
    },
    set_fields = {
        email,
        role,
        cnp,
        full_name,
        password,
    };
    Object.keys(set_fields).forEach(key => set_fields[key] === undefined ? delete set_fields[key] : {});
    const update = {
        $set: set_fields,
    };
    
    try {
        await mongo.collection("users").update(query, update);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function deleteUser (user_id) {
    const query = {
        _id: mongodb.ObjectID(user_id),
    };
    try {
        await mongo.collection("users").remove(query);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
/*
Reads user from database.
*/
async function readUser (query) {
    try {
        const user = await mongo.collection("users").findOne(query);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function readUsers (query) {
    try {
        const cursor = await mongo.collection("users").find(query);
        
        cursor.project({
            password: 0,
        });
        return cursor.toArray();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function readPositiveUsers () {
    try {
        const now = new Date();
        now.setDate(now.getDate() - 3);
        const aggregation = [
            {
                $lookup: {
                    from: "covid_tests",
                    let: {cnp: "$cnp"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$result", "pozitiv"] },
                                        { $eq: [ "$cnp", "$$cnp" ] },
                                        { $gt: ["$tested", now]}
                                    ]
                                }
                            }
                        }
                    ],
                    as: "tests"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$tests", 0 ] }, "$$ROOT" ] } }
            },
            {
                $match: {
                    tests: {
                        $not: {$size: 0}
                    }
                }
             },
             {
                $project: { 
                    _id: 0,
                    password: 0,
                    tests: 0 
                }
            }
          ];
        const cursor = mongo.collection("users").aggregate(aggregation);
        
        return cursor.toArray();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/*
Adds new user to database.
*/
async function addUser (email, role, cnp, full_name) {
    const user = {
        email,
        password: cnp,
        role,
        cnp,
        full_name,
    };

    try {
        await mongo.collection("users").insertOne(user);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

function getDistanceFromLatLonInM(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c * 1000; // Distance in m
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

async function readContactUsers () {
    try {
        let contacts = [];
        const three_days_ago = new Date();
            three_days_ago.setDate(three_days_ago.getDate() - 3);
        const query = {
                tested: {$gt: three_days_ago}
            };

        const cursor = mongo.collection("covid_tests").find(query);
        const tests = await cursor.toArray(),
            user_ids = [];

        tests.forEach((test) => {
            user_ids.push(test.user_id);
        })

        for (let i = 0 ; i < tests.length; i++) {
            const test = tests[i],
                user_id = test.user_id,
                test_date = test.tested;

            const before_test = new Date(),
                after_date = new Date();
            before_test.setDate(test_date.getDate() - 2);
            after_date.setDate(test_date.getDate() + 3);

            const query = {
                date: {$gt: before_test},
                date: {$lt: after_date},
                user_id,
            };

            const locations_cursor = mongo.collection("locations").find(query),
                locations = await locations_cursor.toArray();
                
            for (let j = 0 ; j < locations.length; j++) {
                const loc = locations[j];
                const interval_date_before = new Date(),
                    interval_date_after = new Date();

                interval_date_before.setMinutes(loc.date.getMinutes() - 5);
                interval_date_after.setMinutes(loc.date.getMinutes() + 5);
                const l_query = {
                    date: {$gt: interval_date_before},
                    date: {$lt: interval_date_after},
                    user_id: {$nin: user_ids},
                };

                const l_cursor = mongo.collection("locations").find(l_query),
                    possible_contact_locations = await l_cursor.toArray();

                for (let k = 0; k < possible_contact_locations.length; k++) {
                    const possible_loc = possible_contact_locations[k];
                    if (getDistanceFromLatLonInM(loc.latitude, loc.longitude, possible_loc.latitude, possible_loc.longitude) < 3) {
                        contacts.push(possible_loc.user_id);
                    }
                }
            }
        }

        contacts = contacts.filter(onlyUnique);

        const contact_ids = [];

        contacts.forEach((contact) => {
            contact_ids.push(mongodb.ObjectID(contact));
        })

        const user_query = {
            _id: {$in: contact_ids},
        };
        const user_cursor = mongo.collection("users").find(user_query),
            contact_users = await user_cursor.toArray();
        
        return contact_users;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


module.exports = {
    addUser,
    readUser,
    readUsers,
    readPositiveUsers,
    deleteUser,
    updateUser,
    readContactUsers,
}
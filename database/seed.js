require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');
const Role = require('./models/roles')

const seedUsers = async () => {
    try {
        await User.deleteMany();

        const mockUsers = require('./database/Shifter.users.json');

    await User.create(mockUsers);
    console.log('Mockup users created successfully');

    } catch(error) {
        console.log('Error occured while seeding Users : ',error)
    }
};

const seedRoles = async () => {
    try {
        await Role.deleteMany();

        const seedRolesJson = require('./database/Shifter.roles.json');

        await Role.create(seedRolesJson);

        console.log('Seed Roles added successfully');

    } catch(error) {
        console.log('Error occurred while seeding Roles to database', error);
    }
};

const seedAll = async () => {

    // Guard
    const arguments = process.argv;

    if (!arguments.includes('i-am-a-pro')) {
        console.log('WARNING!!');
        console.log('You are about to replace all the data in your database');
        console.log('with mockup / seed data ! This operation is irreversible !!');
        console.log('If you know what you are doing, add "i-am-a-pro" argument.');
        process.exit(1);
    };

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Run the seed functions
    await seedUsers();
    await seedRoles();

    // Finish up
    console.log('Done seeding');
    process.exit(0);
}

seedAll();
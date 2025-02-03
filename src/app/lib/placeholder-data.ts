// This file contains placeholder data that will be replaced in launch.

const users = [
    {
        id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
        username: "testuser1",
        password: "Password123!",
    },
    {
        id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
        username: "testuser2",
        password: "Password123!",
    },
];

const cats = [
    {
        userId: users[0].id,
        name: "Niko",
        coatColor: "brown",
        coatType: "tabby",
        coatLength: "short",
    },
    {
        userId: users[1].id,
        name: "Bean",
        coatColor: "brown",
        coatType: "tuxedo",
        coatLength: "short",
    },
];

const tasks = [
    {
        userId: users[0].id,
        title: "Task 1",
        description: "Task 1 description.",
        status: "complete",
    },
    {
        userId: users[0].id,
        title: "Task 2",
        description: "Task 2 description.",
        status: "complete",
    },
    {
        userId: users[1].id,
        title: "Task 3",
        description: "Skip this task! This one sucks to do and you will have a lot more fun if you just decide to do the next one instead.",
        status: "incomplete",
    },
    {
        userId: users[1].id,
        title: "Kitten Cuddle Party",
        description: "Cuddle up with Niko and THE BEAN!",
        status: "complete",
    },
];

export { users, tasks, cats };
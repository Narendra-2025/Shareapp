export default {
    name: 'user',
    title: 'user',
    type: 'document',
    fields: [
        {
            name: 'userName',  // Changed from 'username' to 'userName'
            title: 'User Name', // Optional: you can change the title to "User Name"
            type: "string"
        },
        {
            name: 'image',
            title: 'Image',
            type: "string"
        }
    ]
}

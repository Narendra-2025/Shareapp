export default {
  name: 'save',
  title: 'Save',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'reference',
      to: [{ type: 'user' }],
    },
  ],
};

export default {
  name: 'save',
  title: 'Save',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'reference',
      to: [{type: 'user'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pin',
      title: 'Pin',
      type: 'reference',
      to: [{type: 'pin'}],
      validation: (Rule) => Rule.required(),
    },
  ],
}

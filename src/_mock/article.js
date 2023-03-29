import { faker } from '@faker-js/faker';

const POST_TITLES = [
  'Title 1',
  'Title 2',
  'Title 3',
  'Title 4',
  'Title 5',
];

const posts = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  title: POST_TITLES[index],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  like: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
  },
}));

export default posts;

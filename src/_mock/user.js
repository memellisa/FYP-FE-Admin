import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const users = [...Array(5)].map((_) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
}));

export default users;

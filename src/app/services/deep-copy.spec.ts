import {deepCopy} from './deep-copy';

describe('deep-copy', () => {

  const object = {
    id: 23,
    name: 'Jane Doe',
    address: {
      city: 'New York',
      street: '115 W 57th'
    },
    jobs: [{
      title: 'Software Developer',
      income: 120000,
    }, {
      title: 'Burger Flipper',
      income: 0.02,
    }],
  };

  it('should create a deep copy of an object', () => {
    const result = deepCopy(object);

    expect(result.id).toEqual(object.id);
    expect(result.name).toEqual(object.name);
    expect(result.address.city).toEqual(object.address.city);
    expect(result.jobs[0].title).toEqual(object.jobs[0].title);
    expect(result.jobs[0].income).toEqual(object.jobs[0].income);
    expect(result.jobs[1].title).toEqual(object.jobs[1].title);
    expect(result.jobs[1].income).toEqual(object.jobs[1].income);
  });

});

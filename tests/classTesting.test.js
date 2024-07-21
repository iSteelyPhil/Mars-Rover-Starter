/* const classTest = require('../classTesting.js'); */
const Astronaut = require('../CLASS TESTING/classTesting');

describe('Astronaut Class Tests', () => {
    test('should create an Astronaut instance with correct properties', () => {
      let fox = new Astronaut('Fox', 7, 12);
      expect(fox.name).toBe('Fox');
      expect(fox.age).toBe(7);
      expect(fox.mass).toBe(12);
    });
});
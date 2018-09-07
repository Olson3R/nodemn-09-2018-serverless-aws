class ItemDb {
  static get items() {
    return [
      {
        id: '5393be07-cc7c-4086-8beb-7bdc104f74c3',
        name: 'Bread',
        quantity: 100,
        tags: ['wheat', 'white', 'french']
      },
      {
        id: '3fea2f44-3336-43c0-ab6b-936f3e98c274',
        name: 'Battery',
        quantity: 9000,
        tags: ['aa', 'aaa', '9v']
      },
      {
        id: 'bf6e1abc-e589-4580-88a1-3fd43a852aba',
        name: 'Play-Doh',
        quantity: 0,
        tags: ['kids']
      },
      {
        id: 'be24df65-5fa7-4f77-9c29-03aa846227a5',
        name: 'Button',
        quantity: 9999999999,
        tags: ['round', 'collectable', 'lost another one']
      },
      {
        id: '9f75f343-9839-45c6-8fc5-49c771bbe246',
        name: 'Gold Bar',
        quantity: 10,
        tags: ['gold']
      }
    ]
  }
}

module.exports = ItemDb;

import { module, test } from 'qunit';
import { Model, Factory, ActiveModelSerializer } from 'ember-cli-mirage';
import Server from 'ember-cli-mirage/server';

const data = {
  contacts: [
    {id: "1", name: "Foo"}
  ]
};

const LOCALSTORAGE_KEY_DUMP = 'ember-cli-mirage:persistence';
const LOCALSTORAGE_KEY_VERSION = 'ember-cli-mirage:persistence-version';

module('Integration | Server | Persistence', {
  beforeEach() {
    window.localStorage.setItem(LOCALSTORAGE_KEY_DUMP, JSON.stringify(data));
    window.localStorage.setItem(LOCALSTORAGE_KEY_VERSION, 1);

    this.server = new Server({
      environment: 'test',
      models: {
        contact: Model
      },
      factories: {
        contact: Factory
      },
      serializers: {
        application: ActiveModelSerializer
      },
      persistDb: true,
      persistDbVersion: 1,
      timing: 0
    });
  },
  afterEach() {
    this.server.shutdown();

    window.localStorage.removeItem(LOCALSTORAGE_KEY_DUMP);
    window.localStorage.removeItem(LOCALSTORAGE_KEY_VERSION);
  }
});

test(`should respond with data from localStorage`, async function(assert) {
  let { server } = this;

  server.get('/contacts', (schema) => {
    return schema.contacts.all().models;
  });

  let result = await $.ajax({
    method: 'GET',
    url: '/contacts'
  });

  assert.deepEqual(result, data.contacts);
});

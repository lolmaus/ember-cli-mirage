/* jshint ignore:start */

import {module, test} from 'qunit';
import { Model, Factory, hasMany } from 'ember-cli-mirage';
import Server from 'ember-cli-mirage/server';

module('Integration | Many to Many', {
  beforeEach() {
    this.server = new Server({
      environment: 'test',
      models: {
        parent: Model.extend({children: hasMany()}),
        child:  Model.extend({parents:  hasMany()}),
      },
      factories: {
        parent: Factory.extend(),
        child:  Factory.extend()
      }
    });
    this.server.timing  = 0;
    this.server.logging = false;
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('it works', function(assert) {
  let parents = server.createList('parent', 4);

  const children = [
    ...server.createList('child', 2, {parents: [parents[0], parents[1]]}),
    ...server.createList('child', 2, {parents: [parents[2], parents[3]]})
  ];

  assert.notOk    (server.schema.children.find(1).parentId,              'child 1 parentId  should not be defined');
  assert.deepEqual(server.schema.children.find(1).parentIds, ['1', '2'], 'child 1 parentIds should be [1, 2]');
  assert.notOk    (server.schema.children.find(2).parentId,              'child 2 parentId  should not be defined');
  assert.deepEqual(server.schema.children.find(2).parentIds, ['1', '2'], 'child 2 parentIds should be [1, 2]');
  assert.notOk    (server.schema.children.find(3).parentId,              'child 3 parentId  should not be defined');
  assert.deepEqual(server.schema.children.find(3).parentIds, ['3', '4'], 'child 3 parentIds should be [3, 4]');
  assert.notOk    (server.schema.children.find(4).parentId,              'child 4 parentId  should not be defined');
  assert.deepEqual(server.schema.children.find(4).parentIds, ['3', '4'], 'child 4 parentIds should be [3, 4]');

  assert.notOk    (server.schema.parents.find(1).childId,              'parent 1 childId  should not be defined');
  assert.deepEqual(server.schema.parents.find(1).childIds, ['1', '2'], 'parent 1 childIds should be [1, 2]');
  assert.notOk    (server.schema.parents.find(2).childId,              'parent 2 childId  should not be defined');
  assert.deepEqual(server.schema.parents.find(2).childIds, ['1', '2'], 'parent 2 childIds should be [1, 2]');
  assert.notOk    (server.schema.parents.find(3).childId,              'parent 3 childId  should not be defined');
  assert.deepEqual(server.schema.parents.find(3).childIds, ['3', '4'], 'parent 3 childIds should be [3, 4]');
  assert.notOk    (server.schema.parents.find(4).childId,              'parent 4 childId  should not be defined');
  assert.deepEqual(server.schema.parents.find(4).childIds, ['3', '4'], 'parent 4 childIds should be [3, 4]');
});

import Vue from 'vue';
import AddMovie from '@/components/AddMovie';

describe('AddMovie', () => {
  let cmp, vm;

  beforeEach(() => {
    cmp = Vue.extends(AddMovie);
    vm = new cmp({
      data: {
        years: ['2018', '2017', '2016', '2015']
      }
    }).$mount()
  })

  it("equals years to ['2018', '2017', '2016', '2015']", () => {
    expect(vm.years).to.eql(['2018', '2017', '2016', '2015']);
  });

  it('has a submit() method', () => {
    assert.deepEqual(typeof vm.submit, 'function')
  })

  it('has a clear() method', () => {
    assert.deepEqual(typeof vm.clear, 'function')
  })
});

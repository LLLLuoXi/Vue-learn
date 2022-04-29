import { useDom, useReactive } from '../MVVM';

function App() {
  const state = useReactive({
    count: 0,
    name: 'LLLLuoxi',
  });

  const add = (num) => {
    state.count += num;
  };

  const minus = (num) => {
    state.count -= num;
  };

  const changeName = (name) => {
    state.name = name;
  };

  return {
    template: `
    <h1>{{count}}</h1>
    <h2>{{name}}</h2>
    <button onClick="add(2)">+</button>
    <button onClick="minus(2)">-</button>
    <button onClick="changeName('luoxi')">change name</button>
    `,
    state,
    methods: {
      add,
      minus,
      changeName,
    },
  };
}

useDom(
  App(), // 返回 template state methods
  document.querySelector('#app')
);

<!--
 * @Author: luoxi
 * @LastEditTime: 2022-03-08 21:56:00
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keydown.enter="addTodo"
        />
      </header>
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{ completed: todo.completed }"
            v-for="todo in filteredTodoRef"
            :key="todo.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label>{{ todo.title }}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
          <!-- <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>投递50封简历</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
          <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>上午10:30 参加面试</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li> -->
        </ul>
      </section>
      <footer class="footer">
        <span class="todo-count">
          <strong>{{ remainningRef }}</strong>
          <span
            >item{{
              remainningRef === 1 || remainningRef === 0 ? "" : "s"
            }}
            left</span
          >
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          style="display: none"
          v-show="completedRef > 0"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./hooks/useTodoList";
import useNewTodo from "./hooks/useNewTodo";
import useFilter from "./hooks/useFilter";
export default {
  setup() {
    let { todosRef } = useTodoList();
    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
    };
  },
};
</script>

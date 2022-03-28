<template>
  <div class="tag-input-wrapper">
    <div v-if="!tags.length">you have no ang tags</div>
    <span class="tag-item" v-else v-for="(tag, index) in tags" :key="index">
      {{ tag }}
      <a class="remove-tag" @click.prevent="removeTag(index)" href="#"
        >&times;</a
      >
    </span>
    <br />
    <!-- <div>{{ newTag }}</div> -->
    <br />
    <input
      type="text"
      @keydown.enter="addNewTag"
      @keydown.delete="removeLastTag"
      v-on:keydown.tab.prevent="addNewTag"
      v-model.number="newTag"
      class="tag-input"
      :class="{ 'tag-exits': tags.includes(newTag) }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [...this.selectedTags],
      newTag: 'preact',
    };
  },
  props: {
    selectedTags: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isTagExists() {
      return this.tags.includes(this.newTag);
    },
  },
  watch: {
    newTag(newVal) {
      if (newVal.indexOf(',') > -1) {
        this.newTag = this.newTag.slice(0, -1);
        this.addNewTag();
      }
    },
  },
  methods: {
    addNewTag() {
      if (this.newTag && !this.isTagExists) {
        console.log('addNewTag');
        this.tags.push(this.newTag);
        this.newTag = '';
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    removeLastTag() {
      if (this.newTag.length === 0) {
        this.removeTag(this.newTag.length - 1);
      }
    },
  },
};
</script>

<style scoped>
.tag-input-wrapper {
  background-color: #fff;
  padding: 0.5em;
  border: 1px solid #dbdbdb;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 36px;
  box-sizing: border-box;
}
.tag-item {
  color: #212529;
  background-color: #eee;
  margin-right: 0.3rem;
  padding: 0.25em 0.4em;
  font-size: 75%;
  line-height: 1.5em;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 1.25em;
  padding-left: 0.6em;
}
.tag-input {
  color: #495057;
  flex: 1;
  background: transparent;
  border: none;
}
.tag-input:focus {
  outline: none;
}
a.remove-tag {
  text-decoration: none;
}
.tag-input.tag-exits {
  color: red;
  text-decoration: line-through;
}
</style>

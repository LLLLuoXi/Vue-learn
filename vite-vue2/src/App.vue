<!--
 * @Author: luoxi
 * @LastEditTime: 2022-02-19 10:59:06
 * @LastEditors: your name
 * @Description: 
-->
<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/vModel">vModel</router-link> |
      <router-link to="/listeners1">listeners1</router-link>|
      <router-link to="/listeners2">listeners2</router-link>|
      <router-link to="/shareData">share-data</router-link>
    </nav>
    <router-view />
  </div>
</template>

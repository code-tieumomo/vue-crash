<template>
  <div class="root">
    <div class="alert alert-danger" role="alert">
      <i class="fa fa-exclamation-triangle"></i> This page can not be refreshed! View detail in
      <router-link to="/about#bug-with-netlify">Docs</router-link>
    </div>
    <router-link to="/"><i class="fa fa-angle-left"></i> Back</router-link>
    <h1>About Us</h1>
    <h2>
      Just a simple note book <br />
      (or exactly a todos list)
    </h2>

    <h4 class="m-t-2"># CHANGE NOTES</h4>
    <div>
      <span class="versions">@1.0.0</span> <br />
      Release date: 04/09/2021 <br />
      <div class="version-details">
        <ul>
          <li>Basic features (view, add, toggle status, remove todos).</li>
          <li>Store todos in database.</li>
          <li>Realtime update.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>

<style scoped>
.root {
  padding-top: 1rem;
}
.m-t-2 {
  margin-top: 2rem;
}
.versions {
  color: brown;
}
ul {
  list-style-type: circle;
}
li {
  margin-inline-start: 20px;
}
</style>

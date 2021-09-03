<template>
  <todos />
</template>

<script>
// import { createClient } from "@supabase/supabase-js";
import Todos from "@/components/Todos"

// const supabaseUrl = "https://fgczckfbozcbofwksqcz.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDE3NDgzOSwiZXhwIjoxOTQ1NzUwODM5fQ.8efUxDeZZe4nOTWFSU7ZZsml6Tqi00Y-XMt_vQat7mo";
// const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  name: "Home",
  components: {
    Todos
  }
}
</script>

<style scoped>

</style>
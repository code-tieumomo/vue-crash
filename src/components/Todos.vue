<template>
  <div class="page-content page-container" id="page-content">
    <div class="padding">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">--- 📑 Awesome Todo list ---</h4>
              <span>Today: {{ today }}</span>

              <div class="list-wrapper">
                <ul class="d-flex flex-column todo-list">
                  <li
                    v-for="(todo, index) in todos"
                    :key="index"
                    :class="{ completed: todo.is_finished }"
                    @click.prevent="onViewDetail"
                  >
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="checkbox" type="checkbox" :checked="todo.is_finished" />
                        {{ todo.text }}
                        <i class="input-helper"></i>
                      </label>
                    </div>
                    <i class="remove mdi mdi-close-circle-outline" @click.stop.prevent="onQuickRemove"></i>
                  </li>
                </ul>
              </div>

              <div class="add-items d-flex">
                <input type="text" class="form-control todo-list-input" placeholder="What do you need to do today?" />
                <button class="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import moment from "moment";

const supabaseUrl = "https://fgczckfbozcbofwksqcz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDE3NDgzOSwiZXhwIjoxOTQ1NzUwODM5fQ.8efUxDeZZe4nOTWFSU7ZZsml6Tqi00Y-XMt_vQat7mo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  name: "Todos",
  data() {
    return {
      today: moment().format("MMMM Do YYYY"),
      todos: []
    };
  },
  async created() {
    this.todos = await this.fetchTodos();

    supabase
      .from("rodos")
      .on("*", () => {
        this.refreshTodos();
      })
      .subscribe();
  },
  methods: {
    onViewDetail() {
      console.log("Clicked");
    },
    onQuickRemove() {
      console.log("Removed");
    },
    async fetchTodos() {
      let { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });
      if (error && status !== 406) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching tasks!"
        });

        return;
      }

      return data;
    },
    async refreshTodos() {
      this.todos = await this.fetchTodos();
    }
  }
};
</script>

<style></style>

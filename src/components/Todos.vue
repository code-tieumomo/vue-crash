<template>
  <div class="page-content page-container" id="page-content">
    <div class="padding">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">--- 📑 Awesome Todos list ---</h4>
              <span>Today: {{ today }}</span>

              <div class="list-wrapper">
                <ul class="d-flex flex-column todo-list">
                  <li
                    v-for="(todo, id) in todos"
                    :key="id"
                    :class="{ completed: todo.is_finished }"
                    @click.prevent
                    @dblclick.stop.prevent="onToggleStatus(todo.id, todo.is_finished)"
                  >
                    <div class="form-check">
                      <label class="form-check-label">
                        <input class="checkbox" type="checkbox" :checked="todo.is_finished" />
                        {{ todo.text }}
                        <i class="input-helper"></i>
                      </label>
                    </div>
                    <i class="remove mdi mdi-close-circle-outline" @click.stop.prevent="onViewDetail(todo.id)"></i>
                    <i class="remove mdi mdi-close-circle-outline" @click.stop.prevent="onQuickRemove(todo.id)"></i>
                  </li>
                </ul>
              </div>

              <div class="add-items d-flex">
                <input
                  type="text"
                  class="form-control todo-list-input"
                  placeholder="What do you need to do today?"
                  v-model="todoText"
                  @keyup.enter="onSubmit"
                  required
                />
                <button class="add btn btn-primary font-weight-bold todo-list-add-btn" @click="onSubmit">Add</button>
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
      todos: [],
      todoText: ""
    };
  },
  async created() {
    this.todos = await this.fetchTodos();

    supabase
      .from("todos")
      .on("*", () => {
        this.refreshTodos();
      })
      .subscribe();
  },
  methods: {
    onViewDetail(id) {
      console.log("Clicked on " + id);
    },
    async onToggleStatus(id, is_finished) {
      const { error } = await supabase
        .from("todos")
        .update({ is_finished: !is_finished })
        .eq("id", id);
      if (error && status !== 406) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while toggling finished status!"
        });
      }
    },
    onQuickRemove(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, remove it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { error, status } = await supabase
            .from("todos")
            .delete()
            .eq("id", id);
          if (error && status !== 406) {
            await Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong while removing todo!"
            });
          }
        }
      });
    },
    async onSubmit() {
      if (this.todoText.trim().length == 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Todo can not empty!"
        });

        return false;
      }

      const { error, status } = await supabase.from("todos").insert([
        {
          text: this.todoText,
          day: this.today,
          is_finished: false
        }
      ]);
      if (error && status !== 406) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while adding task!"
        });
      } else {
        this.todoText = "";
      }
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

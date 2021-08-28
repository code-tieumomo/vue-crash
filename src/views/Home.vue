<template>
  <div v-show="showAddTask">
    <AddTask @add-task="addTask" />
  </div>
  <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";
import Swal from "sweetalert2";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fgczckfbozcbofwksqcz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDE3NDgzOSwiZXhwIjoxOTQ1NzUwODM5fQ.8efUxDeZZe4nOTWFSU7ZZsml6Tqi00Y-XMt_vQat7mo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  name: "Home",
  props: {
    showAddTask: Boolean
  },
  components: {
    AddTask,
    Tasks
  },
  data() {
    return {
      tasks: []
    };
  },
  async created() {
    this.tasks = await this.fetchTasks();

    supabase.from("tasks").on("UPDATE", () => {
      this.refreshTasks();
    }).subscribe();
  },
  methods: {
    async refreshTasks() {
      this.tasks = await this.fetchTasks();
    },
    async addTask(task) {
      const res = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(task)
      });
      const data = await res.json();
      this.tasks = [...this.tasks, data];
    },
    deleteTask(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`api/tasks/${ id }`, {
            method: "DELETE"
          });
          res.status === 200 ? (this.tasks = this.tasks.filter(task => task.id !== id)) : Swal.fire({
            icon: "error", title: "Oops...", text: "Something went wrong while deleting task!"
          });
        }
      });
    },
    async toggleReminder(id) {
      const task = await this.fetchTask(id);
      const { error } = await supabase
          .from("tasks")
          .update({ reminder: !task[0].reminder })
          .eq("id", id);
      if (error && status !== 406) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while updating task!"
        });
      }

      await this.refreshTasks();

      // const task = await this.fetchTask(id);
      // const updateTask = { ...task, reminder: !task.reminder };
      // const res = await fetch(`api/tasks/${ id }`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-type": "application/json"
      //   },
      //   body: JSON.stringify(updateTask)
      // });
      // const data = await res.json();

      // Way 1
      // this.tasks = this.tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task);

      // Way 2
      // this.tasks = this.tasks.map(task => {
      //   if (task.id === id) {
      //     task.reminder = !task.reminder
      //   }
      //
      //   return task;
      // });
    },
    async fetchTasks() {
      let { data, error } = await supabase
          .from("tasks")
          .select("*")
          .order("id", { ascending: true });
      if (error && status !== 406) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching tasks!"
        });

        return;
      }

      return data;
    },
    async fetchTask(id) {
      let { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("id", id);
      if (error && status !== 406) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching task!"
        });

        return;
      }

      return data;

      // const res = await fetch(`api/tasks/${ id }`);
      // const data = await res.json();
      //
      // return data;
    }
  }
};
</script>

<style scoped>

</style>
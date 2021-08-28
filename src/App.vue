<template>
  <div class="container">
    <Header @toggle-add-task="toggleAddTask" title="Task Tracker" :showAddTask="showAddTask" />
    <div v-show="showAddTask">
      <AddTask @add-task="addTask" />
    </div>
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Swal from "sweetalert2";

export default {
  name: "App",
  components: {
    Header,
    Tasks,
    AddTask
  },
  data() {
    return {
      tasks: [],
      showAddTask: false
    };
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
  methods: {
    toggleAddTask() {
      this.showAddTask = !this.showAddTask;
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
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`api/tasks/${ id }`, {
            method: "DELETE"
          });
          res.status === 200 ? (this.tasks = this.tasks.filter(task => task.id !== id)) : Swal.fire({
            icon: "error", title: "Oops...", text: "Please add a task!"
          });
        }
      });
    },
    async toggleReminder(id) {
      const task = await this.fetchTask(id);
      const updateTask = { ...task, reminder: !task.reminder };
      const res = await fetch(`api/tasks/${ id }`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(updateTask)
      });
      const data = await res.json();

      // Way 1
      this.tasks = this.tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task);

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
      const res = await fetch("api/tasks");
      return res.json();
    },
    async fetchTask(id) {
      const res = await fetch(`api/tasks/${ id }`);
      const data = await res.json();

      return data;
    }
  }
}
;
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 600px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>

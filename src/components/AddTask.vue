<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Task</label>
      <input type="text" name="text" v-model="text" placeholder="Add Task" />
    </div>
    <div class="form-control">
      <label>Day & Time</label>
      <input type="datetime-local" name="day" v-model="day" placeholder="Add Day & Time" />
    </div>
    <div class="form-control form-control-check">
      <input type="checkbox" name="reminder" v-model="reminder" />
      <label>Set Reminder</label>
    </div>

    <input type="submit" value="Save Task" class="btn btn-block" />
  </form>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "AddTask",
  data() {
    return {
      text: "",
      day: "",
      reminder: false
    };
  },
  mounted() {
    moment.locale("vi");
    console.log(moment().format("LLLL"));
  },
  methods: {
    clear() {
      this.text = "";
      this.day = "";
      this.reminder = false;
    },
    onSubmit(e) {
      e.preventDefault();

      if (!this.text) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please add a task!"
        });

        return;
      }

      const newTask = {
        text: this.text,
        day: this.day,
        reminder: this.reminder
      };

      this.$emit("add-task", newTask);

      this.clear();
    }
  }
};
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input:not([type="checkbox"]) {
  flex: 2;
  height: 20px;
}

.form-control-check input[type="checkbox"] {
  height: 20px;
  width: 20px;
}
</style>

<template>
  <div>
    <h1>Comments</h1>
    <ul v-if="comments.length > 0">
      <li v-for="comment in comments" :key="comment.id">
        <strong>{{ comment.name }}:</strong> {{ comment.comment }}
      </li>
    </ul>
    <p v-else>No comments yet.</p>

    <div>
      <h2>Leave a Comment</h2>
      <form @submit.prevent="submitComment">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="comment">Comment:</label>
          <textarea
            id="comment"
            v-model="comment"
            required
            class="form-control"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <div v-if="submissionStatus" class="mt-2">
          {{ submissionStatus }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';

const comments = ref([]);
const name = ref('');
const comment = ref('');
const submissionStatus = ref(null);
const tableName = 'comments';

async function getComments() {
  try {
    const { data, error } = await supabase.from('comments').select();
    if (error) {
      console.error('Error fetching comments:', error);
      return; // Exit if there's an error
    }
    comments.value = data || []; // Ensure it's an array, even if empty
  } catch (err) {
    console.error('An unexpected error occurred while fetching comments:', err);
  }
}

async function submitComment() {
  submissionStatus.value = 'Submitting...';
  try {
    const { error } = await supabase
      .from(tableName)
      .insert([{ name: name.value, comment: comment.value }]);

    if (error) {
      console.error('Error inserting comment:', error);
      submissionStatus.value = 'Error submitting comment. Please try again.';
    } else {
      submissionStatus.value = 'Comment submitted successfully!';
      name.value = '';
      comment.value = '';
      await getComments(); // Refresh comments after submission, using await.
    }
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    submissionStatus.value = 'An unexpected error occurred. Please try again later.';
  }
}

onMounted(() => {
  getComments();
});
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<style>
#app > div {
  border: dashed black 1px;
  display: inline-block;
  margin: 10px;
  padding: 10px;
  background-color: lightyellow;
}
</style>
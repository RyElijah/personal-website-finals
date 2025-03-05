<template>
    <body>
      <section>
        <div class="circle"></div>
        <header>
          <ul class="navigation">
            <li><a href="#" id="educationLink">Education</a></li>
            <li><a href="#" id="goalsLink">Goals</a></li>
            <li><a href="#" id="hobbiesLink">Hobbies</a></li>
            <li><a href="#" id="schoolsLink">Schools</a></li>
          </ul>
        </header>
        
        <div class="content">
          <div class="textBox">
            <h2>Welcome to my Homepage!</h2>
            <p>
              I am a student in Asia Pacific College taking Bachelor of Science in Information Technology specialized in Mobile and Internet Applications ...
              <br>
              <a id="learnMoreLink" href="" class="buttonlearn">Learn more about me!</a>
            </p>
            <ul class="sci">
              <li><a href="https://www.facebook.com/ryanelijah.luar/"><img src="../components/images/efbi.png" alt="Facebook"></a></li>
              <li><a href="https://www.linkedin.com/in/ryan-elijah-luar-a99171250/"><img src="../components/images/linkedin.png" alt="LinkedIn"></a></li>
              <li><a href="https://github.com/RyElijah"><img src="../components/images/github1.png" alt="GitHub"></a></li>
            </ul>
          </div>
        </div>
  
        <!-- Comment Section -->
        <div class="comments-container">
          <div class="comment-form">
            <h2>Leave a Comment</h2>
            <form @submit.prevent="submitComment" id="commentForm">
              <input type="text" id="name" v-model="name" placeholder="Your Name" required>
              <textarea id="comment" v-model="comment" placeholder="Your Comment" rows="4" required></textarea>
              <button type="submit" class="submit-btn">Submit Comment</button>
              <div v-if="submissionStatus" class="mt-2">{{ submissionStatus }}</div>
            </form>
          </div>
          
          <div class="comment-list" id="commentList">
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <div class="comment-header">
                <span class="comment-name">{{ comment.name }}</span>
                <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
              </div>
              <p>{{ comment.comment }}</p>
            </div>
          </div>
        </div>
        
        <footer>
          <div class="image-container">
            <img src="../images/rm.gif">
          </div>
        </footer>
      </section>
    </body>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../lib/supabaseClient';
  
  const name = ref('');
  const comment = ref('');
  const submissionStatus = ref(null);
  const comments = ref([]);
  const tableName = 'comments';
  
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  async function submitComment() {
    submissionStatus.value = "Submitting...";
    try {
      const { error } = await supabase.from(tableName).insert([{ name: name.value, comment: comment.value }]);
      if (error) throw error;
      submissionStatus.value = "Comment submitted successfully!";
      name.value = '';
      comment.value = '';
      await getComments();
    } catch (err) {
      console.error("Error submitting comment:", err);
      submissionStatus.value = "Error submitting comment. Please try again.";
    }
  }
  
  async function getComments() {
    try {
      const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      comments.value = data;
    } catch (err) {
      console.error("Error fetching comments:", err);
      submissionStatus.value = "Error loading comments.";
    }
  }
  
  onMounted(() => {
    getComments();
  });
  </script>
  

<style>

body {
   
   background: #A9A9A9;
   margin: 0;
   padding: 0;
}


section {
   position: relative;
   width: 100%;
   min-height: 100vh;
   padding: 80px 20px;
   display: flex;
   justify-content: center;
   background: #A9A9A9;
   bottom: 0;
}


section .circle {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: #E51E2A;
   clip-path: circle(50% at right -20%);
}


header {
   position: fixed;
   top: 0;
   width: 100%;
   padding: 20px 30px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: rgba(0, 0, 0, 0.3);
   z-index: 1000;
}


header .navigation {
   display: flex;
   flex-wrap: wrap;
}

header .navigation li {
   list-style: none;
}

header .navigation li a {
   color: #fff;
   font-weight: 700;
   text-decoration: none;
   margin-left: 20px;
   font-size: 18px;
   font-family: 'Arial Narrow', Arial, sans-serif;
}

.content {
   position: relative;
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: center;
   text-align: center;

}


.content .textBox {
   max-width: 600px;
   margin: 80px;
   margin-right: 70px;

}

.content .textBox h2 {
   color: #fff;
   font-size: 75px;
   margin-bottom: 10px;
   line-height: 1.2em;
   font-weight: 700;
   margin-right: 50px;
   font-family: Arial, sans-serif;
}

.content .textBox p {
   color: #fff;
   font-size: 28px;
   font-family: Arial, sans-serif;
}


.content .textBox a {
   display: inline-block;
   margin-top: 15px;
   padding: 10px 20px;
   background: #E51E2A;
   color: #fff;
   text-decoration: none;
   border-radius: 40px;
   font-weight: 500;
}


.content .imagebox {
   width: 100%;
   max-width: 500px;
}

.content .imagebox img {
   width: 100%;
   height: auto;
   display: block;
   object-fit: cover;
   margin: 0 auto;
}


.sci {
   position: relative;
   display: flex;
   justify-content: center;
   gap: 10px;
   margin-top: 10px;
   padding: 0;
}


.sci li {
   list-style: none;
}


.sci li a {
   background: #000; 
   width: 30px;
   height: 30px;
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 80%; 
   transition: all 0.3s ease-in-out;
}


.sci li a:hover {
   background: #333; 
   transform: translateY(-5px);
}


.sci li a img {
   filter: invert(1);
   width: 30px;
   height: 30px;
}



.swiper {
   width: 100%;
   max-width: 500px;
   height: 500px;
}

.swiper-slide {
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 18px;
   font-size: 18px;
   font-weight: bold;
   color: #fff;
}


.modal-content {
   max-width: 90%;
   width: 90%;
}


table {
   width: 100%;
   max-width: 700px;
   margin: 20px auto;
   font-size: 16px;
}


@media (max-width: 1024px) {

   header {
       padding: 20px;
   }

   .content {
       flex-direction: column;
       text-align: center;
   }

   .content .textBox {
       max-width: 80%;
   }

   .content .textBox h2 {
       font-size: 40px;
   }

   .content .textBox p {
       font-size: 16px;
   }

   .content .imagebox {
       max-width: 400px;
   }
}

@media (max-width: 768px) {

   section {
       padding: 50px 20px;
   }

   header {
       flex-direction: column;
       align-items: center;
       padding: 15px;
   }

   header .navigation {
       flex-direction: column;
       text-align: center;
   }

   header .navigation li a {
       margin: 10px 0;
       font-size: 16px;
   }

   .content {
       flex-direction: column;
       text-align: center;
   }

   .content .textBox {
       max-width: 90%;
   }

   .content .textBox h2 {
       font-size: 32px;
   }

   .content .textBox p {
       font-size: 14px;
   }

   .content .imagebox {
       max-width: 300px;
   }

   .sci {
       bottom: 20px;
   }

   .swiper {
       max-width: 300px;
       height: 300px;
   }
}

.buttonlearn {
   display: inline-block;
   padding: 18px 36px; 
   background-color: #E51E2A; 
   color: #fff; 
   font-size: 30px; 
   font-weight: bold;
   text-decoration: none;
   border-radius: 40px; 
   transition: all 0.3s ease-in-out;
   text-align: center;
   box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
   cursor: pointer;
}


.buttonlearn:hover {
   background-color: #c4161f;
   transform: scale(1.1); 
   box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}


.buttonlearn:active {
   transform: scale(0.95); 
}





.modal {
   display: none;
   position: fixed;
   z-index: 1000;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background-color: rgba(0, 0, 0, 0.4);
   opacity: 0;
   transition: opacity 0.3s ease;
   justify-content: center; 
   align-items: center; 
}

.modal.show {
   opacity: 1;
   display: flex; 
}

.modal-content {
   background-color: #f8f8ff;
   border-radius: 22px;
   box-shadow: 0 18px 36px rgba(0, 0, 0, 0.4);
   padding: 30px; 
   width: 90%;
   max-width: 850px;
   margin: 20px auto; 
   text-align: center;
   font-family: 'Open Sans', sans-serif;
}

.modal-content h2 {
   color: #343a40;
   margin-bottom: 20px; 
   font-size: 24px;
   font-weight: 600;
}

.modal-content p {
   color: #495057;
   line-height: 1.6; 
   margin-bottom: 25px;
   font-size: 16px;
}

.close-btn {
   padding: 10px 20px; 
   background-color: #dc3545;
   color: white;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   font-size: 14px; 
   transition: background-color 0.3s ease;
}

.close-btn:hover {
   background-color: #c82333;
}

.close-btn:active {
   background-color: #b01222;
   transform: translateY(1px);
}

.goals-list {
   list-style-type: none;
   padding: 0;
   margin-bottom: 20px;
}

.goals-list li {
   background-color: #FAA0A0;
   padding: 15px;
   border-radius: 10px;
   margin-bottom: 10px;
   font-size: 16px;
   color: #fff;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.goals-list li:hover {
   transform: translateY(-5px);
   box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.hobbies-table {
   width: 100%;
   border-collapse: collapse;
   margin-bottom: 20px; 
}

.hobbies-table th,
.hobbies-table td {
   padding: 15px; 
   text-align: center;
   border-bottom: 1px solid #ddd;
   font-size: 14px; 
}

.hobbies-table th {
   background-color: #FAA0A0;
   font-weight: 600;
   color: #333;
}

.hobbies-table td {
   font-size: 16px; 
   color: #555;
}

.hobbies-table tr:nth-child(even) {
   background-color: #f9f9f9;
}

.schools-table {
   width: 100%;
   border-collapse: collapse;
   margin-bottom: 30px; 
}

.schools-table th,
.schools-table td {
   padding: 15px;
   text-align: left;
   border-bottom: 1px solid #e0f2fe;
   font-size: 16px;
}

.schools-table th {
   background-color: #F88379;
   font-weight: 700;
   color: #333;
   text-transform: uppercase;
   font-size: 14px;
}

.schools-table td {
   font-size: 16px; 
   color: #444;
}

.schools-table tr:nth-child(even) {
   background-color: #FAA0A0;
}

@media (max-width: 600px) {
   .modal-content {
       padding: 20px;
   }
}

.modal-content {
   background-color: #f0f8ff; 
   border-radius: 25px; 
   box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); 
   padding: 60px; 
   width: 90%;
   max-width: 700px;
   margin: 8% auto; 
   text-align: center;
   font-family: 'Arial', sans-serif; 
   color: #333;
}

.modal-content h2 {
   color: #FAA0A0; 
   margin-bottom: 40px;
   font-size: 32px; 
   font-weight: 700; 
   text-transform: uppercase;
   letter-spacing: 1.5px;
   text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); 
}

.modal-content p {
   font-size: 18px; 
   line-height: 1.7;
   margin-bottom: 50px; 
   text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
}

</style>
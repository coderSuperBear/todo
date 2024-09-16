<template>
    <div class="notifications">
      <div v-for="(notification, index) in notifications" :key="index" :class="`notification ${notification.type}`">
        {{ notification.message }} <img class="warning" src="/warning.png" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['notifications'],
  };
  </script>
  
  <style>
  .notifications {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 30px;
  }
  
  .notification {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 30px;
  }
  
  .success {
    background-color: rgb(89, 223, 89);
  }
  
  .error {
    background-color: rgb(235, 27, 27);
  }
  .warning {
    width: 24px;
    margin-left: 15px;
  }
  </style>
<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-card max-width="500px" width="100%" rounded="lg">
      <v-form @submit.prevent="login">

      <v-card-title class="text-center mt-2">
        เข้าสู่ระบบ
      </v-card-title>

      <v-card-text>
 

                <v-text-field v-model="data.username" label="ชื่อผู้ใช้"></v-text-field>
                <v-text-field v-model="data.password" label="รหัสผ่าน"></v-text-field>

      </v-card-text>

      <v-card-actions class="d-flex align-center justify-center">
        <v-btn color="primary" type="submit" variant="elevated">เข้าสู่ระบบ</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>


<script setup>

import axios from 'axios';

const data = ref({});
const login = async () => {
  try {
    const res = await axios.post('http://localhost:3001/api/login', data.value);
    useCookie('token').value = res.data.token;
    useCookie('user').value = res.data.data;
    navigateTo(`/${res.data.data.role}`);

  } catch (error) {
    console.log(error.response?.data?.message);
  }
};

</script>
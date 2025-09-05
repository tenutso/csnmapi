<template>
    <div>
    <h1>Hello</h1>
    <button type="submit" @click="createUser()">Get User</button>
    <ul><li v-for="user in users">{{user.id}}</li></ul>
    </div>
</template>
<script setup lang="ts">

const users = <any>ref([]);
users.value = await $fetch('api/listUsers');

function createUser() {
    $fetch("/api/addUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            _CLIENT_RELATION_PRODUCT_ID_: 5615,
            _MEMBER_NUM_: 82932,
            "clientRelationFilter": {
                
                "instanceFilter": {
                    "Year": "2025"
                }
            }
            /*
            fields: [
                "_MEMBER_NUM_",
                "_MEMBER_NAME_",
                "_MEMBER_DATE_CREATED_",
                "_MEMBER_DATE_MODIFIED_",
                "_MEMBER_CREATED_BY_",
                "_MEMBER_MODIFIED_BY_",
                "CLIENT_CONTACT_FORM_URL",
                "First Name",
                "Last Name"
            ]
                */
        })
    })
}

definePageMeta({
    layout: 'home'
})
</script>
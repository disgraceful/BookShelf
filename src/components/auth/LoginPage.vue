<template>
  <my-auth-component loginInfo="SignIn"></my-auth-component>
</template>

<script>
import AuthComponent from "./AuthComponent";
export default {
  components: {
    "my-auth-component": AuthComponent
  }
};
</script>

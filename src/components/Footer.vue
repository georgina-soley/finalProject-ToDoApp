<template>
    <footer>
        <img src="../assets/img/wedo-white.svg" alt="wedo logo" class="logo-footer">
        <p> Made with love by Georgy Soley</p>
    </footer>
</template>

<script setup>

</script>

<style>
footer {
  background-color:var( --colorDarkBlue);
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  margin-top: 50px;
}
.logo-footer{
    width: 20vw;
    max-width: 80px;
}

footer > p{
    color: var(--colorWhite);
}

</style>
<template>
    <footer>
        <img src="../assets/img/SVG/wedo-color.svg" alt="wedo logo" class="logo-footer">
        <p> Made with love G.</p>
    </footer>
</template>

<script setup>

</script>

<style>
footer {
  background-color:var( --ligth);
  display: flex;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  margin-top: 30px;
  border-top:0.2px var(--colorTransparent) dotted ;
}
.logo-footer{
    width: 20vw;
    max-width: 80px;
}

footer > p{
    color: var(--colorDark);
}

</style>
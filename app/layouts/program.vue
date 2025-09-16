<template>
  <UApp>
    <UHeader>
      <template #title> My Header </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>
    <UFooter>My Footer</UFooter>
  </UApp>
</template>

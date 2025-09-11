<template>
  <UApp>
    <UHeader>
      <template #title> <Logo class="h-6 w-auto" />My Header </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>
    <UFooter>My Footer</UFooter>
  </UApp>
</template>

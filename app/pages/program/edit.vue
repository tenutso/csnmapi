<script setup lang="ts">
import { onMounted } from "vue";
import * as z from "zod";

let schema = z.object({
  contactEmail: z.string().email("Invalid email"),
  backupEmail: z.string().email("Invalid email"),
});

type Schema = z.output<typeof schema>;

definePageMeta({
  layout: "program",
});

let zones = Intl.supportedValuesOf("timeZone").map((zone) => {
  // format timezone to long offset
  const formatter = Intl.DateTimeFormat("en-us", {
    timeZone: zone,
    timeZoneName: "longOffset",
  });

  const tzPart = formatter
    .formatToParts()
    .find((part) => part.type === "timeZoneName");
  const longOffset = tzPart?.value ?? "";

  return {
    id: zone,
    label: zone + " -- (" + longOffset + ")",
  };
});

const program = reactive({
  programName: "",
  orgName: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  backupEmail: "",
  menteeRegistrationEndDate: "",
  menteeBookingStartDate: "",
  menteeRegistrationEndTime: "",
  menteeBookingStartTime: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  mentorCalendarEndDate: "",
  bookOnlyOnce: true,
  publicGallery: true,
  maxMentorSessions: 4,
  maxMenteeSessions: 3,
});

const showTimePicker1 = ref(false);
const showTimePicker2 = ref(false);
const page = ref(0);
const loading = ref(false);
const uploadFile = ref < File | null > (null);
const valid = ref(true);

const toast = useToast();

async function saveSettings() {
  //loading.value = 1;
  //await $fetch("/api/program/save", {
  //  method: "POST",
  //  body: program,
  //});
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  //loading.value = 0;
  console.log("Saving Settings");
}

onMounted(async () => {
  const settings = await $fetch("/api/program/read");
  console.log("FETCH:", settings);

  //program.value = settings;

});

function onFileChange() {
  const reader = new FileReader();
  reader.onload = () => {
    console.log("Reader Results:", reader.result);
  };
  if (uploadFile && uploadFile.value != null) {
    reader.readAsText(uploadFile.value);
  }
}
</script>
<template>
  <UContainer>
    <UForm :schema="schema" :state="program" @submit="saveSettings">
      <div class="mx-auto py-10">
        <div class="">
          <UFormField size="lg" class="mb-5" v-model="program.programName" label="Program Name" required>
            <UInput class="w-full"></UInput>
          </UFormField>
        </div>
        <div class="">
          <UFormField size="lg" class="mb-5" v-model="program.orgName" label="Organization Name" required>
            <UInput class="w-full"></UInput>
          </UFormField>

          <UFormField size="lg" class="mb-5" v-model="program.contactName" variant="outlined" persistent-placeholder
            label="Primary Contact Name" required>
            <UInput class="w-full"></UInput>
          </UFormField>
        </div>
        <div>
          <UFormField size="lg" class="mb-5" v-model="program.contactEmail" label="Contact Email" required
            description="This is the email that appears on the website and gets notified when someone uses contact forms.">
            <UInput class="w-full"></UInput>
          </UFormField>
          <UFormField size="lg" class="mb-5" v-model="program.contactPhone" label="Contact Phone" required
            description="This telephone number appears on the website.">
            <UInput class="w-full"></UInput>
          </UFormField>
        </div>
        <div class="">
          <UFormField size="lg" class="mb-5" v-model="program.backupEmail" label="Backup Contact Email (Optional)"
            description="This email also would get notified when someone uses contact forms. This person also should be a registered administrator.">
            <UInput class="w-full"></UInput>
          </UFormField>
        </div>
      </div>


          <p>
            Choose a date and time when sessions booking will be activated.
            Recommended, minimum 1 week before the Mentors' Calendar Start Date
            below. This can be edited at any time.
          </p>

        <UFormField label="Mentee Registration Cutoff Date & Time:">
          <UInput type="date" v-model="program.menteeRegistrationEndDate" class="p-2"></UInput>
        </UFormField>

        <UFormField label="Mentee Sessions Booking Start Date & Time :">
          <UInput type="date" v-model="program.menteeBookingStartDate" class="p-2"></UInput>
        </UFormField>
     
        <USelect class="w-48 p-2" :v-model="program.menteeRegistrationEndTime" :items='["12:00", "1:00", "2:00"]' />
          
        <USelect class="w-48 p-2" :v-model="program.menteeBookingStartTime" :items='["12:00", "1:00", "2:00"]' />


          <USelect v-model="program.timezone" label="Timezone" :items="zones"></USelect>
  
          <UFormField>
          <UInput type="date" elevation="24" prepend-icon="mdi-calendar" persistent-placeholder
            label="Mentors' Calendar End Date :" v-model="program.mentorCalendarEndDate" required>
          </UInput>
          </UFormField>
      
          <USwitch v-model="program.bookOnlyOnce" label="Mentees can only book a mentor once"></USwitch>
          <USwitch v-model="program.publicGallery" label="Mentor Gallery publicly viewable"></USwitch>
        
          <USelect label="Max Sessions dates per Mentor:" 
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="program.maxMentorSessions"></USelect>
        
          <USelect label="Max Sessions a Mentee Can Book:" 
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="program.maxMenteeSessions"></USelect>
        
          <p>Program Logo (max 520px by 240px):</p>
          <UFileUpload prepend-icon="mdi-camera" accept="image/png, image/jpeg, image/bmp"
            v-model="uploadFile" @change="onFileChange"></UFileUpload>


      <div class="flex gap-2 justify-between mt-4">
        <UButton :loading="loading" @click="saveSettings">Save</UButton>
      </div>
    </UForm>
  </UContainer>
</template>

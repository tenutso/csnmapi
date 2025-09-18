<script setup lang="ts">
import { onMounted } from "vue";
import * as z from "zod";
import type { FormSubmitEvent } from '@nuxt/ui'
import { Temporal } from 'temporal-polyfill';

definePageMeta({
  layout: "program",
});

let schema = z.object({
  programName: z.string().min(1, "Name is required"),
  orgName: z.string().min(1, "Name is required"),
  contactName: z.string().min(1, "Name is required"),
  contactEmail: z.string().email("Invalid email"),
  contactPhone: z.string().regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number"),
  backupEmail: z.string().email("Invalid email"),
});

//type Schema = z.output<typeof schema>;



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

const state = ref({
  programName: "CSNM Mentorship Program",
  orgName: "CSNM",
  contactName: "Anthony Nijmeh",
  contactEmail: "anthony@csnm.ca",
  contactPhone: "416-441-0400",
  backupEmail: "anthony@bondexec.com",
  menteeRegistrationEndDate: Temporal.PlainDate.from(Temporal.Now.plainDateTimeISO()).toString(),
  menteeBookingStartDate: Temporal.PlainDate.from(Temporal.Now.plainDateTimeISO()).toString(),
  menteeRegistrationEndTime: "17:00",
  menteeBookingStartTime: "08:00",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  mentorCalendarEndDate: Temporal.PlainDate.from(Temporal.Now.plainDateTimeISO()).toString(),
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

async function saveSettings(event: any) {

  
  //loading.value = true;

  await $fetch("/api/program/save", {
    method: "POST",
    body: event.data,
  });
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  //loading.value = 0;
  console.log(event.data);
}

onMounted(async () => {
  loading.value = true;
  const settings = await $fetch("/api/program/read");
  
  if (settings) {
    state.value = {
      programName: settings.programName ?? "",
      orgName: settings.orgName ?? "",
      contactName: settings.contactName ?? "",
      contactEmail: settings.contactEmail ?? "",
      contactPhone: settings.contactPhone ?? "",
      backupEmail: settings.backupEmail ?? "",
      menteeRegistrationEndDate: settings.menteeRegistrationEndDate ?? state.value.menteeRegistrationEndDate, //Temporal.PlainDate.from(settings.menteeRegistrationEndDate ?? "").toString() ?? "",
      menteeBookingStartDate: settings.menteeBookingStartDate ?? state.value.menteeBookingStartDate,
      mentorCalendarEndDate: settings.mentorCalendarEndDate ?? state.value.mentorCalendarEndDate,
      menteeRegistrationEndTime: Temporal.PlainTime.from(settings.menteeRegistrationEndDate ?? "12:00").toString() ?? "12:00",
      menteeBookingStartTime: Temporal.PlainTime.from(settings.menteeRegistrationEndDate ?? "12:00").toString() ?? "12:00",
      timezone: settings.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      bookOnlyOnce: settings.bookOnlyOnce ?? true,
      publicGallery: settings.publicGallery ?? true,
      maxMentorSessions: settings.maxMentorSessions ?? 4,
      maxMenteeSessions: settings.maxMenteeSessions ?? 3,
    }
  }
  
  console.log("FETCH:", state.value);
  loading.value = false;
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
    <UForm :schema="schema" :state="state" @submit="saveSettings">
      <div class="mx-auto py-10">
        <div class="">
          <UFormField size="lg" class="mb-5"  label="Program Name" name="programName" required>
            <UInput class="w-full" v-model="state.programName"></UInput>
          </UFormField>
        </div>
        <div class="">
          <UFormField size="lg" class="mb-5"  label="Organization Name" name="orgName" required>
            <UInput class="w-full" v-model="state.orgName"></UInput>
          </UFormField>

          <UFormField size="lg" class="mb-5"  variant="outlined" name="contactName"
            label="Primary Contact Name" required>
            <UInput class="w-full" v-model="state.contactName"></UInput>
          </UFormField>
        </div>
        <div>
          <UFormField size="lg" class="mb-5" name="contactEmail" label="Contact Email" required
            description="This is the email that appears on the website and gets notified when someone uses contact forms.">
            <UInput class="w-full" v-model="state.contactEmail"></UInput>
          </UFormField>
          <UFormField size="lg" class="mb-5"  name="contactPhone" label="Contact Phone" required
            description="This telephone number appears on the website.">
            <UInput class="w-full" v-model="state.contactPhone"></UInput>
          </UFormField>
        </div>
        <div class="">
          <UFormField size="lg" class="mb-5"  name="backupEmail" label="Backup Contact Email (Optional)"
            description="This email also would get notified when someone uses contact forms. This person also should be a registered administrator.">
            <UInput class="w-full" v-model="state.backupEmail"></UInput>
          </UFormField>
        </div>
      </div>


          <p>
            Choose a date and time when sessions booking will be activated.
            Recommended, minimum 1 week before the Mentors' Calendar Start Date
            below. This can be edited at any time.
          </p>

        <UFormField name="menteeRegistrationEndDate" label="Mentee Registration Cutoff Date & Time:">
          <UInput type="date" v-model="state.menteeRegistrationEndDate" class="p-2"></UInput>
        </UFormField>

        <UFormField name="menteeBookingStartDate" label="Mentee Sessions Booking Start Date & Time :">
          <UInput type="date" v-model="state.menteeBookingStartDate" class="p-2"></UInput>
        </UFormField>
     
        
          
        <USelect class="w-48 p-2" v-model="state.menteeBookingStartTime" :items='["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]' />
        <USelect name="menteeRegistrationEndTime" class="w-48 p-2" v-model="state.menteeRegistrationEndTime" :items='["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]' />

          <USelect v-model="state.timezone" label="Timezone" :items="zones"></USelect>
  
          <UFormField>
          <UInput type="date" name="mentorCalendarEndDate" label="Mentors' Calendar End Date :" v-model="state.mentorCalendarEndDate">
          </UInput>
          </UFormField>
      
          <USwitch v-model="state.bookOnlyOnce" label="Mentees can only book a mentor once"></USwitch>
          <USwitch v-model="state.publicGallery" label="Mentor Gallery publicly viewable"></USwitch>
        
          <USelect label="Max Sessions dates per Mentor:" 
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="state.maxMentorSessions"></USelect>
        
          <USelect label="Max Sessions a Mentee Can Book:" 
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" v-model="state.maxMenteeSessions"></USelect>
        
          <p>Program Logo (max 520px by 240px):</p>
          <UFileUpload prepend-icon="mdi-camera" accept="image/png, image/jpeg, image/bmp"
            v-model="uploadFile" @change="onFileChange"></UFileUpload>


      <div class="flex gap-2 justify-between mt-4">
        <UButton :loading="loading" type="submit">Save</UButton>
      </div>
    </UForm>
  </UContainer>
</template>

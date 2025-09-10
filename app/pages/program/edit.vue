<script setup>
import { onMounted } from 'vue';
definePageMeta({
  layout: 'program'
});

let zones = Intl.supportedValuesOf('timeZone').map((zone) => {
  // format timezone to long offset
  const longOffset = Intl.DateTimeFormat('en-us', {
    timeZone: zone,
    timeZoneName: 'longOffset',
    offset: 'long'
  })
    .formatToParts()
    .find((part) => part.type === 'timeZoneName').value;

  return {
    value: zone,
    title: zone + ' -- (' + longOffset + ')'
  };
});

const program = reactive({
  programName: '',
  orgName: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  backupEmail: '',
  menteeRegistrationEndDate: '',
  menteeBookingStartDate: '',
  menteeRegistrationEndTime: '',
  menteeBookingStartTime: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  mentorCalendarEndDate: '',
  bookOnlyOnce: true,
  publicGallery: true,
  maxMentorSessions: 4,
  maxMenteeSessions: 3
});

const showTimePicker1 = ref(false);
const showTimePicker2 = ref(false);
const page = ref(1);
const loading = ref(0);
const uploadFile = ref({});
const valid = ref(true);

const uploadRules = ref([
  (value) => {
    console.log(value);
    if (typeof value === 'undefined') return true;
    if (value.size <= 200000) return true;
    return 'File size must be less than 2Mb';
  }
]);
const nameRules = ref([
  (value) => {
    if (value) return true;

    return 'Name is required.';
  },
  (value) => {
    if (value?.length <= 10) return true;

    return 'Name must be less than 10 characters.';
  }
]);
const emailRules = ref([
  (value) => {
    if (value) return true;

    return 'E-mail is required.';
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;

    return 'E-mail must be valid.';
  }
]);

async function saveSettings() {
  //loading.value = 1;
  await $fetch('/api/program/save', {
    method: 'POST',
    body: program
  });

  //loading.value = 0;
  console.log('Saving Settings');
}

onMounted(async () => {
  const settings = await $fetch('/api/program/read');
  console.log('FETCH:', settings);
  //Object.assign(program.value, settings);
  Object.assign(program, settings);
  const reader = new FileReader();
  reader.onload = () => {
    console.log('Reader Results:', reader.result);
  };
});

function readfile() {
  console.log('Upload File: ', uploadFile);
  reader.readAsText(uploadFile.value);
}
</script>
<template>
  <v-container>
    <v-form v-model="valid">
      <v-stepper
        v-model="page"
        :items="['Program Contact', 'Dates & Settings']"
        hide-actions
      >
        <template #item.1>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="program.programName"
                  :rules="nameRules"
                  variant="outlined"
                  persistent-placeholder
                  label="Program Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="program.orgName"
                  :rules="nameRules"
                  class="mx-auto"
                  variant="outlined"
                  persistent-placeholder
                  label="Organization Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="program.contactName"
                  :rules="nameRules"
                  variant="outlined"
                  persistent-placeholder
                  label="Primary Contact Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="program.contactEmail"
                  :counter="10"
                  :rules="nameRules"
                  variant="outlined"
                  persistent-placeholder
                  label="Contact Email"
                  required
                  hint="This is the email that appears on the website and gets notified when someone uses contact forms."
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="program.contactPhone"
                  :rules="nameRules"
                  variant="outlined"
                  persistent-placeholder
                  label="Contact Phone"
                  required
                  hint="This telephone number appears on the website."
                  persistent-hint=""
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="program.backupEmail"
                  :rules="nameRules"
                  variant="outlined"
                  persistent-placeholder
                  label="Backup Contact Email (Optional)"
                  hint="This email also would get notified when someone uses contact forms. This person also should be a registered administrator."
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template #item.2>
          <v-container>
            <v-row>
              <v-col>
                <p>
                  Choose a date and time when sessions booking will be
                  activated. Recommended, minimum 1 week before the Mentors'
                  Calendar Start Date below. This can be edited at any time.
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-date-input
                  elevation="24"
                  prepend-icon="mdi-calendar"
                  variant="outlined"
                  persistent-placeholder
                  label="Mentee Registration Cutoff Date & Time:"
                  v-model="program.menteeRegistrationEndDate"
                  required
                >
                </v-date-input>
              </v-col>
              <v-col cols="12" md="6">
                <v-date-input
                  elevation="24"
                  prepend-icon="mdi-calendar"
                  variant="outlined"
                  persistent-placeholder
                  label="Mentee Sessions Booking Start Date & Time :"
                  v-model="program.menteeBookingStartDate"
                  required
                >
                </v-date-input>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  variant="outlined"
                  :model-value="program.menteeRegistrationEndTime"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                >
                  <v-menu
                    v-model="showTimePicker1"
                    :close-on-content-click="false"
                    activator="parent"
                    min-width="0"
                  >
                    <v-time-picker
                      v-model="program.menteeRegistrationEndTime"
                    ></v-time-picker>
                  </v-menu>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  variant="outlined"
                  :model-value="program.menteeBookingStartTime"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                >
                  <v-menu
                    v-model="showTimePicker2"
                    :close-on-content-click="false"
                    activator="parent"
                    min-width="0"
                  >
                    <v-time-picker
                      v-model="program.menteeBookingStartTime"
                    ></v-time-picker>
                  </v-menu>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="program.timezone"
                  :model-value="
                    program.timezone ? program.timezone : guessTimezone
                  "
                  label="Timezone"
                  :items="zones"
                  variant="outlined"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-date-input
                  elevation="24"
                  prepend-icon="mdi-calendar"
                  variant="outlined"
                  persistent-placeholder
                  label="Mentors' Calendar End Date :"
                  v-model="program.mentorCalendarEndDate"
                  required
                >
                </v-date-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="3" sm="6" cols="6">
                <v-switch
                  v-model="program.bookOnlyOnce"
                  label="Mentees can only book a mentor once"
                ></v-switch>
              </v-col>
              <v-col md="3" sm="6" cols="6">
                <v-switch
                  v-model="program.publicGallery"
                  label="Mentor Gallery publicly viewable"
                ></v-switch>
              </v-col>
              <v-col md="3" sm="6" cols="6">
                <v-select
                  label="Max Sessions dates per Mentor:"
                  variant="outlined"
                  :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                  v-model="program.maxMentorSessions"
                ></v-select>
              </v-col>
              <v-col md="3" sm="6" cols="6">
                <v-select
                  label="Max Sessions a Mentee Can Book:"
                  variant="outlined"
                  :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                  v-model="program.maxMenteeSessions"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6" sm="12" cols="12">
                <v-list-subheader
                  >Program Logo (max 520px by 240px):</v-list-subheader
                >
                <v-file-input
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  accept="image/png, image/jpeg, image/bmp"
                  :rules="uploadRules"
                  v-model="uploadFile"
                  @update:model-value="readfile"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <v-stepper-actions>
          <template #next>
            <v-btn
              :loading="loading"
              :disabled="0"
              v-if="page === 2"
              @click="saveSettings"
              >Save</v-btn
            >
            <v-btn v-else @click="page++">Next Page</v-btn>
          </template>
          <template #prev>
            <v-btn @click="page--">Previous</v-btn>
          </template>
        </v-stepper-actions>

        <!--
        <template v-slot:actions="{ next, prev }">
          <v-btn :disabled="page === 1 ? 1 : 0" @click="prev">Previous</v-btn>
          <v-btn @click="next">Next Page {{ page }}</v-btn>
        </template>
        -->
      </v-stepper>
    </v-form>
  </v-container>
</template>

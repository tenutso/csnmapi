<script setup>
definePageMeta({
    layout: 'program'
})

const program = reactive({
    programName: '',
    firstname: '',
    lastname: '',
    email: ''
})
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const nameRules = ref([
    value => {
        if (value) return true

        return 'Name is required.'
    },
    value => {
        if (value?.length <= 10) return true

        return 'Name must be less than 10 characters.'
    },

])
const emailRules = ref([
    value => {
        if (value) return true

        return 'E-mail is required.'
    },
    value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
    },

])

</script>
<template>

    <v-container>
        <v-form v-model="valid">
            <v-stepper :items="['Program Contact', 'Dates & Settings']">
                <template v-slot:item.1>

                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="program.programName" :counter="10" :rules="nameRules"
                                    variant="outlined" persistent-placeholder label="Program Name"
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="program.orgName" :counter="10" :rules="nameRules" class="mx-auto"
                                    variant="outlined" persistent-placeholder label="Organization Name"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="program.primaryContact" :counter="10" :rules="nameRules"
                                    variant="solo" persistent-placeholder label="Primary Contact Name"
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="program.primaryEmail" :counter="10" :rules="nameRules"
                                    prepend-icon="mdi-email" variant="outlined" persistent-placeholder
                                    label="Contact Email" required
                                    hint="This is the email that appears on the website and gets notified when someone uses contact forms."
                                    persistent-hint></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="program.primaryPhone" :counter="10" :rules="nameRules"
                                    prepend-inner-icon="mdi-phone" variant="outlined" persistent-placeholder
                                    label="Contact Phone" required hint="This telephone number appears on the website."
                                    persistent-hint=""></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="program.backupEmail" :counter="10" :rules="nameRules"
                                    prepend-inner-icon="mdi-email" variant="outlined" persistent-placeholder
                                    label="Backup Contact Email (Optional)"
                                    hint="This email also would get notified when someone uses contact forms. This person also should be a registered administrator."
                                    persistent-hint></v-text-field>
                            </v-col>
                        </v-row>

                    </v-container>

                </template>
                <template v-slot:item.2>

                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="program.firstname" :counter="10" :rules="nameRules" prepend-icon="mdi-calendar" variant="outlined" persistent-placeholder
                                    label="Mentee Registration Cutoff Date & Time:" required></v-text-field>
                            </v-col>
                        
                            <v-col cols="12" md="4">
                                <v-text-field v-model="program.firstname" :counter="10" :rules="nameRules" prepend-icon="mdi-calendar" 
                                    label="Mentee Registration Cutoff Date & Time:" required></v-text-field>
                            </v-col>
                            </v-row>
                            <v-row>
                            <v-col cols="12" md="4">
                                <v-date-picker active="false" elevation="24" v-model="program.firstname" :counter="10" :rules="nameRules" prepend-icon="mdi-calendar" variant="outlined" persistent-placeholder
                                    label="Mentee Registration Cutoff Date & Time:" required></v-date-picker elevation="24">
                            </v-col>
                        
                            <v-col cols="12" md="4">
                                <v-date-picker elevation="24" v-model="program.firstname" :counter="10" :rules="nameRules" prepend-icon="mdi-calendar" variant="outlined" persistent-placeholder
                                    label="Mentee Registration Cutoff Date & Time:" required></v-date-picker elevation="24">
                            </v-col>
                            </v-row>
                            <v-row>
                            <v-col cols="12" md="4">
                                <v-time-picker active="false" elevation="24" v-model="program.firstname" :counter="10" :rules="nameRules" prepend-icon="mdi-calendar" variant="outlined" persistent-placeholder
                                    label="Mentee Registration Cutoff Date & Time:" required></v-time-picker elevation="24">
                            </v-col>
                        
                            <v-col cols="12" md="4">
                                <v-time-picker elevation="24" v-model="program.firstname" :counter="10" :rules="nameRules" prepend-icon="mdi-calendar" variant="outlined" persistent-placeholder
                                    label="Mentee Registration Cutoff Date & Time:" required></v-time-picker elevation="24">
                            </v-col>
                            </v-row>
                        <v-row>
                            <v-col cols="12"><v-btn :loading="loading" class="mt-2" text="Submit" type="submit"
                                    block></v-btn></v-col>
                        </v-row>
                    </v-container>

                </template>
            </v-stepper>
        </v-form>
    </v-container>
</template>

<template>
  <Container v-if="userAcces.userByUid.accessPlatform">
    <div class="flex flex-col md:flex-row gap-4 md:gap-40">
      <ul class="shadow-cardShadow rounded-cardRadius p-10 h-fit flex flex-col gap-4">
        <h2 class="font-lato text-lg font-semibold mb-4">Instellingen</h2>
        <li @click="showForm(1)"
          class="font-lato rounded-inputFieldRadius cursor-pointer hover:text-greenx hover:translate-x-2 py-2 px-4 transition-all duration-75 ease-in flex"
          :class="{ 'bg-greenx text-white': selectedForm === 1 }">
          <UserCircle2 class="mr-2" :size="24" />
          Accountvoorkeuren
        </li>
        <li @click="showForm(2)"
          class="font-lato rounded-inputFieldRadius cursor-pointer hover:text-greenx hover:translate-x-2 py-2 px-4 transition-all duration-75 ease-in flex"
          :class="{ 'bg-greenx text-white': selectedForm === 2 }">
          <Lock class="mr-2" :size="24" />
          Wachtwoord
        </li>
        <li @click="showForm(3)"
          class="font-lato rounded-inputFieldRadius cursor-pointer hover:text-greenx hover:translate-x-2 py-2 px-4 transition-all duration-75 ease-in flex"
          :class="{ 'bg-greenx text-white': selectedForm === 3 }">
          <Trash2 class="mr-2" :size="24" />
          Account verwijderen
        </li>
      </ul>

      <!-- Form 1 -->
      <Form @submit.prevent="handleAccount" v-if="selectedForm === 1" class="flex flex-col py-10">
        <!-- Blok 1 -->
        <h2 class="font-lato font-semibold text-lg mb-10">Profiel foto</h2>
        <!-- <p> {{ firebaseUser }}</p> -->
        <!-- <p>{{ changeUser }}</p> -->

        <div class="border-greenx border-b-2 mb-12">
          <div>
            <img class="w-32 w-32 rounded-full bg-red mb-6" v-if="changeUser.photoUrl" :src="changeUser.photoUrl"
              alt="Uploaded Image" />
            <input id="fileInput" type="file" class="hidden" />
            <label for="fileInput"
              class="px-4 py-3 rounded-buttonRadius bg-greenx text-sm font-lato text-white hover:bg-dark_green focus:outline-none focus-visible:bg-dark_green">
              Upload foto
            </label>
          </div>

          <div class="mb-12 mt-4">
            <a href="" class="font-lato ml-2 border-b-1 border-black text-xs">verwijder foto</a>
          </div>
        </div>
        <!-- Blok 2 -->
        <div class="border-greenx border-b-2 mb-12 ">
          <h2 class="font-lato font-semibold text-lg mb-2">Persoonlijke gegevens</h2>
          <div class="flex flex-col md:flex-row">
            <div class="mr-6">
              <label for="name" class="text-sm font-lato block mt-6 mb-4 text-dark_grey2">
                Voornaam </label>
              <input type="text" name="name" id="name" placeholder="Voornaam"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx"
                v-model="changeUser.name" />
              <!-- <span class="text-red font-lato text-xs" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span> -->
            </div>
            <div class="mr-6">
              <label for="surname" class="text-sm mt-6 font-lato block mb-4 text-dark_grey2">
                Achternaam
              </label>
              <input type="text" name="surname" id="surname" placeholder="naam" v-model="changeUser.surname"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <!-- <span class="text-red font-lato text-xs" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span> -->
            </div>
          </div>
          <div class="flex mt-2 flex-col md:flex-row">
            <div class="mr-6">
              <label for="email" class="text-sm font-lato mt-6 block mb-4 text-dark_grey2">
                Email
              </label>
              <input type="text" name="email" id="email" placeholder="mike@gmail.com" v-model="changeUser.email"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <!-- <span class="text-red font-lato text-xs" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span> -->
            </div>
            <div class="mr-6">
              <label for="tel" class="text-sm font-lato mt-6 block mb-4 text-dark_grey2">
                Telefoon
              </label>
              <input type="text" name="tel" id="tel" placeholder="+32 123 456 789" v-model="changeUser.phoneNumber"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <!-- <span class="text-red font-lato text-xs" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span> -->
            </div>
          </div>
          <div class="flex mt-2 mb-12 flex-col md:flex-row">
            <div class="mr-6">
              <label for="birth" class="text-sm font-lato block mt-6 mb-4 text-dark_grey2">
                Geboortedatum
              </label>
              <input type="date" name="birth" id="birth" v-model="changeUser.birth"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <!-- <span class="text-red font-lato text-xs" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span> -->
            </div>
          </div>
        </div>
        <!-- Blok 3 -->
        <div>
          <h2 class="font-lato font-semibold text-lg mb-2">Woonplaats</h2>
          <div class="flex flex-col md:flex-row">
            <div class="mr-6">
              <label for="street" class="text-sm font-lato block mt-6 mb-4 text-dark_grey2">
                straat
              </label>
              <input type="text" name="street" id="street" placeholder="ruiterstraat" v-model="changeUser.street"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <!-- <span class="text-red font-lato text-xs" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span> -->
            </div>
            <div class="mr-6">
              <label for="houseNumber" class="text-sm font-lato block mt-6 mb-4 text-dark_grey2">
                huisnummer
              </label>
              <input type="text" name="houseNumber" id="houseNumber" placeholder="naam" v-model="changeUser.numberOfHouse"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <!-- <span class="text-red font-lato text-xs" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span> -->
            </div>
          </div>
          <div class="flex flex-col md:flex-row mt-2 mb-12">
            <div class="mr-6">
              <label for="Zipcode" class="text-sm font-lato mt-6 block mb-4 text-dark_grey2">
                Postcode
              </label>
              <input type="text" name="Zipcode" id="Zipcode" placeholder="8500" v-model="changeUser.zipCode"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <!-- <span class="text-red font-lato text-xs" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span> -->
            </div>
          </div>
        </div>
        <div>
          <PrimaryButton label="Opslaan" />
        </div>
      </Form>



      <!-- Form 2 -->
      <Form v-if="selectedForm === 2" @submit.prevent="handleNewPassword" class="py-10">
        <div class="mb-10">
          <h2 class="font-lato font-semibold text-lg ">Wachtwoord instellen</h2>
          <!-- Feedback over opgeslagen wachtwoord -->
          <div :class="{
            'p-2 flex bg-dark_grey mb-5 rounded-inputFieldRadius w-fit transition-all ease-in duration-150': true,
            'opacity-0 -translate-y-8': updateSuccess === false,
            'opacity-100 translate-y-0': updateSuccess === true
          }">
            <p class="font-lato font-bold text-black">Nieuw wachtwoord opgeslagen</p>
            <CheckCircle class="ml-2 text-dark_green" :size="24" />
          </div>

          <div class="flex flex-col md:flex-row -mt-2">
            <div class="mr-6">
              <!-- Hier komt input voor current password currentPassword -->
              <label for="surname" class="text-sm font-lato mt-6 block mb-4 text-dark_grey2">
                Huidige wachtwoord
              </label>
              <!-- Hier komt input voor current password currentPassword -->
              <input type="password" name="surname" id="surname" placeholder="Nieuw wachtwoord" v-model="currentPassword"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <span class="text-red font-lato text-xs" v-if="errorsCurrentPassword"> {{ errorsCurrentPassword }}</span>
            </div>


            <div class="mr-6">
              <label for="surname" class="text-sm font-lato mt-6 block mb-4 text-dark_grey2">
                Nieuw wachtwoord
              </label>
              <!-- Hier komt input voor current password currentPassword -->
              <input type="password" name="surname" id="surname" placeholder="Nieuw wachtwoord" v-model="newPassword"
                class="mt-1 text-sm font-lato block w-full bg-dark_grey rounded-inputFieldRadius px-2 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <span class="text-red font-lato text-xs" v-if="errorsNewPassword"> {{ errorsNewPassword }}</span>

            </div>


          </div>
        </div>
        <div>
          <PrimaryButton label="Opslaan" />
        </div>
      </Form>

      <!-- Form 3 -->
      <Form @submit.prevent="handleDeleteAccount" v-if="selectedForm === 3" class="py-10">
        <div class="mb-10">
          <h2 class="font-lato font-semibold text-lg mb-8">Account verwijderen</h2>
          <div class="flex">
            <div class="mr-6">
              <label for="name" class="text-sm font-lato block mb-4 text-dark_grey2">
                Om het account te verwijderen, typ <strong>'verwijder'</strong>.
              </label>
              <input type="text" name="name" id="name" placeholder="verwijder" v-model="deleteString"
                class="mt-1 text-sm font-lato block bg-dark_grey rounded-inputFieldRadius px-2 py-3 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-greenx" />
              <!-- <span class="text-red font-lato text-xs" v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }}</span> -->

            </div>
          </div>
        </div>
        <div>
          <PrimaryButton label="Opslaan" />
        </div>
      </Form>
    </div>
  </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue'
import { ref, onMounted } from 'vue'
import { UserCircle2, Lock, Trash2, CheckCircle } from 'lucide-vue-next'
import PrimaryButton from '@/components/generic/PrimaryButton.vue'
import useFirebase from '@/composables/useFirebase'
import { GET_USER_BY_UID } from '@/graphql/user.query'
// import { useQuery } from '@vue/apollo-composable'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { UPDATE_USER } from '@/graphql/user.mutation'
import type { Iuser } from '@/interfaces/user.interface'
import router from '@/router'
import axios from 'axios';
// import useCustomUser from '@/composables/useCustomUser'

export default {

  components: {
    Container,
    UserCircle2,
    Lock,
    Trash2,
    PrimaryButton,
    CheckCircle
  },
  computed: {
    imageUrl() {
      console.log('imageUrl');
      return this.selectedFile ? URL.createObjectURL(this.selectedFile) : '';
    },
  },

  watch: {
    selectedFile(newValue, oldValue) {
      console.log('selectedFile changed', newValue, oldValue);
    },
  },

  setup() {
    // const { customUser } = useCustomUser();
    const selectedForm = ref(1); // Houdt bij welk formulier moet worden weergegeven, standaard ingesteld op Form 1
    const selectedFile = ref<File | null>(null);
    const { firebaseUser, updatepassword, deleteAccount } = useFirebase()
    const userData = ref<Iuser | null>()

    // User updaten
    const { mutate: updateUser, loading: updateUserLoading, onDone: updateUserCreated } = useMutation<Iuser>(UPDATE_USER);
    const { result: user, error: userError } = useQuery(GET_USER_BY_UID, {
      uid: firebaseUser.value?.uid,
    })


    const changeUser = ref({
      photoUrl: user.value?.userByUid.photoURL,
      name: user.value?.userByUid.name,
      surname: user.value?.userByUid.surname,
      email: user.value?.userByUid.email,
      phoneNumber: user.value?.userByUid.phoneNumber,
      birth: user.value?.userByUid.birth,
      birthplace: user.value?.userByUid.birthplace,
      street: user.value?.userByUid.street,
      numberOfHouse: user.value?.userByUid.numberOfHouse,
      city: user.value?.userByUid.city,
      zipCode: user.value?.userByUid.zipCode,
    });



    // Wordt gebruikt in HandleNewPassword
    const newPassword = ref('')
    const currentPassword = ref('')

    const errorsNewPassword = ref('')
    const errorsCurrentPassword = ref('')
    const updateSuccess = ref(false)

    // deleteAccount
    const deleteString = ref('')


    const acces = (() => {
      if (user.value?.userByUid.accessPlatform === false) {
        // Ga terug naar de homepagina
        router.push({ path: '/' });
      }
    })();

    const showForm = (formNumber: number) => {
      selectedForm.value = formNumber; // Wanneer erop een menu-item wordt geklikt, wordt het overeenkomstige formulier weergegeven
      localStorage.setItem('selectedForm', formNumber.toString()); // Het geselecteerde formulier wordt opgeslagen in de localstorage
    }


    onMounted(() => {
      const savedform = localStorage.getItem('selectedForm'); // Wanneer de pagina wordt herladen, wordt het laatst geselecteerde formulier weergegeven
      if (savedform) {
        selectedForm.value = parseInt(savedform);
      }
    })

    const handleAccount = () => {
      const updateUserInput = {
        uid: firebaseUser.value?.uid,
        photoURL: changeUser.value.photoUrl,
        name: changeUser.value.name,
        surname: changeUser.value.surname,
        email: changeUser.value.email,
        phoneNumber: parseInt(changeUser.value.phoneNumber), // Zet de tekenreeks om naar een getal
        birth: changeUser.value.birth,
        city: changeUser.value.city,
        zipCode: parseInt(changeUser.value.zipCode), // Zet de tekenreeks om naar een getal
        street: changeUser.value.street,
        numberOfHouse: parseInt(changeUser.value.numberOfHouse), // Zet de tekenreeks om naar een getal
      };

      updateUser({
        updateUserInput: updateUserInput,
      })
        .then((result) => {
          if (!result?.data) {
            throw new Error('Failed to update user data.');
          }
          console.log('User data updated successfully:', result.data);
          // Handle success or show a message to the user
          // Reload the page to show the updated user data
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          // Handle errors or show an error message to the user
        });
    };

    const handleNewPassword = () => {
      // Console log van het huidige wachtwoord en het nieuwe wachtwoord
      // console.log('currentPassword:', currentPassword.value, "newPassword:", newPassword.value);

      updatepassword(currentPassword.value, newPassword.value)
        .then(() => {
          console.log('Wachtwoord succesvol bijgewerkt');
          // Aanpassing aanbrengen
          errorsNewPassword.value = ''
          errorsCurrentPassword.value = ''
          updateSuccess.value = true
          // Voer hier verdere acties uit, bijvoorbeeld een succesbericht weergeven
        })
        .catch((error) => {
          console.error('Fout bij het bijwerken van het wachtwoord in Account.vue', error);

          // Voer specifieke acties uit op basis van het type fout
          if (error.code === 'auth/invalid-login-credentials') {
            console.log('Fout: Ongeldige inloggegevens. Het huidige wachtwoord is onjuist.');
            errorsCurrentPassword.value = 'Wachtwoord niet correct'
            // Voer hier verdere acties uit voor onjuist huidig wachtwoord
          } else if (error.code === 'auth/user-not-found') {
            console.log('Fout: Gebruiker niet gevonden.');
            errorsNewPassword.value = 'Gebruiker niet gevonden'
            // Voer hier verdere acties uit voor gebruiker niet gevonden
          } else if (error.code === 'auth/weak-password') {
            console.log('Fout: Het nieuwe wachtwoord moet minstens 6 tekens lang zijn.');
            errorsNewPassword.value = 'Minstens 6 tekens lang.'
          }

          else {
            console.log('Er is een fout opgetreden bij het bijwerken van het wachtwoord.');
            // Voer hier verdere generieke foutafhandeling uit
          }
        });
    }

    const handleDeleteAccount = () => {
      if (deleteString.value === 'verwijder') {
        deleteAccount().then(() => {
          // Hier nog een delete maken voor de mongoDb
          console.log('Account succesvol verwijderd');
          router.push({ path: '/auth/login' })
        }).catch((error) => {
          console.error('Fout bij het verwijderen van het account in Account.vue', error);
        });
      } else {
        console.log('Typ verwijder in het inputveld')
      }
    }

    return {
      selectedForm,
      showForm,
      selectedFile,
      firebaseUser,
      userData,
      userAcces: user,
      changeUser,
      handleAccount,
      handleNewPassword,
      handleDeleteAccount,
      newPassword,
      currentPassword,
      errorsNewPassword,
      errorsCurrentPassword,
      updateSuccess,
      deleteString,
    }
  }
}
</script>

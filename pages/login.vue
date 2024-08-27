<template>
  <div class="login-page-wrap">
    <div class="sct-login">
      <p class="text-xl font-semibold">Sign In</p>
      <p>Enter your username & password for login</p>
      <form @submit="onSubmit">
        <div class="mt-6">
          <div class="mb-3">
            <Label for="username" class="mb-1">Username</Label>
            <Input placeholder="Username" id="username" v-model="valueUsername"/>
            <small v-if="errorMessageUsername" class="text-red-600">{{ errorMessageUsername }}</small>
          </div>
          <div>
            <Label for="password" class="mb-1">Password</Label>
            <Input type="password" placeholder="Password" v-model="valuePassword"/>
            <small v-if="errorMessagePassword" class="text-red-600">{{ errorMessagePassword }}</small>
          </div>
        </div>
        <div class="mt-6">
          <RecaptchaV2
              @widget-id="handleWidgetId"
              @error-callback="handleErrorCalback"
              @expired-callback="handleExpiredCallback"
              @load-callback="handleLoadCallback"
          />
          <Button class="bg-green-500 hover:bg-green-400 text-white w-full mt-3" type="submit"
                  :disabled="!metaForm.valid">Login
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '~/components/ui/input'
import { Label } from "~/components/ui/label";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { initialValueLogin, LoginSchema, type TLoginSchema } from "~/utils/schema/user";
import { RecaptchaV2 } from "vue3-recaptcha-v2";

definePageMeta({
  layout: 'auth'
})

const snackbar = useSnackbar();
const {
  handleSubmit,
  meta: metaForm
} = useForm({
  validationSchema: toTypedSchema(LoginSchema),
  initialValues: initialValueLogin
})

const {
  value: valueUsername,
  errorMessage: errorMessageUsername
} = useField<string>('username')
const {
  value: valuePassword,
  errorMessage: errorMessagePassword
} = useField<string>('password')
const {
  value: valueToken
} = useField<string>('token')
const processSubmit = async (values: TLoginSchema) => {
  await $fetch('/api/auth/login', {
    method: 'POST',
    body: {
      username: values.username,
      password: values.password,
      token: values.token
    },
    onResponse({response}) {
      if (response.ok) {
        navigateTo('/', {
          replace: true
        })
      } else {
        snackbar.add({
          type: 'error',
          text: response?.statusText,
        })
      }
    }
  })
}

const onSubmit = handleSubmit((values) => {
  processSubmit(values)
})

const handleWidgetId = (widgetId: number) => {
  console.log("Widget ID: ", widgetId);
};

const handleErrorCalback = () => {
  // console.log("Error callback");
  valueToken.value = ''
};
const handleExpiredCallback = () => {
  // console.log("Expired callback");
  valueToken.value = ''
};
const handleLoadCallback = (response: unknown) => {
  // console.log("Load callback", response);
  const token = response ? response : ''
  if (typeof token === "string") {
    valueToken.value = token
  }
};
</script>

<style scoped lang="scss">
.login-page-wrap {
  @apply h-full flex flex-col;
  .sct-login {
    @apply m-auto p-4 w-[60%];
  }
}
</style>
<script setup lang="ts">
import { Card } from '~/components/ui/card'
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from '@vee-validate/zod';
import { initialProduct, ProductSchema, type TProductSchema } from "~/utils/schema/products";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useRoute } from "vue-router";

definePageMeta({
  middleware: ['auth']
})

const endpoint = '/api/products'
const snackbar = useSnackbar();
const route = useRoute()
const isEdit = ref(Boolean(route.params?.id))
const {
  resetForm,
  handleSubmit
} = useForm({
  initialValues: initialProduct,
  validationSchema: toTypedSchema(ProductSchema)
})

const {
  value: valueName,
  errorMessage: errorMessageName
} = useField<string>('name')

const {
  value: valuePrice,
  errorMessage: errorMessagePrice
} = useField<number>('price')

const {
  value: valueDescription
} = useField<number>('description')

async function processCreate(values: TProductSchema) {
  await $fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${useAuthCookie().value}`
    },
    body: {
      name: values.name,
      price: values.price,
      description: values.description
    },
    onResponse({response}) {
      if (response.ok) {
        snackbar.add({
          type: 'success',
          text: 'Product created successfully.',
        })
        navigateTo('/products')
      } else {
        snackbar.add({
          type: 'error',
          text: response?.statusText,
        })
      }
    }
  })
}

async function processEdit(values: TProductSchema) {
  const response = await $fetch(`${endpoint}/${route.params?.id}`, {
    method: 'PUT',
    headers: {
      'authorization': `Bearer ${useAuthCookie().value}`
    },
    body: {
      name: values.name,
      price: values.price,
      description: values.description
    },
    onResponse({response}) {
      if (response?.ok) {
        snackbar.add({
          type: 'success',
          text: 'Product updated successfully.',
        })
        navigateTo('/products')
      } else {
        snackbar.add({
          type: 'error',
          text: response?.statusText,
        })
      }
    },
  })
}

const onSubmit = handleSubmit((values) => {
  if (isEdit.value) {
    processEdit(values)
  } else {
    processCreate(values)
  }
})
const getDetail = async () => {
  await $fetch(`${endpoint}/${route.params.id}`, {
    headers: {
      'authorization': `Bearer ${useAuthCookie().value}`
    },
    onResponse({response}) {
      if (response.ok) {
        resetForm({
          values: {
            name: response._data.name,
            description: response._data.description,
            price: Number(response._data.price)
          }
        })
      } else {
        snackbar.add({
          type: 'error',
          text: response?.statusText,
        })
        navigateTo('/products')
      }
    },
  })
}
onMounted(() => {
  if (isEdit.value) {
    getDetail()
  }
})
</script>

<template>
  <Card class="p-4">
    <p class="mb-5 text-xl">{{ isEdit ? 'Edit Product' : 'Add Product' }}</p>
    <form @submit="onSubmit">
      <div class="grid grid-cols-2 gap-8">
        <div class="">
          <Label for="name">Name</Label>
          <Input placeholder="Name" id="name" v-model="valueName" class="mt-1"/>
          <small class="text-red-600" v-show="errorMessageName">{{ errorMessageName }}</small>
        </div>
        <div class="">
          <Label for="price">Price</Label>
          <Input placeholder="Price" id="price" v-model="valuePrice" class="mt-1" type="number"/>
          <small class="text-red-600" v-show="errorMessagePrice">{{ errorMessagePrice }}</small>
        </div>
        <div class="">
          <Label for="desc">Description</Label>
          <Textarea placeholder="Description" id="desc" v-model="valueDescription" class="mt-1"/>
        </div>
      </div>
      <div class="flex justify-end gap-3">
        <Button class="hover:bg-[#eaedef] bg-[#d6dde1]" @click="() => navigateTo('/products')">Back</Button>
        <Button type="submit" class="bg-green-500 hover:bg-green-400 text-white">Save</Button>
      </div>
    </form>
  </Card>
</template>

<style scoped lang="scss">
</style>
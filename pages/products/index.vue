<script setup lang="ts">
import { Card } from '~/components/ui/card'
import { TablePagination } from "~/components/ui/table";
import { rupiahFormat } from "~/utils/helpers/currencyFormat";
import { type products } from '@prisma/client'

definePageMeta({
  middleware: ['auth']
})

const endpoint = '/api/products'
const snackbar = useSnackbar();
const page = ref(1)
const {
  data: dataProducts,
  refresh,
  pending
} = useAsyncData('products', () => $fetch(endpoint, {
  headers: {
    'authorization': `Bearer ${useAuthCookie().value}`
  },
  params: {
    page: page.value
  }
}), {
  watch: [page]
});

async function onRemove(row: products) {
  await $fetch(`${endpoint}/${row.id}`, {
    method: 'DELETE',
    headers: {
      'authorization': `Bearer ${useAuthCookie().value}`
    },
    onResponse({response}) {
      if (response.ok) {
        snackbar.add({
          type: 'success',
          text: `Product ${row.name ?? ''} deleted successfully.`,
        })
        refresh()
      } else {
        snackbar.add({
          type: 'error',
          text: response?.statusText,
        })
      }
    }
  })
}
</script>

<template>
  <Card class="p-4">
    <div class="flex justify-end">
      <Button class="bg-green-500 hover:bg-green-400 text-white gap-2" @click="() => navigateTo('/products/form')">
        <font-awesome-icon :icon="['fas', 'plus']" class="w-3"/>
        Create
      </Button>
    </div>
    <TablePagination v-model:page="page" v-bind="{
      data: dataProducts?.data ?? [],
      emptyText: 'Products Not Available',
      totalData: dataProducts?.meta?.total ?? 0,
      isLoading: pending,
      columns: [{
        headerName: 'Name',
        field: 'name'
      },
      {
        headerName: 'Price',
        field: 'price'
      },
      {
        headerName: 'Action',
        field: 'action',
      }
      ]
    }">
      <template #col-price="{row}">
        {{ row?.price ? rupiahFormat(Number(row?.price)) : '-' }}
      </template>
      <template #col-action="{row}">
        <div class="flex items-center gap-4">
          <NuxtLink :to="`/products/form/${row.id}`">
            <font-awesome-icon :icon="['far', 'pen-to-square']" class="w-5 text-green-500 cursor-pointer"/>
          </NuxtLink>
          <font-awesome-icon :icon="['far', 'trash-can']" class="w-4 text-red-500 cursor-pointer"
                             @click="onRemove(row)"/>
        </div>
      </template>
    </TablePagination>
  </Card>
</template>

<style scoped lang="scss">

</style>
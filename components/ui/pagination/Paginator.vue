<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from './'

import { Button, } from '@/components/ui/button'
import { useVModel } from "@vueuse/core";

const props = withDefaults(defineProps<{
  page: number,
  total: number
}>(), {})

const emits = defineEmits<{
  (e: 'update:page', payload: number): void
}>()

const modelValue = useVModel(props, 'page', emits, {
  passive: true,
  defaultValue: props.page,
})
</script>

<template>
  <Pagination v-slot="{ page }" :total="total" :sibling-count="1" show-edges v-model:page="modelValue">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst/>
<!--      <PaginationPrev/>-->

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index"/>
      </template>

<!--      <PaginationNext/>-->
      <PaginationLast/>
    </PaginationList>
  </Pagination>
</template>
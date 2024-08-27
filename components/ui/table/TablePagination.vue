<script setup lang="ts" generic="TData extends unknown">
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '~/components/ui/table/index'
import type { HTMLAttributes } from "vue";
import { get } from 'lodash'
import Paginator from "~/components/ui/pagination/Paginator.vue";
import { useVModel } from "@vueuse/core";

type TColumn = {
  headerName: string
  field: string
  thClass?: HTMLAttributes['class']
  tdClass?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<{
  columns: Array<TColumn>
  data: Array<TData>,
  totalData: number,
  page: number,
  emptyText?: string
  isLoading: boolean
}>(), {
  data: () => [],
  columns: () => [],
  emptyText: 'Data Not Available.',
  isLoading: false
})

const emits = defineEmits<{
  (e: 'update:page', payload: number): void
}>()

const slots = useSlots()
const nameColumn = (field: string) => `col-${field}`
const modelValuePage = useVModel(props, 'page', emits, {
  passive: true,
  defaultValue: props.page,
})
</script>

<template>
  <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead v-for="(column, colIdx) in columns" :key="`col-${colIdx}`" :class="column?.thClass ?? ''">
            {{ column.headerName }}
          </TableHead>
        </TableRow>
        <TableEmpty class="" :colspan="columns.length" v-if="data.length === 0">{{ emptyText }}</TableEmpty>
        <TableEmpty class="" :colspan="columns.length" v-if="isLoading">
          <div class="rounded-full h-16 w-16 bg-green-500 animate-ping"></div>
        </TableEmpty>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(row, rowIdx) in data" :key="`row-${rowIdx}`">
          <TableCell v-for="(col, cIdx) in columns" :key="`row-cell-${cIdx}`" :class="col?.tdClass">
            <slot v-if="slots[nameColumn(col.field)]" :name="nameColumn(col.field)" v-bind="{
          row,
          index: rowIdx
        }"></slot>
            <div v-else>{{ get(row, col.field) }}</div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div class="flex justify-center mt-4">
      <Paginator :total="totalData" v-model:page="modelValuePage"/>
    </div>
  </div>
</template>
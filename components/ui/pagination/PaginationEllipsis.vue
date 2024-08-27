<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PaginationEllipsis, type PaginationEllipsisProps } from 'radix-vue'
import { MoreHorizontal } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps</* @vue-ignore */ PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationEllipsis :class="cn('w-9 h-9 flex items-center justify-center', props.class)">
    <slot>
      <MoreHorizontal />
    </slot>
  </PaginationEllipsis>
</template>

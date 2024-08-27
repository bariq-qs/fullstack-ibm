<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { PaginationPrev, type PaginationPrevProps } from 'radix-vue'
import { ChevronLeft } from 'lucide-vue-next'
import {
  Button,
} from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */  PaginationPrevProps{
  class?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<Props>(), {
  asChild: true,
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationPrev v-bind="delegatedProps">
    <Button :class="cn('w-10 h-10 p-0', props.class)" variant="outline">
      <slot>
        <ChevronLeft class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationPrev>
</template>

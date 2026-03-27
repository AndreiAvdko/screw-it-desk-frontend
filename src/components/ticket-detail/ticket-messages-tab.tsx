import {
  MessageCircle,
  Paperclip,
  Plus,
  Send,
  Share2,
  User,
} from 'lucide-react'
import { useId } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type TicketMessagesTabProps = {
  displayNumber: string
}

export function TicketMessagesTab({ displayNumber }: TicketMessagesTabProps) {
  return (
    <div className="flex min-h-[calc(100svh-16rem)] min-w-0 flex-1 flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0">
      <ChatColumn
        title="Чат с командой"
        subtitle="Внутренние сообщения"
        empty
        checkboxLabel="Также отправить сообщение заказчику"
      />
      <ChatColumn
        title="С заказчиком"
        subtitle="Переписка с представителем заказчика"
        empty={false}
        displayNumber={displayNumber}
        checkboxLabel="Также отправить сообщение команде"
      />
    </div>
  )
}

function ChatColumn({
  title,
  subtitle,
  empty,
  displayNumber,
  checkboxLabel,
}: {
  title: string
  subtitle: string
  empty?: boolean
  displayNumber?: string
  checkboxLabel: string
}) {
  const checkboxId = useId()

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="flex items-center gap-2 border-b border-border bg-card px-3 py-2">
        <div className="flex -space-x-2">
          <Avatar className="size-8 border-2 border-card">
            <AvatarFallback className="text-xs">SD</AvatarFallback>
          </Avatar>
          <Avatar className="size-8 border-2 border-card">
            <AvatarFallback className="text-xs">AC</AvatarFallback>
          </Avatar>
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            className="relative z-10 size-8 rounded-full"
            aria-label="Добавить участника"
          >
            <Plus className="size-4 text-primary" />
          </Button>
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">{title}</h2>
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <Button type="button" variant="ghost" size="icon-sm" className="ml-auto">
          <User className="size-4" />
        </Button>
      </header>

      <div className="min-h-0 flex-1 overflow-auto bg-muted/20 p-3">
        {empty ? (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card/50 p-6 text-center">
            <MessageCircle className="size-10 text-primary" />
            <p className="max-w-sm text-sm text-muted-foreground">
              Здесь будут отображаться ваши внутренние сообщения с вашими
              сотрудниками. Начните диалог или пригласите коллег кнопкой «+».
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <article className="rounded-lg border border-border bg-card p-3 text-left shadow-sm">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>27 марта 2026</span>
                <span className="rounded bg-primary/15 px-1.5 py-0.5 font-medium text-primary">
                  DESK 5
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Обнаружено подтекание в зоне АЗС, требуется срочный выезд бригады.
                Заявка {displayNumber ?? '—'} передана в вашу смену.
              </p>
              <button
                type="button"
                className="mt-3 flex items-center gap-2 rounded-md border border-border bg-muted/50 px-2 py-1.5 text-left text-xs hover:bg-muted"
              >
                <span className="text-lg">📧</span>
                <span className="font-medium">письмо.eml</span>
              </button>
            </article>
          </div>
        )}
      </div>

      <footer className="border-t border-border bg-card p-3">
        <div className="relative">
          <Input
            placeholder="Начните писать сообщение"
            className="min-h-10 pr-24"
            aria-label="Текст сообщения"
          />
          <div className="absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-0.5">
            <Button type="button" variant="ghost" size="icon-xs" title="Вложение">
              <Paperclip className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon-xs" title="Переслать">
              <Share2 className="size-4" />
            </Button>
            <Button type="button" size="icon-sm" title="Отправить">
              <Send className="size-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Checkbox id={checkboxId} />
          <Label
            htmlFor={checkboxId}
            className="cursor-pointer text-xs font-normal text-muted-foreground"
          >
            {checkboxLabel}
          </Label>
        </div>
      </footer>
    </section>
  )
}

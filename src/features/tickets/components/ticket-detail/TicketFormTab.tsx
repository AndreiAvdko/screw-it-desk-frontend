import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Lock,
  MapPin,
  Pencil,
  Plus,
  SquarePen,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Separator } from '@/shared/ui/separator'
import { Textarea } from '@/shared/ui/textarea'
import type { TicketDetail } from '@/features/tickets/types/ticket-detail.types'

type TicketFormTabProps = {
  ticket: TicketDetail
}

export function TicketFormTab({ ticket }: TicketFormTabProps) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1">
      <div className="min-w-0 flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="ticket-number">Номер заявки</Label>
              <Input
                id="ticket-number"
                readOnly
                defaultValue={ticket.number}
                className="bg-muted/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ticket-type">Тип</Label>
              <div className="relative">
                <Input
                  id="ticket-type"
                  readOnly
                  defaultValue={ticket.requestType}
                  className="bg-muted/50 pr-9"
                />
                <Lock className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="criticality">Критичность</Label>
              <div className="flex gap-2">
                <select
                  id="criticality"
                  className="h-8 flex-1 rounded-lg border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  defaultValue={String(ticket.criticality)}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <Button type="button" variant="outline" size="icon-sm">
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Описание заявки</Label>
            <div className="overflow-hidden rounded-lg border border-input bg-background">
              <div className="flex flex-wrap gap-0.5 border-b border-border bg-muted/40 px-1.5 py-1">
                <Button type="button" variant="ghost" size="icon-xs" title="Жирный">
                  <Bold className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs" title="Курсив">
                  <Italic className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs" title="Список">
                  <List className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs" title="Нумерация">
                  <ListOrdered className="size-3.5" />
                </Button>
                <Button type="button" variant="ghost" size="icon-xs" title="Ссылка">
                  <Link2 className="size-3.5" />
                </Button>
              </div>
              <Textarea
                id="description"
                defaultValue={ticket.description}
                className="min-h-32 resize-y border-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Исполнитель</Label>
            <div className="flex flex-wrap items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-primary text-sm font-medium text-primary-foreground">
                  {ticket.performer.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{ticket.performer.fullName}</span>
              <Button type="button" variant="link" className="h-auto p-0 text-sm">
                + Добавить исполнителя
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="deadline">Крайний срок закрытия</Label>
              <Input id="deadline" defaultValue={ticket.deadline} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="payment">Компания получатель оплаты</Label>
              <select
                id="payment"
                className="flex h-8 w-full rounded-lg border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                defaultValue={ticket.paymentRecipientCompany}
              >
                <option>{ticket.paymentRecipientCompany}</option>
                <option>Другая организация</option>
              </select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="parent">Родительская заявка</Label>
              <select
                id="parent"
                className="flex h-8 w-full rounded-lg border border-input bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                defaultValue={ticket.parentRequest ?? ''}
              >
                <option value="">— Нет —</option>
                {ticket.parentRequest && (
                  <option>{ticket.parentRequest}</option>
                )}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Файлы</Label>
            <div className="flex flex-wrap gap-2">
              <div className="flex w-24 flex-col items-center gap-1 rounded-lg border border-dashed border-border bg-muted/30 p-2 text-center">
                <span className="text-2xl">📧</span>
                <span className="truncate text-[10px] text-muted-foreground">
                  письмо.eml
                </span>
              </div>
              <Button type="button" variant="outline" className="h-24 min-w-28 border-dashed">
                <span className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                  <SquarePen className="size-5" />
                  Загрузить
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <aside className="hidden w-80 shrink-0 overflow-auto border-l border-border bg-muted/20 p-4 lg:block">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Заказчик
              </p>
              <p className="font-semibold leading-tight">{ticket.company}</p>
            </div>
            <div className="flex shrink-0 gap-0.5">
              <Button type="button" variant="ghost" size="icon-xs" title="Редактировать">
                <Pencil className="size-3.5" />
              </Button>
              <Button type="button" variant="ghost" size="icon-xs" title="Открыть">
                <Link2 className="size-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Объект / оборудование
              </p>
              <p className="text-sm">{ticket.objectEquipment}</p>
            </div>
            <Separator />
            <div className="space-y-1.5">
              <Label className="text-xs uppercase text-muted-foreground">
                Вид работ
              </Label>
              <select
                className="flex h-8 w-full rounded-lg border border-input bg-background px-2 text-sm"
                defaultValue={ticket.workType}
              >
                <option>{ticket.workType}</option>
                <option>Диагностика</option>
                <option>Ремонт</option>
              </select>
            </div>
            <Separator />
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Адрес
              </p>
              <p className="text-sm leading-snug">{ticket.address}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 gap-1.5"
              >
                <MapPin className="size-3.5" />
                На карте
              </Button>
            </div>
            <Separator />
            <div className="space-y-1.5">
              <Label className="text-xs uppercase text-muted-foreground">
                План объекта
              </Label>
              <select
                className="flex h-8 w-full rounded-lg border border-input bg-background px-2 text-sm"
                defaultValue={ticket.objectPlan}
              >
                <option>{ticket.objectPlan}</option>
              </select>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium uppercase text-muted-foreground">
                  Контактные лица
                </span>
                <Button type="button" variant="link" className="h-auto p-0 text-xs">
                  + Добавить
                </Button>
              </div>
              <select
                className="flex h-8 w-full rounded-lg border border-input bg-background px-2 text-sm"
                defaultValue={ticket.contactPerson}
              >
                <option>{ticket.contactPerson}</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}

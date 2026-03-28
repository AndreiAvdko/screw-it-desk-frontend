// src/components/objects/object-card.tsx
import { Building2, Ticket } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { Object } from '@/types/object'

interface ObjectCardProps {
  object: Object
  onClick?: () => void
}

export function ObjectCard({ object, onClick }: ObjectCardProps) {
  return (
    <Card
      className="cursor-pointer p-4 transition-colors hover:bg-muted/50"
      onClick={onClick}
    >
      <h3 className="font-semibold text-foreground">{object.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{object.address}</p>
      
      <div className="mt-3 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <Building2 className="size-4 text-muted-foreground" />
          <span>
            Компания-владелец: <span className="font-medium text-foreground">{object.companyOwner}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Ticket className="size-4 text-muted-foreground" />
          <span>
            Заявки: <span className="font-medium text-foreground">{object.tickets}</span>
          </span>
        </div>
      </div>
    </Card>
  )
}
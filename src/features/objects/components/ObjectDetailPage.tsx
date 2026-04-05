import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, ChevronDown, FolderTree, Plus } from 'lucide-react'
import imagePlaceholder from '@/assets/placeholder.jpg';

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Label } from '@/shared/ui/label'
import { ChildObjectRow } from '@/features/objects/components/ChildObjectRow'
import { getObjectDetails } from '@/lib/mocks/handlers/mockObjects'
import { cn } from '@/lib/utils'

type TabType = 'contacts' | 'service' | 'qrcodes' | 'additional' | 'children' | 'contracts' | 'history'

export function ObjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const object = getObjectDetails(id || '')
  const [activeTab, setActiveTab] = useState<TabType>('contacts')

  if (!object) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Объект не найден</p>
          <Button onClick={() => navigate('/objects')} className="mt-4">
            Вернуться к списку
          </Button>
        </div>
      </div>
    )
  }

  const tabs: { key: TabType; label: string }[] = [
    { key: 'contacts', label: 'Контакты' },
    { key: 'service', label: 'Обслуживание' },
    { key: 'qrcodes', label: 'QR-коды' },
    { key: 'additional', label: 'Дополнительные поля' },
    { key: 'children', label: 'Дочерние объекты' },
    { key: 'contracts', label: 'Договоры' },
    { key: 'history', label: 'История обслуживания' },
  ]

  const hasChildren = object.children && object.children.length > 0

  return (
    <div className="flex min-h-full flex-col">
      {/* Хлебные крошки и кнопки действий */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => navigate('/objects')}
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{object.name}</h1>
              <p className="text-sm text-muted-foreground">{object.address}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Снять с публикации
            </Button>
            <Button size="sm">
              Создать заявку
            </Button>
          </div>
        </div>
      </div>

      {/* Табы */}
      <div className="border-b border-border bg-card px-6">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'border-b-2 px-1 py-3 text-sm font-medium transition-colors',
                activeTab === tab.key
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
              {tab.key === 'children' && hasChildren && (
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {object.children?.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Контент табов */}
      <div className="flex-1 px-6 py-6">
        {/* Контакты */}
        {activeTab === 'contacts' && (
          <div className="grid max-w-2xl gap-6">
            <div>
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Родительский объект
              </Label>
              <Button variant="outline" className="mt-1.5 w-full justify-between">
                Выбрать родительский объект
                <ChevronDown className="size-4" />
              </Button>
            </div>

            <div>
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Сервисный номер
              </Label>
              <Input 
                placeholder="Введите сервисный номер"
                defaultValue={object.serviceNumber || ''}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Описание
              </Label>
              <Textarea 
                placeholder="Введите описание"
                defaultValue={object.description || ''}
                className="mt-1.5"
                rows={3}
              />
            </div>

            <div>
              <Label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                Мобильное оборудование
              </Label>
            </div>

            <div>
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Адрес объекта*
              </Label>
              <Input 
                defaultValue={object.address}
                className="mt-1.5"
              />
              <button
                type="button"
                className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <MapPin className="size-3" />
                На карте
              </button>
            </div>

            <div>
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Файлы
              </Label>
              <div className="mt-1.5 rounded-lg border-2 border-dashed border-border p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Перетащите файлы сюда или нажмите, чтобы указать путь
                </p>
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Участок
              </Label>
              <Input 
                defaultValue={object.site || ''}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                График работы
              </Label>
              <Input 
                defaultValue={object.workSchedule || ''}
                className="mt-1.5"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button>Сохранить</Button>
              <Button variant="outline">Отмена</Button>
            </div>
          </div>
        )}

        {/* Обслуживание */}
        {activeTab === 'service' && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center text-sm text-muted-foreground">
            <p>Информация об обслуживании появится на следующих этапах.</p>
              <img 
                src={imagePlaceholder} 
                alt="Иллюстрация обслуживания"
                className="mt-4 max-w-full h-auto w-64"
              />
          </div>
        )}

        {/* QR-коды */}
        {activeTab === 'qrcodes' && (
          <div className="flex min-h-[40vh] items-center justify-center text-center text-sm text-muted-foreground">
            QR-коды появятся на следующих этапах.
          </div>
        )}

        {/* Дополнительные поля */}
        {activeTab === 'additional' && (
          <div className="flex min-h-[40vh] items-center justify-center text-center text-sm text-muted-foreground">
            Дополнительные поля появятся на следующих этапах.
          </div>
        )}

        {/* Дочерние объекты - СПИСОК */}
        {activeTab === 'children' && (
          <div>
            {hasChildren ? (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Дочерние объекты
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Объекты, входящие в состав {object.name}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-2 size-4" />
                    Добавить дочерний объект
                  </Button>
                </div>
                <div className="divide-y divide-border rounded-lg border border-border">
                  {object.children?.map((child) => (
                    <ChildObjectRow
                      key={child.id}
                      object={child}
                      onClick={() => navigate(`/objects/${child.id}`)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                <FolderTree className="size-12 text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">Нет дочерних объектов</p>
                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="mr-2 size-4" />
                  Добавить дочерний объект
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Договоры */}
        {activeTab === 'contracts' && (
          <div className="space-y-3">
            {object.contracts && object.contracts.length > 0 ? (
              object.contracts.map((contract, idx) => (
                <div key={idx} className="rounded-lg border border-border p-4">
                  <p className="text-sm font-medium text-foreground">
                    Договор №{contract.number}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    от {contract.date}
                  </p>
                  <p className="text-sm text-foreground/90 mt-2">
                    {contract.type}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex min-h-[40vh] items-center justify-center text-center text-sm text-muted-foreground">
                Нет договоров
              </div>
            )}
          </div>
        )}

        {/* История обслуживания */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            {object.serviceHistory && object.serviceHistory.length > 0 ? (
              object.serviceHistory.map((record, idx) => (
                <div key={idx} className="rounded-lg border border-border p-4">
                  <p className="text-sm font-medium text-foreground">
                    {record.date}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    {record.type}
                  </p>
                  <p className="text-sm text-foreground/90 mt-2">
                    {record.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex min-h-[40vh] items-center justify-center text-center text-sm text-muted-foreground">
                История обслуживания появится на следующих этапах.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
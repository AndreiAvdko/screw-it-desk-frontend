// src/data/mockObjects.ts
import type { Object, ObjectDetails } from '@/types/object'

export const mockObjects: Object[] = [
  {
    id: '1',
    name: 'The Burger Hub',
    address: 'Россия, г Санкт-Петербург, ул Рубинштейна, д 15',
    companyOwner: 'ООО "Собо"',
    ticketsCount: 0,
  },
  {
    id: '2',
    name: 'Ramen House',
    address: 'Невский проспект, 88, Санкт-Петербург, Россия',
    companyOwner: 'ООО "Чокара"',
    ticketsCount: 0,
  },
  {
    id: '3',
    name: 'Сауна-комплекс Nord',
    address: 'Россия, г Санкт-Петербург, ул Кораблестроителей, д 30',
    companyOwner: 'ООО "ТРАПЕЗН..."',
    ticketsCount: 1,
    totalTickets: 3,
  },
  {
    id: '4',
    name: 'Бар Лофт',
    address: 'Россия, г Санкт-Петербург, ул Восстания, д 25',
    companyOwner: 'ООО "ВКУСНИКА"',
    ticketsCount: 1,
  },
  {
    id: '5',
    name: 'Кафе "Вершина"',
    address: 'Выборгское шоссе, 45, Санкт-Петербург, Россия',
    companyOwner: 'ИП Казачухина',
    ticketsCount: 0,
    parentId: '1',
  },
  {
    id: '6',
    name: 'Кафе СТАМБУЛ 34',
    address: 'Россия, г Санкт-Петербург, пр-кт Стачек, д 74',
    companyOwner: 'ИП Смирнова',
    ticketsCount: 0,
    parentId: '1',
  },
  {
    id: '7',
    name: 'Энергосервис',
    address: 'ул Академика Крылова, 4, Санкт-Петербург, Россия, 197376',
    companyOwner: 'АО «ЛОЭСК» «Ц...»',
    ticketsCount: 0,
  },
  {
    id: '8',
    name: 'Дача ресторан',
    address: 'Каменноостровский проспект, 42, Санкт-Петербург, Россия',
    companyOwner: 'ООО "ПИЛЛАУ"',
    ticketsCount: 0,
  },
  {
    id: '9',
    name: 'Ресторан "Бордо"',
    address: 'Литейный проспект, 55, Санкт-Петербург, Россия',
    companyOwner: 'ООО "Люцерн"',
    ticketsCount: 0,
  },
  {
    id: '10',
    name: 'Ресторан "Женева"',
    address: 'Литейный проспект, 55, Санкт-Петербург, Россия',
    companyOwner: 'ООО "Берн"',
    ticketsCount: 0,
  },
  {
    id: '11',
    name: 'Ресторан ОРО',
    address: 'Крестовский проспект, 12, Санкт-Петербург, Россия',
    companyOwner: 'Янгилун',
    ticketsCount: 0,
  },
  {
    id: '12',
    name: 'Летняя терраса The Burger Hub',
    address: 'Россия, г Санкт-Петербург, ул Рубинштейна, д 15, терраса',
    companyOwner: 'ООО "Собо"',
    ticketsCount: 0,
    parentId: '1',
  },
  {
    id: '13',
    name: 'Открытая веранда The Burger Hub',
    address: 'Россия, г Санкт-Петербург, ул Рубинштейна, д 15, веранда',
    companyOwner: 'ООО "Собо"',
    ticketsCount: 2,
    totalTickets: 2,
    parentId: '1',
  },
]

// Функция для получения дочерних объектов
export const getChildrenObjects = (parentId: string): Object[] => {
  return mockObjects.filter(obj => obj.parentId === parentId)
}

// Обновленная функция получения детальных данных
export const getObjectDetails = (id: string): ObjectDetails | null => {
  const baseObject = mockObjects.find(obj => obj.id === id)
  if (!baseObject) return null

  // Получаем дочерние объекты
  const children = getChildrenObjects(id)

  // Для примера, для этого объекта добавляем детальные данные
  if (id === '1') {
    return {
      ...baseObject,
      serviceNumber: 'СН-12345',
      description: 'Ресторан быстрого питания',
      isMobile: false,
      workSchedule: 'Круглосуточный 24/7',
      site: 'ресторан СОБО',
      parentObject: '',
      files: [],
      children, // 👈 добавляем дочерние объекты
      contacts: [
        {
          name: 'Иванов Иван Иванович',
          position: 'Директор',
          phone: '+7 (912) 345-67-89',
          email: 'ivanov@lesmash.ru',
        },
      ],
      contracts: [
        {
          number: 'Д-001/2024',
          date: '01.01.2024',
          type: 'Обслуживание',
        },
      ],
      serviceHistory: [
        {
          date: '15.03.2026',
          type: 'Плановое ТО',
          description: 'Проведено плановое техническое обслуживание',
        },
      ],
    }
  }
  
  // Для других объектов тоже добавляем детей, если есть
  const otherChildren = getChildrenObjects(id)
  if (otherChildren.length > 0) {
    return {
      ...baseObject,
      children: otherChildren,
    }
  }
  
  return baseObject
}
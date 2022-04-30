import { Event } from '@/entities/domain/models/Event'
import { User } from '@/entities/domain/models/User'

class EventValidator {
  isValid?: boolean
}

class EventRegistryUseCase {
  eventValidator: EventValidator
  constructor (eventValidator: EventValidator) {
    this.eventValidator = eventValidator
  }

  async execute (event:Event): Promise<void> {
    this.eventValidator.isValid = true
  }
}

describe('Registro de Eventos - EventRegistryUseCase', () => {
  test('Deve receber um evento válido', async () => {
    const event: Event = new Event('', '', new Date(), new Date(), new User('', '', ''))
    const eventValidator = new EventValidator()
    const eventRegistryUseCase = new EventRegistryUseCase(eventValidator)
    await eventRegistryUseCase.execute(event)
    expect(eventValidator.isValid).toBeTruthy()
  })
})

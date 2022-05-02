import { InMemoryUser } from './../user/InMemoryUser'
import { User } from '@/entities/domain/models/User'
import { Event } from '@/entities/domain/models/Event'
import { UserRepository } from '@/entities/domain/repositories/UserRepository'

interface EventRepository {
  activeEventOfUser(user:User): Promise<Event>
  addEvent(event:Event): Promise<void>
}
class InMemoryEventRepository implements EventRepository {
  events: Event[] = []
  async activeEventOfUser (user: User): Promise<Event> {
    return new Event('any_id', 'any_description',
      new Date('2022-02-01T12:00:00.000Z'),
      new Date('2022-02-01T18:00:00.000Z'), user)
  }

  async addEvent (event:Event): Promise<void> {
    this.events.push(event)
  }
}

class RegisterEventUseCase {
  protected eventRepository: EventRepository
  protected userRepository: UserRepository
  constructor (eventRepository: EventRepository, userRepository: UserRepository) {
    this.eventRepository = eventRepository
    this.userRepository = userRepository
  }

  async execute (event:Event): Promise<Error> {
    if (event.eventStart.getTime() < Date.now()) {
      return new Error('')
    }
    if (event.eventEnd.getTime() < event.eventStart.getTime()) {
      return new Error('A data de término deve ser maior que a data de início')
    }
    const hasEventOfUser = await this.eventRepository.activeEventOfUser(event.owner)
    if (hasEventOfUser) {
      return new Error('Usuário já possui evento ativo')
    }
    const user = await this.userRepository.loadByEmail(event.owner.email)
    if (!user) {
      return new Error('Usuário inválido')
    }
    return new Error('')
  }
}
const realDate = Date.now.bind(global.Date)

let user: User
const eventRepository: EventRepository = new InMemoryEventRepository()
const userRepository: UserRepository = new InMemoryUser()

const makeSUT = (): RegisterEventUseCase => {
  return new RegisterEventUseCase(eventRepository, userRepository)
}

describe('Registro de Evento - Caso de Uso [RegisterEventUseCase]', () => {
  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2022-01-01T12:00:00.000Z').valueOf())
    user = new User(undefined, 'any_name', 'any_email')
    userRepository.create(user)
  })

  afterAll(() => {
    global.Date.now = realDate
  })

  test('Não deve permitir registro de evento no passado', async () => {
    const registerEventUseCase = makeSUT()
    const event = new Event('any_id', 'any_description', new Date('2021-12-31T23:59:59.000Z'), new Date(), user)
    const result = await registerEventUseCase.execute(event)
    expect(result).toBeInstanceOf(Error)
  })

  test('A data de FIM deve ser MAIOR que a data de INÍCIO', async () => {
    const registerEventUseCase = makeSUT()
    const event = new Event('any_id', 'any_description', new Date('2022-01-01T12:00:00.000Z'), new Date('2021-12-31T23:59:59.000Z'), user)
    const result = await registerEventUseCase.execute(event)
    expect(result.message).toBe('A data de término deve ser maior que a data de início')
  })

  test('Não deve permitir novo evento quando existir um outro evento ATIVO', async () => {
    const registerEventUseCase = makeSUT()
    const event = new Event('any_id', 'any_description', new Date('2022-02-01T12:00:00.000Z'), new Date('2022-02-01T18:00:00.000Z'), user)
    const result = await registerEventUseCase.execute(event)
    expect(result.message).toBe('Usuário já possui evento ativo')
  })

  // test('Deve retornar erro de usuário inválido', async () => {
  //   const registerEventUseCase = makeSUT()
  //   const event = new Event('id', 'description', new Date('2022-03-01T12:00:00.000Z'), new Date('2022-03-01T18:00:00.000Z'), user)
  //   const result = await registerEventUseCase.execute(event)
  //   expect(result.message).toBe('Usuário inválido')
  // })
})

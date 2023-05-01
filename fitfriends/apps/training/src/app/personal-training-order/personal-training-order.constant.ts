export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE_PT');

export const PersonalTrainingOrderExceptionMessage = {
  NotFound: 'Заявка на персональную тренировку не найдена',
  StatusAlreadySetOut: 'Неверное действие. Статус уже установлен',
  NotInitiator: 'Нельзя инициировать заявку для другого пользователя',
  NotOwnPersonalTrainingOrder: "Редактировать заявку на персональную тренировку может только автор заявки",
  OwnPersonalTraining: 'Изменить статус тренировки должен исполнитель',
  ConductorError: 'Инициатор и исполнитель не может быть одним пользователем',
  StatusConflict: 'Статус уже установлен'
};

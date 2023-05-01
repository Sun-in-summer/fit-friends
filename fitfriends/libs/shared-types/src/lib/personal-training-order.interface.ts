export  interface PersonalTrainingOrder {

  id?: number;
  initiatorId?: string;
  conductorId: string;
  createdAt?: Date;
  statusChangeDate?: Date;
  status: string;

}

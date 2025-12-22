export class Client {
  constructor(
    public readonly id: string,
    public readonly phoneNumber: string,
    public fullName: string | null = null,
    public email: string | null = null,
    public address: string | null = null,
    public city: string | null = null,
    public state: string | null = null,
    public country: string | null = null,
    public postalCode: string | null = null,
    public tags: string = "{}",
    public notes: string | null = null,
    public sourceId: string | null = null,
    public statusId: string | null = null,
    public lastContactDate: Date | null = null,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date | null = null
  ) {}

  static create(params: {
    id: string;
    phoneNumber: string;
    fullName?: string | null;
    email?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    postalCode?: string | null;
    tags?: string;
    notes?: string | null;
    sourceId?: string | null;
    statusId?: string | null;
    lastContactDate?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
  }): Client {
    return new Client(
      params.id,
      params.phoneNumber,
      params.fullName,
      params.email,
      params.address,
      params.city,
      params.state,
      params.country,
      params.postalCode,
      params.tags,
      params.notes,
      params.sourceId,
      params.statusId,
      params.lastContactDate,
      params.createdAt,
      params.updatedAt,
      params.deletedAt
    );
  }
}

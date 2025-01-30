export interface TokensService {
	generate<TPayload>(payload: TPayload): Promise<string>;
	decode<TPayload>(token: string): TPayload;
	verify(token: string): boolean;
}

export interface TokensProvider {
	generate<TPayload>(payload: TPayload): Promise<string>;
	decode<TPayload>(token: string): TPayload;
}

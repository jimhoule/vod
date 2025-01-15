export interface TokensService {
    generateToken<TPayload>(payload: TPayload): Promise<string>;
    decodeToken<TPayload>(token: string): TPayload;
}

import { randomUUID } from 'node:crypto';

export const withId = <TObject>(object: TObject): TObject & { id: string } => {
    return {
        ...object,
        id: randomUUID(),
    };
};

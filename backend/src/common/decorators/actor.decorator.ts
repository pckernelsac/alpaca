import { SetMetadata } from '@nestjs/common';

export const ACTOR_KEY = 'allowedActors';
export const Actor = (...actors: string[]) => SetMetadata(ACTOR_KEY, actors);
export const StaffOnly = () => SetMetadata(ACTOR_KEY, ['staff']);
export const CustomerOnly = () => SetMetadata(ACTOR_KEY, ['customer']);

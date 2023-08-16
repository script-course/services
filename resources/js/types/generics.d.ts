import type {Item} from '.';

/**
 * Omit's the id from item
 * Being used when items are being created, because they don't have an id yet
 */
export type New<T extends Item> = Omit<T, 'id'>;

/**
 * Makes the id for the given item optional
 * Forms use this generic type, because the given item can either be created or updated
 */
export type Updatable<T extends Item> = New<T> & {
    id?: number;
};

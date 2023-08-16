/**
 * Set the given value in the storage under the given key
 * If the value is not of type String, it will be converted to String
 */
export const putInStorage = (key: string, value: unknown) => {
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);

    try {
        // eslint-disable-next-line no-restricted-syntax
        localStorage.setItem(key, valueToStore);
    } catch (error) {
        // We dont do anything with the error, cause the storage is only used for user experience
        if (error instanceof DOMException) {
            if (error.code === error.QUOTA_EXCEEDED_ERR) {
                // eslint-disable-next-line no-console
                return console.error('local storage is full!');
            }
        }

        // eslint-disable-next-line no-console
        return console.error(error);
    }
};

interface GetFromStorage {
    <T>(key: string): T | undefined;
    <T>(key: string, defaultValue: T): T;
}

export const getFromStorage: GetFromStorage = <T>(key: string, defaultValue?: T): T | undefined => {
    // eslint-disable-next-line no-restricted-syntax
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return defaultValue;

    try {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return JSON.parse(storedValue) as T;
    } catch (_) {
        // When does this occur? Should test this in test
        // Bit of a hacky way to ensure we return type T
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return storedValue as unknown as T;
    }
};

export const clearStorage = () => {
    // eslint-disable-next-line no-restricted-syntax
    localStorage.clear();
};

type ExcludeGenericProps<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export default ExcludeGenericProps;

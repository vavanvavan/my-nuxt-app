export const useFoo = () => {
    return useState('foo', () => 'useFoo');
};


    export type RemoteKeys = 'cupos/App';
    type PackageType<T> = T extends 'cupos/App' ? typeof import('cupos/App') :any;

    export type RemoteKeys = 'facturacion/App';
    type PackageType<T> = T extends 'facturacion/App' ? typeof import('facturacion/App') :any;
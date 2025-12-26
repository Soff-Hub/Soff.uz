import path from 'path';
import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
    schemaFile: path.resolve(__dirname, 'seller-swager.json'), // relative to config file
    apiFile: path.resolve(__dirname, '../../../store/emptyApi.ts'),
    apiImport: 'emptySplitApi',
    outputFile: path.resolve(__dirname, '../../../store/petApi.ts'),
    exportName: 'petApi',
    hooks: true,
};

export default config;
